import { Box, Flex } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Course() {
  return (
    <Flex gap={'10px'} minHeight={'700px'} className="course">
      <Tabs flex={3} bg={'#f9f9f9'} borderRadius={'3px'} p={'10px'}>
        <TabList>
          <Tab>Tài liệu</Tab>
          <Tab>Lab</Tab>
          <Tab>Assigment</Tab>
          <Tab>Quizz</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
          </TabPanel>
          <TabPanel>
            <Box w="100%" p={4} flex={1}>
              <Link to="/">Lab 1</Link>
            </Box>
            <Box w="100%" p={4} flex={1}>
              <Link to="/">Lab 2</Link>
            </Box>
            <Box w="100%" p={4} flex={1}>
              <Link to="/">Lab 3</Link>
            </Box>
            <Box w="100%" p={4} flex={1}>
              <Link to="/">Lab 4</Link>
            </Box>
            <Box w="100%" p={4} flex={1}>
              <Link to="/">Lab 5</Link>
            </Box>
            <Box w="100%" p={4} flex={1}>
              <Link to="/">Lab 6</Link>
            </Box>
            <Box w="100%" p={4} flex={1}>
              <Link to="/">Lab 7</Link>
            </Box>
            <Box w="100%" p={4} flex={1}>
              <Link to="/">Lab 8</Link>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box w="100%" p={4} flex={1}>
              <Link to="/">Assigment 1</Link>
            </Box>
            <Box w="100%" p={4} flex={1}>
              <Link to="/">Assigment 2</Link>
            </Box>
            <Box w="100%" p={4} flex={1}>
              <Link to="/">Assigment 3</Link>
            </Box>
          </TabPanel>
          <TabPanel display={'flex'} flexDirection={'column'} gap={'10px'}>
            <Box w="100%" p={4} flex={1}>
              <Link to="/">Quiz 1</Link>
            </Box>
            <Box w="100%" p={4}>
              <Link to="/">Quiz 2</Link>
            </Box>
            <Box w="100%" p={4}>
              <Link to="/">Quiz 3</Link>
            </Box>
            <Box w="100%" p={4}>
              <Link to="/">Quiz 4</Link>
            </Box>
            <Box w="100%" p={4}>
              <Link to="/">Quiz 5</Link>
            </Box>
            <Box w="100%" p={4}>
              <Link to="/">Quiz 6</Link>
            </Box>
            <Box w="100%" p={4}>
              <Link to="/">Quiz 7</Link>
            </Box>
            <Box w="100%" p={4}>
              <Link to="/">Quiz 8</Link>
            </Box>
            <Box w="100%" p={4}>
              <Link to="/">Quiz 9</Link>
            </Box>
            <Box w="100%" p={4}>
              <Link to="/">Quiz 10</Link>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Box flex="1" bg="#e7e7e7" borderRadius={'3px'}></Box>
    </Flex>
  );
}

export default Course;
