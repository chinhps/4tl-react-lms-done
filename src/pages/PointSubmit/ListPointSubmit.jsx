import {
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'react-laravel-paginex';
import axiosClient from '../../api/axiosClient';
import Card from '../../Components/Core/Card/Card';
import pointSubmitAPI from '../../api/pointSubmit';

export default function ListPointSubmit() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState({});
  const toast = useToast();
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    fetchPoint();
  }, [isSubmit]);

  const fetchPoint = async () => {
    const data = await pointSubmitAPI.get();
    setTableData(data);
  };

  const getData = async (data) => {
    axiosClient.get('/api/point-submit?page=' + data.page).then((response) => {
      setTableData(response);
    });
  };

  const deleteUser = (id) => {
    setIsSubmit(!isSubmit);
    pointSubmitAPI
      .delete(id)
      .then((res) => {
        toast({
          title: 'Thông báo',
          description: res.msg,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((err) => {
        setIsSubmit(!isSubmit);
        toast({
          title: 'Lỗi',
          description: err.errorInfo,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
  };
  return (
    <Card p="20px">
      <TableContainer>
        <Flex px="25px" justify="space-between" mb="20px" align="center">
          <Text fontSize="22px" fontWeight="700" lineHeight="100%">
            Danh sách tài khoản
          </Text>
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Sinh viên</Th>
              <Th>Khóa học</Th>
              <Th>Nội dung</Th>
              <Th>Điểm</Th>
              <Th>Loại</Th>
              <Th textAlign={'center'}>Thao tác</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.data ? (
              tableData.data.map((pointSubmit, index) => (
                <Tr key={index}>
                  <Td>{pointSubmit.id}</Td>
                  <Td>{pointSubmit.user_name}</Td>
                  <Td>{`${pointSubmit.class_code} - ${pointSubmit.course_name}`}</Td>
                  <Td>{pointSubmit.pointSubmitable_type !== 'quizs' ? pointSubmit.content : ''}</Td>
                  <Td>{pointSubmit.point}</Td>
                  <Td>{pointSubmit.pointSubmitable_type}</Td>
                  <Td display={'flex'} gap={'5px'}>
                    <Popover isLazy placement="bottom-end">
                      <PopoverTrigger>
                        <Button flex={1} colorScheme="red">
                          Xóa
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverHeader fontWeight="semibold">Bạn có muốn xóa không ?</PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                          <Button
                            flex={1}
                            colorScheme="red"
                            onClick={() => {
                              deleteUser(pointSubmit.id);
                            }}
                          >
                            Đồng ý
                          </Button>
                          <Button flex={1} colorScheme="gray">
                            Hủy
                          </Button>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td>
                  <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        {tableData ? (
          <Pagination
            nextButtonText={'Tiếp'}
            prevButtonText={'Trước'}
            changePage={getData}
            data={tableData}
            containerClass={'pagination'}
          />
        ) : null}
      </TableContainer>
    </Card>
  );
}
