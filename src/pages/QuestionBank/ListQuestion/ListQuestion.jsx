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
  Spinner,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'react-laravel-paginex';
import axiosClient from '../../../api/axiosClient';
import Card from '../../../Components/Core/Card/Card';
import questionsBankAPI from '../../../api/questionBankAPI';

export default function ListQuestion() {
  const { onClose } = useDisclosure();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState();
  const toast = useToast();

  useEffect(() => {
    fetchQuestionBank();
  }, []);

  const fetchQuestionBank = async () => {
    const data = await questionsBankAPI.get();
    setTableData(data);
  };

  const deleteQuestion = async (id) => {
    await questionsBankAPI
      .delete(id)
      .then(() => {
        toast({
          title: 'Thông báo',
          description: 'Xóa thành công',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        fetchQuestionBank();
      })
      .catch((err) => {
        toast({
          title: 'Thông báo',
          description: 'Lỗi không xác định',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
  };

  const getData = async (data) => {
    axiosClient.get('/api/question_bank?page=' + data.page).then((response) => {
      setTableData(response);
    });
  };
  return (
    <Card p="20px">
      {tableData ? (
        <TableContainer>
          <Flex px="25px" justify="space-between" mb="20px" align="center">
            <Text fontSize="22px" fontWeight="700" lineHeight="100%">
              Danh sách tài khoản
            </Text>
          </Flex>
          <Table variant="simple" style={{ width: '100%', tableLayout: 'auto' }}>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Môn học</Th>
                <Th>Câu hỏi</Th>
                <Th>Câu trả lời</Th>
                <Th>Level</Th>
                <Th>Người tạo</Th>
                <Th>Ngày tạo</Th>
                <Th textAlign={'center'}>Thao tác</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.data ? (
                tableData.data.map((data, index) => (
                  <Tr key={index} style={{ borderBottom: '1.1px solid #cdcdcd' }}>
                    <Td>{data.id}</Td>
                    <Td>{data.subject_name}</Td>
                    <Td style={{ whiteSpace: 'normal' }}>{data.question}</Td>
                    <Td style={{ whiteSpace: 'normal' }}>
                      {JSON.parse(data?.answers)?.map((answer, index2) => (
                        <div key={`${index}-${index2}`}>
                          {answer.isCorrect ? (
                            <p style={{ color: 'red' }} key={index2}>
                              {answer.answer}
                            </p>
                          ) : (
                            <p key={index2}>{answer.answer}</p>
                          )}

                          <br />
                        </div>
                      ))}
                    </Td>
                    <Td>{data.level}</Td>
                    <Td>{data.user_name}</Td>
                    <Td>{data.created_at}</Td>
                    <Td gap={'5px'}>
                      <Flex direction={'column'} gap={'5px'}>
                        <Button
                          w={'100%'}
                          style={{ marginRight: '5px' }}
                          colorScheme="teal"
                          onClick={() => navigate(`/question-bank/update/${data.id}`)}
                        >
                          Sửa
                        </Button>
                        <Popover onClose={onClose} closeOnBlur={true} isLazy placement="bottom-end">
                          <PopoverTrigger>
                            <Button w={'100%'} colorScheme="red">
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
                                  deleteQuestion(data.id);
                                }}
                              >
                                Đồng ý
                              </Button>
                              <Button flex={1} colorScheme="gray" onClick={onClose}>
                                Hủy
                              </Button>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Flex>
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
      ) : (
        <Spinner size="xl" />
      )}
    </Card>
  );
}
