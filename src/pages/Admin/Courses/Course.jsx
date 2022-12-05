import {
  Button,
  Flex,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import coursesAPI from '../../../api/coursesAPI';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'react-laravel-paginex';
import axiosClient from '../../../api/axiosClient';
import Card from '../../../Components/Core/Card/Card';
import { MdCancel, MdCheckCircle } from 'react-icons/md';

export default function Course() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState({});
  const toast = useToast();
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    coursesAPI.get().then((course) => {
      setTableData(course);
    });
  }, [isSubmit]);
  const getData = async (data) => {
    axiosClient.get('/api/courses?page=' + data.page).then((response) => {
      setTableData(response);
    });
  };

  const deleteCourses = (id) => {
    setIsSubmit(!isSubmit);
    coursesAPI
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
                  <Td>
                    {course.status == 1 ? (
                      <Flex align="center">
                        <Icon w="24px" h="24px" me="5px" color={'green.500'} as={MdCheckCircle} />
                        <Text fontSize="sm" fontWeight="700">
                          Bình thường
                        </Text>
                      </Flex>
                    ) : (
                      <Flex align="center">
                        <Icon w="24px" h="24px" me="5px" color={'red.500'} as={MdCancel} />
                        <Text fontSize="sm" fontWeight="700">
                          Khóa
                        </Text>
                      </Flex>
                    )}
                  </Td>
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
                              deleteCourses(course.id);
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
              <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
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
