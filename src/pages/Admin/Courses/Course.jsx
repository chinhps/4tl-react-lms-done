import { Button, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import courseAPI from '../../../api/courseAPI';
import { useNavigate } from "react-router-dom";

export default function Course() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState();
  useEffect(() => {
    courseAPI.get().then((course) => {
      setTableData(course);
    });
  }, []);
  return (
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
          {tableData?.map((course, index) => (
            <Tr key={index}>
              <Td>{course.id}</Td>
              <Td>{course.class_code}</Td>
              <Td>{course.subject_name}</Td>
              <Td>{course.course_name}</Td>
              <Td>{course.status == 1 ? 'Không bị khóa' : 'Bị khóa'}</Td>
              <Td display={'flex'} gap={'5px'}>
                <Button flex={1} colorScheme="teal" onClick={()=> {navigate(`/admin/courses/${course.id}`)}}>
                  Sửa
                </Button>
                <Button flex={1} colorScheme="red">
                  Xóa
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
