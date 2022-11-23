import { Button, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userAPI from '../../../api/userAPI';
import { Pagination } from 'react-laravel-paginex';
import axiosClient from '../../../api/axiosClient';
import Card from '../../../Components/Core/Card/Card';
import questionsBankAPI from '../../../api/questionBankAPI';

export default function ListQuestion() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await questionsBankAPI.get();
    setTableData(data);
    console.log(data);
  };

  const getData = async (data) => {
    axiosClient.get('/api/question_bank?page=' + data.page).then((response) => {
      setTableData(response);
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
                      <>
                        {answer.isCorrect ? (
                          <p style={{ color: 'red' }} key={index2}>
                            {answer.answer}
                          </p>
                        ) : (
                          <p key={index2}>{answer.answer}</p>
                        )}

                        <br />
                      </>
                    ))}
                  </Td>
                  <Td>{data.level}</Td>
                  <Td>{data.user_id}</Td>
                  <Td>{data.created_at}</Td>
                  <Td gap={'5px'}>
                    <Button
                      style={{ marginRight: '5px' }}
                      colorScheme="teal"
                      onClick={() => navigate(`/user/update/${data.id}`)}
                    >
                      Sửa
                    </Button>
                    <Button colorScheme="red">Xóa</Button>
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
