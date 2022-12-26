import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useColorModeValue,
  Text,
  Badge,
  Button,
  Flex,
  Box,
  IconButton,
  useDisclosure,
  useToast,
  Stack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiChevronRight, FiEdit3, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import coursesAPI from '../../../api/coursesAPI';
import labAPI from '../../../api/labAPI';
import pointSubmitAPI from '../../../api/pointSubmit';
import Card from '../../../Components/Core/Card/Card';
import ModelConfirm from '../../../Components/Core/ModelConfirm';
import { toggleWorkSomething } from '../../../reducer/globalSlice';
import { downloadRes } from '../../../utils/data';
import ModelMark from '../model/ModelMark';
import ItemListMarkLab from './ItemListMarkLab';

function ListMarkLab() {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const [list, setList] = useState([]);
  const [dataMark, setDataMark] = useState([]);
  const [idDelete, setIdDelete] = useState(null);
  const [loadExport, setLoadExport] = useState(false);

  // loading
  const [isEdit, setIsEdit] = useState(false);

  const toast = useToast();
  const dispatch = useDispatch();

  const { workSomeThing } = useSelector((state) => state.global);

  const { slugCourse } = useParams();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const { isOpen: isOpenMark, onOpen: onOpenMark, onClose: onCloseMark } = useDisclosure();

  const [loadingForm, setLoadingForm] = useState(false);

  useEffect(() => {
    coursesAPI.getMarkLab(slugCourse).then((data) => {
      setList(data);
    });
  }, [workSomeThing]);

  const handleDelete = (id) => {
    setLoadingForm(true);
    pointSubmitAPI
      .delete(id)
      .then((data) => {
        toast({
          title: 'Thông báo!',
          description: data.msg,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        dispatch(toggleWorkSomething(!workSomeThing));
      })
      .catch((err) => {
        toast({
          title: 'Thông báo!',
          description: err.response.data.msg,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
    onCloseDelete();
    setLoadingForm(false);
  };

  const handleMark = async (id) => {
    const data = await pointSubmitAPI.getOnePointSubmit(id);
    setDataMark(data);
    onOpenMark();
  };

  const handleExport = async () => {
    setLoadExport(true);
    const fetchData = await pointSubmitAPI.export('lab', slugCourse);
    var blob = new Blob([fetchData]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `Lab_${slugCourse}_${new Date().getTime()}.xlsx`;
    link.click();
    setLoadExport(false);
  };

  const handleDownloadLab = async (link, name) => {
    const downLab = await labAPI.download(link);
    downloadRes(downLab, name);
  };
  const handleDownloadAllLab = async () => {
    const downLab = await labAPI.download_all(slugCourse);

    // downloadRes(downLab, name);
  };

  return (
    <>
      {isOpenDelete ? (
        <ModelConfirm
          id={idDelete}
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          handleConfirm={handleDelete}
          isLoading={loadingForm}
          description="Hủy kết quả làm bài thì không thể hoàn tác lại thao tác! Bạn vẫn chắc muốn thực hiện?"
        />
      ) : isOpenMark ? (
        <ModelMark
          title="Chấm điểm"
          id={dataMark?.id}
          default={dataMark}
          slugCourse={slugCourse}
          isOpen={isOpenMark}
          onClose={onCloseMark}
        />
      ) : null}

      <Card mb={{ base: '0px', '2xl': '20px' }}>
        <Flex justifyContent="space-between">
          <Box>
            <Text color={textColorPrimary} fontWeight="bold" fontSize="2xl" mt="10px" mb="15px">
              Danh sách điểm Lab
            </Text>
            <Text color={textColorSecondary} fontSize="md" me="26px">
              Tải về để có đầy đủ thông tin!
            </Text>
            <Text color={textColorSecondary} fontSize="md" me="26px" mb="20px">
              Lưu ý: Tải tất cả bài chỉ tải bài nộp gần nhất của sinh viên!
            </Text>
          </Box>

          <Stack>
            <Button
              isLoading={loadExport}
              rightIcon={<FiChevronRight />}
              rounded="md"
              colorScheme="teal"
              variant="outline"
              onClick={() => handleExport()}
            >
              Tải bảng điểm
            </Button>
            <Button
              isLoading={loadExport}
              rightIcon={<FiChevronRight />}
              rounded="md"
              colorScheme="teal"
              variant="outline"
              onClick={() => handleDownloadAllLab()}
            >
              Tải tất cả bài
            </Button>
          </Stack>
        </Flex>

        <TableContainer>
          <Table variant="simple">
            <TableCaption>Danh sách sinh viên đã làm bài</TableCaption>
            <Thead>
              <Tr>
                <Th>Mã sinh viên</Th>
                <Th>Họ và tên</Th>
                <Th>Tên bài</Th>
                <Th>Nộp bài</Th>
                <Th>Điểm</Th>
                <Th>Bài làm</Th>
                <Th>Tình trạng</Th>
                <Th>Thao tác</Th>
              </Tr>
            </Thead>
            <Tbody>
              {list.map((vl, index) => (
                <>
                  <ItemListMarkLab
                    isOpenMark={isOpenMark}
                    key={index}
                    vl={vl}
                    handleDownloadLab={handleDownloadLab}
                    handleMark={handleMark}
                    setIdDelete={setIdDelete}
                    onOpenDelete={onOpenDelete}
                  />
                </>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}

export default ListMarkLab;
