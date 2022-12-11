import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useColorModeValue,
  Text,
  Badge,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import coursesAPI from '../../../api/coursesAPI';
import Card from '../../../Components/Core/Card/Card';

function ListMarkLab() {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const [listStudent, setListStudent] = useState([]);
  const { slugCourse } = useParams();

  useEffect(() => {
    coursesAPI.getStudents(slugCourse).then((data) => {
      setListStudent(data);
    });
  }, []);
  return (
    <>
      <Card mb={{ base: '0px', '2xl': '20px' }}>
        <Text color={textColorPrimary} fontWeight="bold" fontSize="2xl" mt="10px" mb="15px">
          Danh sách điểm Lab
        </Text>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Danh sách sinh viên đã làm bài</TableCaption>
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Mã sinh viên</Th>
                <Th>Họ và tên</Th>
                <Th>Email</Th>
                <Th>Chức vụ</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listStudent.map((student, index) => (
                <Tr key={student.id}>
                  <Td>{student.id}</Td>
                  <Td>{student.user_code}</Td>
                  <Td>{student.name}</Td>
                  <Td>{student.email}</Td>
                  <Td>
                    <Badge colorScheme={student.role_code === 'STUDENT' ? 'green' : 'red'}>{student.role_name}</Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}

export default ListMarkLab;
