import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import coursesAPI from '../../../api/coursesAPI';
import Card from '../Card/Card';
import HistoryItem from './HistoryItem';

function HistoryCourse({ limit = 3 }) {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const [myCourse, setMyCourse] = useState(null);
  const [myLastCourse, setMyLastCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
    fetchCourseLast();
  }, []);

  const fetchCourse = async () => {
    let data = await coursesAPI.getMyCourse(limit);
    setMyCourse(data);
  };
  const fetchCourseLast = async () => {
    let data = await coursesAPI.getMyCourse(9999);
    setMyLastCourse(data);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  return (
    <>
      <Card p="0px">
        <Flex align={{ sm: 'flex-start', lg: 'center' }} justify="space-between" w="100%" px="22px" py="18px">
          <Text color={textColor} fontSize="xl" fontWeight="600">
            Khóa học của tôi
          </Text>
          <Button variant="action" onClick={onOpen}>
            Xem tất cả
          </Button>
          <Modal onClose={onClose} finalFocusRef={btnRef} isOpen={isOpen} scrollBehavior={'inside'} size={'2xl'}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Khóa học của tôi</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
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
                  <></>
                )}
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Đóng</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
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
