import { Box, chakra, Flex, Icon, SimpleGrid, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsPerson } from 'react-icons/bs';

import {
  FiServer,
  FiBookOpen,
  FiFile,
  FiRss,
  FiLock,
  FiEye,
  FiGrid,
  FiDatabase,
  FiInbox,
  FiUser,
} from 'react-icons/fi';
import dashboardAPI from '../../api/dashboardAPI';
import Card from '../../Components/Core/Card/Card';
import Chart from '../../Components/Core/Chart/Chart';
import StatsCard from './StatsCard';

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';

  const getDashboard = () => {
    dashboardAPI.getAll().then((res) => {
      setDashboard(res);
    });
  };
  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <>
      {dashboard ? (
        <Flex flexDirection="column" gap={3} maxW="100%" minH={'100vh'} mx={'auto'} pt={5} px={{ base: 2 }} m={0}>
          <Box>
            <Text color={textColorPrimary} fontWeight="bold" fontSize="3xl" mt="10px" mb="4px">
              Thống kê
            </Text>
            <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
              Thống kê các hoạt động của hệ thống
            </Text>
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 5 }} gap={3}>
            <StatsCard title={'Người dùng'} stat={dashboard?.users} icon={FiUser} />
            <StatsCard title={'Lớp học'} stat={dashboard?.classes} icon={FiServer} />
            <StatsCard title={'Bài Labs'} stat={dashboard?.labs} icon={FiBookOpen} />
            <StatsCard title={'Ngành học'} stat={dashboard?.majors} icon={FiFile} />
            <StatsCard title={'Tin tức'} stat={dashboard?.news} icon={FiRss} />
            <StatsCard title={'Quyền'} stat={dashboard?.permissions} icon={FiLock} />
            <StatsCard title={'Câu hỏi'} stat={dashboard?.question_bank} icon={FiDatabase} />
            <StatsCard title={'Bài Quiz'} stat={dashboard?.quizs} icon={FiInbox} />
            <StatsCard title={'Phân quyền'} stat={dashboard?.role} icon={FiEye} />
            <StatsCard title={'Môn học'} stat={dashboard?.subjects} icon={FiGrid} />
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
            <Card>
              <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px" mb="4px">
                Sinh viên mới
              </Text>
              <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
                Thống kê sinh viên mới 3 tháng gần đây
              </Text>
              <Chart />
            </Card>
            <Card>
              <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px" mb="4px">
                Tin tức mới
              </Text>
              <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
                Thống kê tin tức mới 3 tháng gần đây
              </Text>
              <Chart />
            </Card>
          </SimpleGrid>
        </Flex>
      ) : (
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      )}
    </>
  );
}
