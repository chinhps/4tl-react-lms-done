import React from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  GridItem,
  Flex,
  Text,
  Spinner,
  Box,
  Button,
} from '@chakra-ui/react';
import Overviews from './component/Overviews';
import Card from '../../Components/Core/Card/Card';
import HistoryCourse from '../../Components/Core/Table/HistoryCourse';
import MiniCalendar from '../../Components/Core/MiniCalendar/MiniCalendar';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import coursesAPI from '../../api/coursesAPI';
import { useState } from 'react';
import Documents from './component/Documents';
import Labs from './component/Labs';
import Quizs from './component/Quizs';
import InfoProfile from '../../Components/Core/InfoProfile';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import { useSelector } from 'react-redux';

function Coures() {
  const { slugCourse } = useParams();
  const { user } = useSelector((state) => state.user);
  const [course, setCourse] = useState(null);
  const params = useParams();

  useEffect(() => {
    coursesAPI.getDocQuizLab(params.slugCourse).then((data) => {
      setCourse(data.data);
    });
  }, [params]);

  return (
    <>
      <Grid
        gridTemplateColumns={{ xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr' }}
        gap={{ base: '20px', xl: '20px' }}
        display={{ base: 'block', xl: 'grid' }}
      >
        <GridItem gridArea={{ xl: '1 / 1 / 3 / 3', '2xl': '1 / 1 / 2 / 2' }}>
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList justifyContent="space-between">
              <Flex>
                <Tab>Tổng quan</Tab>
                <Tab>Tài liệu</Tab>
                <Tab>Bài Lab</Tab>
                <Tab>Bài Quiz</Tab>
                {user.role.role_code === 'LECTURER' ? (
                  <>
                    <Tab color="#34cf28">Sinh viên</Tab>
                    <Tab color="#34cf28">Bảng điểm</Tab>
                  </> 
                ) : null}
              </Flex>

              {user.role.role_code === 'LECTURER' ? (
                <Menu>
                  <MenuButton as={Button} rounded="lg" rightIcon={<FiChevronDown />}>
                    Thao tác
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Thêm tài liệu</MenuItem>
                    <MenuItem>Thêm bài Lab</MenuItem>
                    <MenuItem>Thêm Quiz</MenuItem>
                  </MenuList>
                </Menu>
              ) : null}
            </TabList>
            {course ? (
              <TabPanels>
                <TabPanel>
                  <Overviews courses={course} />
                </TabPanel>
                <TabPanel>
                  <Documents courses={course} />
                </TabPanel>
                <TabPanel>
                  <Labs courses={course} />
                </TabPanel>
                <TabPanel>
                  <Quizs courses={course} />
                </TabPanel>
              </TabPanels>
            ) : (
              <Box p={5}>
                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
              </Box>
            )}
          </Tabs>
        </GridItem>
        <GridItem>
          <Flex flexDirection="column" gap="20px">
            {course?.courses ? (
              <InfoProfile
                gridArea="1 / 1 / 2 / 2"
                banner={'https://i.imgur.com/Btvvz1B.png'}
                name={course.courses.class_code + ' - ' + course.courses.name}
                countInfo={[
                  {
                    name: 'Sinh viên',
                    value: course.student_joined.length,
                  },
                  {
                    name: 'Bài tập',
                    value: course.quizs.length + course.labs.length,
                  },
                  {
                    name: 'Tài liệu',
                    value: course.documents.length,
                  },
                ]}
              />
            ) : (
              <Box p={5}>
                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
              </Box>
            )}

            <MiniCalendar minW="100%" selectRange={false} />
            <HistoryCourse limit={6} />
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
}

export default Coures;
