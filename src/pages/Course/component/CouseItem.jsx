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
import { MdAccessTime, MdCallMissed, MdKeyboardReturn, MdSecurity } from 'react-icons/md';
import Card from '../../../Components/Core/Card/Card';
import moment from 'moment';
import 'moment/locale/vi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { fetchQuiz } from '../../../reducer/quizSlice';
import { useEffect } from 'react';
import { fetchLab } from '../../../reducer/labSlice';
import fileAPI from '../../../api/fileAPI';
import fileDownload from 'js-file-download';
import { FiSettings } from 'react-icons/fi';

function CouseItem(
  { name, description, type, history, deadline, slug, password, config, level, max_working, linkDoc },
  rest,
) {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const bg = useColorModeValue('white', 'navy.700');
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSelector((state) => state.user);

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

  // type: 1 = Lab, 0 = Quiz
  // lấy data đúng theo tùy chọn
  const fetchData = type === 1 ? fetchLab : fetchQuiz;
  const quizz = useSelector((state) => state.quiz);
  const labb = useSelector((state) => state.lab);

  const handleChoose = async () => {
    if (password) {
      onOpen();
    } else {
      if (type === 2) {
        window.open(linkDoc, '_blank');
      } else {
        dispatch(
          fetchData({
            slugCourse: slugCourse,
            slug,
            password: null,
          }),
        ).then((data) => {
          if (data.payload) {
            type === 1 ? navigate('./lab/' + slug) : navigate('./quiz/' + slug);
          }
        });
      }
    }
  };

  const { slugCourse } = useParams();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(
      fetchData({
        slugCourse: slugCourse,
        slug,
        password: data.password,
      }),
    ).then((data) => {
      if (data.payload) {
        type === 1 ? navigate('./lab/' + slug) : navigate('./quiz/' + slug);
      }
    });
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
                  {password ? <MdSecurity /> : null} {name}
                </Text>
                <Text fontWeight="500" color={textColorSecondary} fontSize="sm" me="4px">
                  {description} {level ? `Level: ${level}` : null}
                </Text>
                {user?.role.role_code === 'LECTURER' ? (
                  <Flex alignItems="center" gap={2} mt={2}>
                    <FiSettings />
                    <Text fontWeight="500" color={textColorSecondary} fontSize="sm" me="4px">
                      Chọn để cấu hình bài
                    </Text>
                  </Flex>
                ) : null}
              </Box>
            </Flex>
          </GridItem>
          <GridItem>
            {user?.role.role_code === 'LECTURER' ? (
              <>
                <Box>
                  <Text color={textColorPrimary}>Thông tin:</Text>
                  <Text fontWeight="500" color={textColorSecondary} fontSize="sm" me="4px">
                    Có <Text color="#34cf28" as="b">10</Text> câu hỏi
                  </Text>
                  <Text fontWeight="500" color={textColorSecondary} fontSize="sm" me="4px">
                    Có <Text color="#34cf28" as="b">8/10</Text> sinh viên đã làm bài
                  </Text>
                </Box>
              </>
            ) : typeof history !== 'undefined' ? (
              <Box>
                <Text color={textColorPrimary}>Đã nộp:</Text>
                <Text fontWeight="500" color={textColorSecondary} fontSize="sm" me="4px">
                  {Array.isArray(history) ? history.reduce((partialSum, a) => partialSum + a, 0) : history} bài đã nộp
                </Text>
                <Text fontWeight="500" color={textColorSecondary} fontSize="sm" me="4px">
                  Có {max_working ?? 0} lần làm bài
                </Text>
              </Box>
            ) : null}
          </GridItem>
          <GridItem>
            <Box>
              <Flex align="flex-end" direction="column">
                <Icon as={MdKeyboardReturn} color="secondaryGray.500" h="18px" w="18px" />
                <Flex alignItems="center" gap="10px">
                  {deadline && deadline.time_end !== null && deadline.time_start !== null ? (
                    <>
                      <MdAccessTime />
                      {moment(deadline.time_end).locale('vi').subtract(deadline.time_start).calendar()}
                    </>
                  ) : config ? (
                    <Stack spacing={3}>
                      <Text>
                        <MdCallMissed style={{ display: 'inline-block' }} /> Truy cập ngay
                      </Text>
                      <Text fontSize="xs" color={textColorSecondary}>
                        Không có hạn
                      </Text>
                    </Stack>
                  ) : (
                    <Stack spacing={3}>
                      <Text>
                        <MdCallMissed style={{ display: 'inline-block' }} /> Không thể truy cập
                      </Text>
                      <Text fontSize="xs" color={textColorSecondary}>
                        Chưa cấu hình
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
