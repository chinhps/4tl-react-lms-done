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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'react-laravel-paginex';
import axiosClient from '../../../api/axiosClient';
import Card from '../../../Components/Core/Card/Card';
import classesAPI from '../../../api/classesAPI';

export default function ListClasses() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState({});
  const toast = useToast();
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    classesAPI.get().then((major) => {
      setTableData(major);
    });
  }, [isSubmit]);
  const getData = async (data) => {
    axiosClient.get('/api/classes?page=' + data.page).then((response) => {
      setTableData(response);
    });
  };

  const deletePermission = (id) => {
    setIsSubmit(!isSubmit);
    classesAPI
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
            Danh sách quyền
          </Text>
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Tên lớp </Th>
              <Th textAlign={'center'} w={300}>
                Thao tác
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.data ? (
              tableData.data.map((permission, index) => (
                <Tr key={index}>
                  <Td>{permission.id}</Td>
                  <Td>{permission.class_name}</Td>

                  <Td display={'flex'} gap={'5px'} maxWidth={300}>
                    <Button
                      flex={1}
                      colorScheme="teal"
                      onClick={() => {
                        navigate(`/classes/update/${permission.id}`);
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
                              deletePermission(permission.id);
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
