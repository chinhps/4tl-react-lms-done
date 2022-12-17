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
  Flex,
  Box,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import coursesAPI from '../../../api/coursesAPI';
import pointSubmitAPI from '../../../api/pointSubmit';
import Card from '../../../Components/Core/Card/Card';

function Student() {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';

  const [listStudent, setListStudent] = useState([]);
  const { slugCourse } = useParams();
  const [loadExport, setLoadExport] = useState(false);

  useEffect(() => {
    coursesAPI.getStudents(slugCourse).then((data) => {
      setListStudent(data);
    });
  }, []);

  const handleExport = async () => {
    setLoadExport(true);
    const fetchData = await pointSubmitAPI.export('all', slugCourse);
    var blob = new Blob([fetchData]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `Lab&Quiz_${slugCourse}_${new Date().getTime()}.xlsx`;
    link.click();
    setLoadExport(false);
  };

  return (
    <>
      <Card mb={{ base: '0px', '2xl': '20px' }}>
        <Flex justifyContent="space-between">
          <Box>
            <Text color={textColorPrimary} fontWeight="bold" fontSize="2xl" mt="10px" mb="15px">
              Danh sách sinh viên
            </Text>
            <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
              Tải về danh sách điểm Lab và Quiz
            </Text>
          </Box>

          <Button
            isLoading={loadExport}
            rightIcon={<FiChevronRight />}
            rounded="md"
            colorScheme="teal"
            variant="outline"
            onClick={() => handleExport()}
          >
            Tải bảng điểm
          </Button>
        </Flex>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Danh sách sinh viên đã tham gia lớp học này</TableCaption>
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

export default Student;
