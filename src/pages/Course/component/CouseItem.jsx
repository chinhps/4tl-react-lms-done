import React, { useState } from 'react';
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Icon,
  Image,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
// Assets
import { MdAccessTime, MdCallMissed, MdKeyboardReturn } from 'react-icons/md';
import Card from '../../../Components/Core/Card/Card';
import moment from 'moment';
import 'moment/locale/vi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { fetchQuiz } from '../../../reducer/quizSlice';
import { useEffect } from 'react';

function CouseItem({ name, description, type, history, deadline, slug, password }, rest) {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const bg = useColorModeValue('white', 'navy.700');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const rdBg = [
    'https://i.imgur.com/iZSJCDq.png',
    'https://i.imgur.com/hF9bSEF.png',
    'https://i.imgur.com/TVo32ES.png',
  ];

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const quizz = useSelector(state => state.quiz)


  const handleChoose = () => {
    onOpen();
  };

  const { slugCourse } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    dispatch(
      fetchQuiz({
        slugCourse: slugCourse,
        slug,
        password: data.password,
      }),
    ).then(data => {
      if(data.payload) {
        navigate('./quiz/'+slug);
      } 
    })
  };
  return (
    <>
      <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(10deg)" />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Bài cần mật khẩu để truy cập</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isInvalid={errors.password} isRequired>
                <FormLabel>Mật khẩu</FormLabel>
                <Input
                  textColor={textColorPrimary}
                  ref={initialRef}
                  type="password"
                  {...register('password', {
                    required: 'Mật khẩu không được để trống',
                  })}
                  placeholder="Mật khẩu"
                />
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} isLoading={quizz.pending} type="submit">
                Truy cập
              </Button>
              <Button onClick={onClose}>Đóng</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <Card bg={bg} {...rest} p="20px" onClick={() => handleChoose()}>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }} alignItems="center">
          <GridItem colSpan={2}>
            <Flex direction="row" alignItems="center">
              <Image h="100px" w="100px" src={rdBg[type]} objectFit="cover" borderRadius="8px" me="20px" />
              <Box mt={{ base: '10px', md: '0' }}>
                <Text color={textColorPrimary} fontWeight="500" fontSize="xl" mb="4px">
                  {name}
                </Text>
                <Text fontWeight="500" color={textColorSecondary} fontSize="sm" me="4px">
                  {description}
                </Text>
              </Box>
            </Flex>
          </GridItem>
          <GridItem>
            <Box>
              {history ? (
                <>
                  <Text color={textColorPrimary}>Đã nộp:</Text>
                  <Text fontWeight="500" color={textColorSecondary} fontSize="sm" me="4px">
                    {history.length} bài đã nộp
                  </Text>
                </>
              ) : null}
            </Box>
          </GridItem>
          <GridItem>
            <Box>
              <Flex align="flex-end" direction="column">
                <Icon as={MdKeyboardReturn} color="secondaryGray.500" h="18px" w="18px" />
                <Flex alignItems="center" gap="10px">
                  {deadline ? (
                    <>
                      <MdAccessTime />
                      {moment(deadline.time_end).locale('vi').subtract(deadline.time_start).calendar()}
                    </>
                  ) : (
                    <Stack spacing={3}>
                      <Text>
                        <MdCallMissed style={{ display: 'inline-block' }} /> Truy cập ngay
                      </Text>
                      <Text fontSize="xs" color={textColorSecondary}>
                        Không có hạn
                      </Text>
                    </Stack>
                  )}
                </Flex>
              </Flex>
            </Box>
          </GridItem>
        </Grid>
      </Card>
    </>
  );
}

export default CouseItem;
