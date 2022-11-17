import {
  Button,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
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

  useEffect(() => {
    fetchUsers();
  }, []);

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
  return (
    <Card p='20px'>
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
              <Th>Mã số</Th>
              <Th>Họ và tên</Th>
              <Th>Email</Th>
              <Th>Số điện thoại</Th>
              <Th>Trạng thái</Th>
              <Th>Vai trò</Th>
              <Th>Lớp</Th>
              <Th>Ngày tạo</Th>
              <Th>Cập nhật lúc</Th>
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
                  <Td>{user.status == 1 ? 'Không bị khóa' : 'Bị khóa'}</Td>
                  <Td>{user.role_name}</Td>
                  <Td>{user.class_name}</Td>
                  <Td>{user.created_at}</Td>
                  <Td>{user.created_at}</Td>
                  <Td display={'flex'} gap={'5px'}>
                    <Button flex={1} colorScheme="teal" onClick={() => navigate(`/user/update/${user.id}`)}>
                      Sửa
                    </Button>
                    <Button flex={1} colorScheme="red">
                      Xóa
                    </Button>
                  </Td>
                </Tr>
              ))
            ) : (
              <></>
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
