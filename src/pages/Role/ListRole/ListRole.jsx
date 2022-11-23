import {
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import rolesAPI from '../../../api/roleAPI';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'react-laravel-paginex';
import axiosClient from '../../../api/axiosClient';
import Card from '../../../Components/Core/Card/Card';

export default function ListRole() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState({});
  const toast = useToast();
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    rolesAPI.get().then((major) => {
      setTableData(major);
    });
  }, [isSubmit]);
  const getData = async (data) => {
    axiosClient.get('/api/role?page=' + data.page).then((response) => {
      setTableData(response);
    });
  };

  const deleteRole = (id) => {
    setIsSubmit(!isSubmit);
    rolesAPI
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
            Danh sách ngành học
          </Text>
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Mã Quyền </Th>
              <Th>Tên Quyền</Th>
              <Th textAlign={'center'}>Thao tác</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.data ? (
              tableData.data.map((role, index) => (
                <Tr key={index}>
                  <Td>{role.id}</Td>
                  <Td>{role.role_code}</Td>
                  <Td>{role.role_name}</Td>
                  <Td display={'flex'} gap={'5px'}>
                    <Button
                      flex={1}
                      colorScheme="teal"
                      onClick={() => {
                        navigate(`/role/update/${role.id}`);
                      }}
                    >
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
                              deleteRole(role.id);
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
