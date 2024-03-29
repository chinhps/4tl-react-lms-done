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
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiChevronRight, FiEdit3, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import coursesAPI from '../../../api/coursesAPI';
import pointSubmitAPI from '../../../api/pointSubmit';
import Card from '../../../Components/Core/Card/Card';
import ModelConfirm from '../../../Components/Core/ModelConfirm';
import { toggleWorkSomething } from '../../../reducer/globalSlice';
import ModelMark from '../model/ModelMark';

function ListMarkQuiz() {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const [list, setList] = useState([]);
  const [dataMark, setDataMark] = useState([]);
  const [idDelete, setIdDelete] = useState(null);
  const [loadExport, setLoadExport] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();

  const { workSomeThing } = useSelector((state) => state.global);

  const { slugCourse } = useParams();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const { isOpen: isOpenMark, onOpen: onOpenMark, onClose: onCloseMark } = useDisclosure();

  const [loadingForm, setLoadingForm] = useState(false);

  useEffect(() => {
    coursesAPI.getMarkQuiz(slugCourse).then((data) => {
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

  const handleExport = async () => {
    setLoadExport(true);
    const fetchData = await pointSubmitAPI.export('quiz', slugCourse);
    var blob = new Blob([fetchData]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `Quiz_${slugCourse}_${new Date().getTime()}.xlsx`;
    link.click();
    setLoadExport(false);
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
          description="Bạn có chắc muốn hủy kết quả làm bài?"
        />
      ) : null}

      <Card mb={{ base: '0px', '2xl': '20px' }}>
        <Flex justifyContent="space-between">
          <Box>
            <Text color={textColorPrimary} fontWeight="bold" fontSize="2xl" mt="10px" mb="15px">
              Danh sách làm bài Quiz
            </Text>
            <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
              Tải về để có đầy đủ thông tin!
            </Text>
          </Box>

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
                <Th>Tình trạng</Th>
                <Th>Thao tác</Th>
              </Tr>
            </Thead>
            <Tbody>
              {list.map((vl) => (
                <Tr key={vl.id}>
                  <Td>{vl.user_code}</Td>
                  <Td>{vl.name}</Td>
                  <Td>{vl.name_submit}</Td>
                  <Td>{vl.count_submit}</Td>
                  <Td>{vl.point}</Td>

                  <Td>
                    <Badge colorScheme={vl.note === 'Failed' ? 'red' : 'green'}>{vl.note}</Badge>
                  </Td>
                  <Td>
                    <IconButton
                      icon={<FiTrash2 />}
                      onClick={() => {
                        setIdDelete(vl.id);
                        onOpenDelete();
                      }}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}

export default ListMarkQuiz;
