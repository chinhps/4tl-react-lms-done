import { Box, Button, Flex, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axiosClient from '../../../api/axiosClient';
import coursesAPI from '../../../api/coursesAPI';
import Card from '../Card/Card';
import HistoryItem from './HistoryItem';

function HistoryCourse({ limit = 3 }) {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const [myCourse, setMyCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    let data = await coursesAPI.getMyCourse(limit);
    setMyCourse(data);
  };

  return (
    <>
      <Card p="0px">
        <Flex align={{ sm: 'flex-start', lg: 'center' }} justify="space-between" w="100%" px="22px" py="18px">
          <Text color={textColor} fontSize="xl" fontWeight="600">
            Khóa học của tôi
          </Text>
          <Button variant="action">Xem tất cả</Button>
        </Flex>
        {myCourse ? (
          myCourse.map((data, i) => (
            <HistoryItem
              key={i}
              name={data.name}
              author={data.class_code}
              link={data.slug}
              image={'https://i.imgur.com/v4YUHjU.png'}
            />
          ))
        ) : (
          <Flex justifyContent="center" alignItems="center">
            <Box p={5}>
                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
              </Box>
          </Flex>
        )}
      </Card>
    </>
  );
}

export default HistoryCourse;
