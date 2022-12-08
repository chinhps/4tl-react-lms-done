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
import userAPI from '../../../api/userAPI';
import { Pagination } from 'react-laravel-paginex';
import axiosClient from '../../../api/axiosClient';
import Card from '../../../Components/Core/Card/Card';

export default function ListUser() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState({});
  const toast = useToast();
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [isSubmit]);

  const fetchUsers = async () => {
    const data = await userAPI.get();
    setTableData(data);
    console.log(data);
  };

  const getData = async (data) => {
    axiosClient.get('/api/users?page=' + data.page).then((response) => {
      setTableData(response);
    });
  };

  const deleteUser = (id) => {
    setIsSubmit(false);
    userAPI
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
        setIsSubmit(false);
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
        <Table variant="simple" overflowX={'scroll'}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Mã số</Th>
              <Th>Họ và tên</Th>
              <Th>Email</Th>
              <Th>Số điện thoại</Th>
              <Th>Trạng thái</Th>
              <Th>Vai trò</Th>
              <Th>Lớp</Th>
              <Th textAlign={'center'}>Thao tác</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.data ? (
              tableData.data.map((user, index) => (
                <Tr key={index}>
                  <Td>{user.id}</Td>
                  <Td>{user.user_code}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.phone_number}</Td>
                  <Td>{user.status === 1 ? 'Không bị khóa' : 'Bị khóa'}</Td>
                  <Td>{user.role_name}</Td>
                  <Td>{user.class_name}</Td>

                  <Td display={'flex'} gap={'5px'}>
                    <Button flex={1} colorScheme="teal" onClick={() => navigate(`/user/update/${user.id}`)}>
                      Sửa
                    </Button>
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
                              deleteUser(user.id);
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
              <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
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
