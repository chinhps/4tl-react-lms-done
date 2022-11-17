import { Button, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import coursesAPI from '../../../api/coursesAPI';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'react-laravel-paginex';
import axiosClient from '../../../api/axiosClient';
import Card from '../../../Components/Core/Card/Card';

export default function Course() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState({});
  useEffect(() => {
    coursesAPI.get().then((course) => {
      setTableData(course);
    });
  }, []);
  const getData = async (data) => {
    axiosClient.get('/api/courses?page=' + data.page).then((response) => {
      setTableData(response);
    });
  };
  return (
    <Card p='20px'>
      <TableContainer>
        <Flex px="25px" justify="space-between" mb="20px" align="center">
          <Text fontSize="22px" fontWeight="700" lineHeight="100%">
            Danh sách khóa học
          </Text>
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Mã lớp</Th>
              <Th>Môn học</Th>
              <Th>Giáo viên</Th>
              <Th>Trạng thái</Th>
              <Th textAlign={'center'}>Thao tác</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.data ? (
              tableData.data.map((course, index) => (
                <Tr key={index}>
                  <Td>{course.id}</Td>
                  <Td>{course.class_code}</Td>
                  <Td>{course.subject_name}</Td>
                  <Td>{course.course_name}</Td>
                  <Td>{course.status == 1 ? 'Không bị khóa' : 'Bị khóa'}</Td>
                  <Td display={'flex'} gap={'5px'}>
                    <Button
                      flex={1}
                      colorScheme="teal"
                      onClick={() => {
                        navigate(`/admin/courses/${course.id}`);
                      }}
                    >
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
