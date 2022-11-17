import { Flex, Table, Progress, Icon, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';

// Custom components
import Card from '../../../Components/Core/Card/Card';
import Menu from '../../../Components/menu/MainMenu';

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from 'react-icons/md';
export default function ListSubject() {
  const columnsData = [
    {
      Header: 'ID môn học',
      accessor: 'subject_id',
    },
    {
      Header: 'Mã môn học',
      accessor: 'code',
    },
    {
      Header: 'Tên môn học',
      accessor: 'name',
    },
    {
      Header: 'Ngành học',
      accessor: 'major_id',
    },
    {
      Header: 'Hiển thị',
      accessor: 'status',
    },
  ];
  const tableData = [
      {
        subject_id: 1,
        code: 'COM107',
        name: 'Marketplace',
        major_id: '1',
        status: 'Approved',
        date: '24.Jan.2021',
        progress: 75.5,
      },
      {
        subject_id: 1,
        code: 'COM107',
        name: 'Marketplace',
        major_id: '1',
        status: 'Disable',
        date: '30.Dec.2021',
        progress: 25.5,
      },
      {
        subject_id: 1,
        code: 'COM107',
        name: 'Marketplace',
        major_id: '1',
        status: 'Error',
        date: '20.May.2021',
        progress: 90,
      },
      {
        subject_id: 1,
        code: 'COM107',
        name: 'Marketplace',
        major_id: '1',
        status: 'Approved',
        date: '12.Jul.2021',
        progress: 50.5,
      },
    ]

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
          Complex Table
        </Text>
        <Menu />
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
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
                  if (cell.column.Header === 'ID môn học') {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === 'Mã môn học') {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === 'Tên môn học') {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === 'Ngành học') {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === 'Hiển thị') {
                    data = (
                      <Flex align="center">
                        <Icon
                          w="24px"
                          h="24px"
                          me="5px"
                          color={
                            cell.value === 'Approved'
                              ? 'green.500'
                              : cell.value === 'Disable'
                              ? 'red.500'
                              : cell.value === 'Error'
                              ? 'orange.500'
                              : null
                          }
                          as={
                            cell.value === 'Approved'
                              ? MdCheckCircle
                              : cell.value === 'Disable'
                              ? MdCancel
                              : cell.value === 'Error'
                              ? MdOutlineError
                              : null
                          }
                        />
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
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
