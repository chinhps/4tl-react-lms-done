import {
  Flex,
  Table,
  Progress,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  Box,
  useToast,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';

// Custom components
import Card from '../../../Components/Core/Card/Card';
import Menu from '../../../Components/menu/MainMenu';

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from 'react-icons/md';
import coursesAPI from '../../../api/courseAPI';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Course() {
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columnsData = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Mã khóa học',
      accessor: 'subject_id',
    },
    {
      Header: 'Mã lớp',
      accessor: 'class_code',
    },
    {
      Header: 'Tên giáo viên',
      accessor: 'name',
    },
    {
      Header: 'Trạng thái',
      accessor: 'status',
    },
    {
      Header: 'Thao tác',
      accessor: 'edit',
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let tableData = [{ id: '123', subject_id: '234', class_code: 'fdfd', name: '433', status: 0, edit: 5 }];
  useEffect(() => {
    coursesAPI.get().then((res) => {
      return res.map((item) => {
        return tableData.push({
          id: item.id,
          subject_id: item.subject_id,
          class_code: item.class_code,
          name: item.name,
          status: item.status,
          edit: item.id,
        });
      });
    });
  }, []);
  const toast = useToast();

  const handleDelete = (id) => {
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
        toast({
          title: 'Lỗi',
          description: err.errorInfo,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
  };
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, initialState } = tableInstance;
  initialState.pageSize = 5;

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  return (
    <Card direction="column" w="100%" px="0px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
          Danh sách khóa học
        </Text>
        <Menu />
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th pe="10px" key={index} borderColor={borderColor}>
                  <Flex justify="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                    {column.render('Header')}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = '';
                  if (cell.column.Header === 'ID') {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === 'Mã khóa học') {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === 'Mã lớp') {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === 'Tên giáo viên') {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === 'Trạng thái') {
                    data = (
                      <Flex align="center">
                        <Icon
                          w="24px"
                          h="24px"
                          me="5px"
                          color={
                            cell.value === 1
                              ? 'green.500'
                              : cell.value === 0
                              ? 'red.500'
                              : cell.value === 'Error'
                              ? 'orange.500'
                              : null
                          }
                          as={
                            cell.value === 1
                              ? MdCheckCircle
                              : cell.value === 0
                              ? MdCancel
                              : cell.value === 'Error'
                              ? MdOutlineError
                              : null
                          }
                        />
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value === 1 ? 'Hiện' : 'Ẩn'}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === 'Thao tác') {
                    data = (
                      <Flex gap={'1rem'}>
                        <Button
                          bg={'chocolate'}
                          color={'white'}
                          onClick={() => {
                            navigate(`/admin/courses/${cell.value}`);
                          }}
                        >
                          Sửa
                        </Button>
                        <Button
                          bg={'red.500'}
                          color={'white'}
                          onClick={() => {
                            handleDelete(cell.value);
                          }}
                        >
                          Xóa
                        </Button>
                      </Flex>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: '14px' }}
                      minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
