import { Button, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, Icon } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import subjectsAPI from '../../../api/subjectAPI';
import { MdCheckCircle, MdCancel, MdOutlineError } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'react-laravel-paginex';
import axiosClient from '../../../api/axiosClient';
import Card from '../../../Components/Core/Card/Card';

export default function ListSubject() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState({});

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const data = await subjectsAPI.get();
    setTableData(data);
  };

  const getData = async (data) => {
    axiosClient.get('/api/subjects?page=' + data.page).then((response) => {
      setTableData(response);
    });
  };
  return (
    <Card p="20px">
      <TableContainer>
        <Flex px="25px" justify="space-between" mb="20px" align="center">
          <Text fontSize="22px" fontWeight="700" lineHeight="100%">
            Danh sách môn học
          </Text>
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Mã môn học</Th>
              <Th>Tên môn học</Th>
              <Th>Cha</Th>
              <Th>Trạng thái</Th>
              <Th textAlign={'center'}>Thao tác</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.data ? (
              tableData.data.map((subject, index) => (
                <Tr key={index}>
                  <Td>{subject.id}</Td>
                  <Td>{subject.code}</Td>
                  <Td>{subject.name}</Td>
                  <Td>{subject.major_name}</Td>
                  <Td>
                    {subject.status == 1 ? (
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
                    <Button flex={1} colorScheme="teal" onClick={() => navigate(`/subject/update/${subject.id}`)}>
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
