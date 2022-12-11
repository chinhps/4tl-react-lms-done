import { Box, chakra, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsPerson } from 'react-icons/bs';

import { FiServer, FiBookOpen, FiFile, FiRss, FiLock, FiEye, FiGrid, FiDatabase, FiInbox } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
import dashboardAPI from '../../api/dashboardAPI';
import Card from '../../Components/Core/Card/Card';
import StatsCard from './StatsCard';

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const getDashboard = () => {
    dashboardAPI.getAll().then((res) => {
      setDashboard(res);
    });
  };
  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <Card>
      {dashboard ? (
        <Box maxW="100%" minH={'100vh'} mx={'auto'} pt={5} px={{ base: 2 }} m={0}>
          <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
            Thống kê
          </chakra.h1>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 5 }} gap={10}>
            <StatsCard title={'Người dùng'} stat={dashboard?.users} icon={<BsPerson size={'3em'} />} />
            <StatsCard title={'Lớp học'} stat={dashboard?.classes} icon={<FiServer size={'3em'} />} />
            <StatsCard title={'Bài Labs'} stat={dashboard?.labs} icon={<FiBookOpen size={'3em'} />} />
            <StatsCard title={'Ngành học'} stat={dashboard?.majors} icon={<FiFile size={'3em'} />} />
            <StatsCard title={'Tin tức'} stat={dashboard?.news} icon={<FiRss size={'3em'} />} />
            <StatsCard title={'Quyền'} stat={dashboard?.permissions} icon={<FiLock size={'3em'} />} />
            <StatsCard title={'Câu hỏi'} stat={dashboard?.question_bank} icon={<FiDatabase size={'3em'} />} />
            <StatsCard title={'Bài Quiz'} stat={dashboard?.quizs} icon={<FiInbox size={'3em'} />} />
            <StatsCard title={'Phân quyền'} stat={dashboard?.role} icon={<FiEye size={'3em'} />} />
            <StatsCard title={'Môn học'} stat={dashboard?.subjects} icon={<FiGrid size={'3em'} />} />
          </SimpleGrid>
        </Box>
      ) : (
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      )}
    </Card>
  );
}
