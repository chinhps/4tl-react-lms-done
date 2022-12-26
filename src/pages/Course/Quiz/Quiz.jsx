import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Text,
  useCheckboxGroup,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Card from '../../../Components/Core/Card/Card';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import QuestionChoose from '../../../Components/Core/QuestionChoose';
import { useNavigate, useParams } from 'react-router-dom';
import quizAPI from '../../../api/quizAPI';
import { useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import { useSelector } from 'react-redux';

function Quiz() {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const [tabIndex, setTabIndex] = useState(0);
  const { quiz: questions } = useSelector((state) => state.quiz);
  const [listAnswers, setListAnswers] = useState([]);
  const [timer, setTimer] = useState();
  const { slugCourse, slugQuiz } = useParams();

  const { value, getCheckboxProps, setValue, onChange } = useCheckboxGroup();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (questions === undefined || questions?.slug !== slugQuiz) {
      navigate(`/course/${slugCourse}`);
      toast({
        title: 'Thông báo!',
        description: 'Không thể truy cập trực tiếp',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, []);

  useEffect(() => {
    setTimer(questions?.time_working);
    const interval = setInterval(() => {
      setTimer((prve_timer) => {
        if (prve_timer <= 1) {
          clearInterval(interval);
        }
        return prve_timer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof listAnswers[tabIndex] === 'undefined') {
      setValue([]);
    } else {
      setValue(listAnswers[tabIndex]);
    }
  }, [tabIndex]);

  useEffect(() => {
    let foo = Object.assign([], [...listAnswers], { [tabIndex]: value });
    setListAnswers(foo);
  }, [onChange]);

  const handleChoose = (id) => {
    setTabIndex(id);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [msg, setMsg] = useState('');

  const handleSubmitQuiz = () => {
    quizAPI
      .submitQuiz(questions.id_point, listAnswers)
      .then((data) => {
        // bật thông báo
        setMsg(`${data.msg}, Số điểm của bạn là ${data.point}`);
        onOpen();
      })
      .catch((e) => {
        navigate(`/course/${slugCourse}`);
      });
  };

  useEffect(() => {
    if (timer <= 0) {
      handleSubmitQuiz();
    }
  }, [timer]);

  const handleClose = () => {
    onClose();
    toast({
      title: 'Thông báo!',
      description: 'Nộp bài thành công!',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    navigate(`/course/${slugCourse}`);
  };
  const handleNextPrev = (type) => {
    if (type === 'next') {
      if (questions?.questions.length - 1 > tabIndex) {
        setTabIndex(tabIndex + 1);
      }
    } else {
      if (tabIndex >= 1) {
        setTabIndex(tabIndex - 1);
      }
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thông báo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{msg}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Grid
        gridTemplateColumns={{ base: 'repeat(3, 1fr)', sm: '1fr 0.46fr' }}
        gap={{ base: '20px', xl: '20px' }}
        display={{ base: 'flex', xl: 'grid' }}
        flexDirection="column"
      >
        <GridItem>
          <Card mb={{ base: '0px', '2xl': '20px' }}>
            <Text color={textColorPrimary} fontWeight="bold" fontSize="2xl" mt="10px" mb="4px">
              {questions?.name ?? 'Đang tải...'}
            </Text>
            <Flex justifyContent="space-between" my={5} mx={3}>
              <Button borderRadius={'md'} onClick={() => handleNextPrev('prev')} colorScheme="blue" gap={2}>
                <FiChevronLeft strokeWidth="4px" /> Lùi
              </Button>
              <Box
                border="1px"
                borderColor="gray.200"
                p="3"
                rounded="md"
                display="flex"
                gap={2}
                color={textColorPrimary}
              >
                Câu hỏi
                <Text color="red.500">{tabIndex + 1}</Text>
                trên
                <Text color="red.500">{questions?.questions?.length}</Text>
              </Box>
              <Button borderRadius={'md'} onClick={() => handleNextPrev('next')} colorScheme="blue" gap={2}>
                Tiếp <FiChevronRight strokeWidth="4px" />
              </Button>
            </Flex>
            <Tabs isLazy index={tabIndex} variant="unstyled">
              <TabPanels>
                {questions?.questions
                  ? questions?.questions?.map((question, index) => (
                      <TabPanel key={question.id}>
                        <Stack divider={<StackDivider />} spacing="4">
                          <Box>
                            <Text fontSize="md" fontWeight="bold" display="inline">
                              Câu {index + 1}:{' '}
                            </Text>
                            <Text display="inline">{question.question}</Text>
                          </Box>
                          <Box>
                            <VStack>
                              {question?.answers?.map((value) => {
                                return (
                                  <QuestionChoose key={value.id} {...getCheckboxProps({ value: value.id })}>
                                    {value.answer}
                                  </QuestionChoose>
                                );
                              })}
                            </VStack>
                          </Box>
                        </Stack>
                      </TabPanel>
                    ))
                  : null}
              </TabPanels>
            </Tabs>
          </Card>
        </GridItem>
        <GridItem>
          <Card mb={{ base: '20px', '2xl': '20px' }} alignItems="center">
            <Text color={textColorPrimary} fontWeight="bold" fontSize="larger" mb="10px" textAlign="center">
              Thời gian làm bài
            </Text>
            <Box position="relative">
              <Box className="timer" style={{ '--time': timer }} h={200} w={200}>
                <Box className="mask"></Box>
              </Box>
              <Flex
                justifyContent="center"
                position="absolute"
                top={0}
                right={0}
                left={0}
                alignItems="center"
                height="100%"
              >
                <Text color={textColorPrimary} fontWeight="bold" fontSize="4xl">
                  {moment.utc(timer * 60000).format('HH:mm')}
                </Text>
              </Flex>
            </Box>
          </Card>
          <Card mb={{ base: '20px', '2xl': '20px' }}>
            <Button borderRadius={'md'} h="16" w="100%" colorScheme="red" onClick={() => handleSubmitQuiz()}>
              NỘP BÀI
            </Button>
          </Card>
          <Card mb={{ base: '20px', '2xl': '20px' }}>
            <Text color={textColorPrimary} fontWeight="bold" fontSize="lg" mb="10px" textAlign="center">
              Bạn có thể xem câu trả lời đã làm
            </Text>
            <Flex gap={2} flexWrap="wrap" justifyContent="center">
              {questions?.questions
                ? questions?.questions.map((qs, index) => (
                    <Button
                      key={index}
                      borderRadius={'md'}
                      onClick={() => handleChoose(index)}
                      colorScheme={
                        typeof listAnswers[index] === 'undefined'
                          ? 'teal'
                          : listAnswers[index].length === 0
                          ? 'teal'
                          : 'red'
                      }
                      variant="solid"
                    >
                      Câu {index + 1}
                    </Button>
                  ))
                : null}
            </Flex>
          </Card>
        </GridItem>
      </Grid>
    </>
  );
}

export default Quiz;
