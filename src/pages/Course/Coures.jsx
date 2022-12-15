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
  useDisclosure,
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
import ModelNewDocument from './model/ModelNewDocument';
import ModelNewLab from './model/ModelNewLab';
import ModelNewQuiz from './model/ModelNewQuiz';
import Student from './component/Student';
import ListMarkQuiz from './component/ListMarkQuiz';
import ListMarkLab from './component/ListMarkLab';

function Coures() {
  const { slugCourse } = useParams();
  const { user } = useSelector((state) => state.user);
  const [course, setCourse] = useState(null);
  const params = useParams();
  const { isOpen: isOpenDocument, onOpen: onOpenDocument, onClose: onCloseDocument } = useDisclosure();
  const { isOpen: isOpenQuiz, onOpen: onOpenQuiz, onClose: onCloseQuiz } = useDisclosure();
  const { isOpen: isOpenLab, onOpen: onOpenLab, onClose: onCloseLab } = useDisclosure();

  useEffect(() => {
    coursesAPI.getDocQuizLab(params.slugCourse).then((data) => {
      setCourse(data.data);
    });
  }, [params]);

  return (
    <>
      {isOpenDocument ? (
        <ModelNewDocument
          title="Thêm mới tài liệu"
          slugCourse={params.slugCourse}
          isOpen={isOpenDocument}
          onClose={onCloseDocument}
        />
      ) : isOpenQuiz ? (
        <ModelNewQuiz title="Thêm mới Quiz" slugCourse={params.slugCourse} isOpen={isOpenQuiz} onClose={onCloseQuiz} />
      ) : isOpenLab ? (
        <ModelNewLab title="Thêm mới Lab" slugCourse={params.slugCourse} isOpen={isOpenLab} onClose={onCloseLab} />
      ) : null}

      <Grid
        gridTemplateColumns={{ xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr' }}
        // gap={{ base: '20px', xl: '20px' }}
        display={{ base: 'block', xl: 'grid' }}
      >
        <GridItem gridArea={{ xl: '1 / 1 / 3 / 3', '2xl': '1 / 1 / 2 / 2' }}>
          <Tabs isLazy variant="soft-rounded" colorScheme="green">
            <TabList justifyContent="space-between" px={4}>
              <Flex>
                <Tab>Tổng quan</Tab>
                <Tab>Tài liệu</Tab>
                <Tab>Bài Lab</Tab>
                <Tab>Bài Quiz</Tab>
                {user.role.role_code === 'LECTURER' ? (
                  <>
                    <Tab color="#34cf28">Sinh viên</Tab>
                    <Tab color="#34cf28">Bảng điểm Quiz</Tab>
                    <Tab color="#34cf28">Bảng điểm Lab</Tab>
                  </>
                ) : null}
              </Flex>

              {user.role.role_code === 'LECTURER' ? (
                <Menu>
                  <MenuButton as={Button} rounded="lg" rightIcon={<FiChevronDown />}>
                    Thao tác
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={onOpenDocument}>Thêm tài liệu</MenuItem>
                    <MenuItem onClick={onOpenLab}>Thêm bài Lab</MenuItem>
                    <MenuItem onClick={onOpenQuiz}>Thêm Quiz</MenuItem>
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
                <TabPanel>
                  <Student />
                </TabPanel>
                <TabPanel>
                  <ListMarkQuiz />
                </TabPanel>
                <TabPanel>
                  <ListMarkLab />
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
