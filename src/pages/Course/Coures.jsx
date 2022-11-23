import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Grid, GridItem, Flex, Text } from '@chakra-ui/react';
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

function Coures() {
  const { slugCourse } = useParams();
  const [course, setCourse] = useState([]);
  const params = useParams();

  useEffect(() => {
    coursesAPI.getDocQuizLab(params.slugCourse).then((data) => {
      data.quizs?.sort(function (a, b) {
        return a.id - b.id;
      });
      data.labs?.sort(function (a, b) {
        return a.id - b.id;
      });
      data.documents?.sort(function (a, b) {
        return a.id - b.id;
      });
      console.log(123, data);
      setCourse(data);
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
            <TabList>
              <Tab>Tổng quan</Tab>
              <Tab>Tài liệu</Tab>
              <Tab>Bài Lab</Tab>
              <Tab>Bài Quiz</Tab>
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
            ) : null}
          </Tabs>
        </GridItem>
        <GridItem>
          <Flex flexDirection="column" gap="20px">
            {course.courses ? (
              <InfoProfile
                gridArea="1 / 1 / 2 / 2"
                banner={"https://i.imgur.com/Btvvz1B.png"}
                name={ course.courses.class_code + ' - ' +course.courses.name}
                countInfo={[
                  {
                    name: 'Sinh viên',
                    value: course.student_joined.length
                  },
                  {
                    name: 'Bài tập',
                    value: course.courses.quizs.length + course.courses.labs.length
                  },
                  {
                    name: 'Tài liệu',
                    value: course.courses.documents.length
                  }
              ]}
            />
            ) : null}
            
            <MiniCalendar minW="100%" selectRange={false} />
            <HistoryCourse />
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
}

export default Coures;
