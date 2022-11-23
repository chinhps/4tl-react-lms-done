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
import majorAPI from '../../../api/majorAPI';
import { MdCheckCircle, MdCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'react-laravel-paginex';
import axiosClient from '../../../api/axiosClient';
import Card from '../../../Components/Core/Card/Card';

export default function ListMajor() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState({});
  const toast = useToast();
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    majorAPI.get().then((major) => {
      setTableData(major);
    });
  }, [isSubmit]);
  const getData = async (data) => {
    axiosClient.get('/api/majors?page=' + data.page).then((response) => {
      setTableData(response);
    });
  };

  const deleteMajor = (id) => {
    setIsSubmit(!isSubmit);
    majorAPI
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
              <Th>Tên ngành</Th>
              <Th>Slug</Th>
              <Th>Trạng thái</Th>
              <Th textAlign={'center'}>Thao tác</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.data ? (
              tableData.data.map((major, index) => (
                <Tr key={index}>
                  <Td>{major.id}</Td>
                  <Td>{major.name}</Td>
                  <Td>{major.slug}</Td>
                  <Td>
                    {major.status == 1 ? (
                      <Flex align="center">
                        <Icon w="24px" h="24px" me="5px" color={'green.500'} as={MdCheckCircle} />
                        <Text fontSize="sm" fontWeight="700">
                          Hiện
                        </Text>
                      </Flex>
                    ) : (
                      <Flex align="center">
                        <Icon w="24px" h="24px" me="5px" color={'red.500'} as={MdCancel} />
                        <Text fontSize="sm" fontWeight="700">
                          Ẩn
                        </Text>
                      </Flex>
                    )}
                  </Td>
                  <Td display={'flex'} gap={'5px'}>
                    <Button
                      flex={1}
                      colorScheme="teal"
                      onClick={() => {
                        navigate(`/major/update/${major.id}`);
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
                              deleteMajor(major.id);
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
