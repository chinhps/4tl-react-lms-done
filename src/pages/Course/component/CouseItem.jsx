import { useState } from 'react';
// Chakra imports
import {
  AlertDialogCloseButton,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
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
import { fetchLab } from '../../../reducer/labSlice';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { FiCornerDownLeft, FiSettings } from 'react-icons/fi';
import quizAPI from '../../../api/quizAPI';
import labAPI from '../../../api/labAPI';
import documentAPI from '../../../api/documentAPI';
import ModelNewDocument from '../model/ModelNewDocument';
import ModelNewQuiz from '../model/ModelNewQuiz';
import ModelNewLab from '../model/ModelNewLab';
import ModelConfigDeadline from '../model/ModelConfigDeadline';
import deadlineConfigAPI from '../../../api/deadlineConfigAPI';
import ModelConfirm from '../../../Components/Core/ModelConfirm';
import { downloadRes } from '../../../utils/data';

function CouseItem(
  { name, description, type, history, deadline, slug, password, config, level, max_working, linkDoc, data },
  rest,
) {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const bg = useColorModeValue('white', 'navy.700');
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);

  const toast = useToast();
  const { isOpen: isOpenConfig, onOpen: onOpenConfig, onClose: onCloseConfig } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const cancelRef = useRef();
  const rdBg = [
    'https://i.imgur.com/iZSJCDq.png',
    'https://i.imgur.com/hF9bSEF.png',
    'https://i.imgur.com/TVo32ES.png',
  ];

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // type: 1 = Lab, 0 = Quiz
  // lấy data đúng theo tùy chọn
  const fetchData = type === 1 ? fetchLab : fetchQuiz;
  const deleteData = type === 0 ? quizAPI : type === 1 ? labAPI : documentAPI;
  const [dataEdit, setDataEdit] = useState(null);
  const [dataConfig, setDataConfig] = useState(null);
  const [customData, setCustomData] = useState(null);

  const handleChoose = async () => {
    setLoading(true);

    if (user?.role.role_code === 'LECTURER' && type !== 2) {
      const fetchDataDeadline = await deadlineConfigAPI.getOne(type === 1 ? 'lab' : 'quiz', slug);
      setDataConfig(fetchDataDeadline);
      setCustomData({
        slug,
        type: type === 1 ? 'lab' : 'quiz',
      });
      onOpenConfig();
      setLoading(false);
    } else {
      if (password) {
        onOpen();
      } else {
        // tài liệu
        if (type === 2) {
          const fetchDoc = await documentAPI.download(linkDoc);
          downloadRes(fetchDoc, name + '.' + linkDoc.split('.').pop());
          // window.open(linkDoc, '_blank');
          setLoading(false);
        } else {
          dispatch(
            fetchData({
              slugCourse: slugCourse,
              slug,
              password: null,
            }),
          ).then((data) => {
            if (data.payload) {
              const link = `./${type === 1 ? 'lab' : 'quiz'}/` + slug;
              if (user?.role.role_code === 'LECTURER') {
                link += '/settings';
              }
              navigate(link);
            }
            setLoading(false);
          });
        }
      }
    }
  };

  const handleDelete = async () => {
    setLoadingForm(true);
    try {
      const fetchDelete = await deleteData.delete(slug);
      toast({
        title: 'Thông báo!',
        description: fetchDelete.msg,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Thông báo!',
        description: err.response.data.msg,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setLoadingForm(false);
    onCloseDelete();
  };

  const handleEdit = async () => {
    setLoading(true);
    const getOne = type === 1 ? labAPI.getOne : type === 0 ? quizAPI.getOne : documentAPI.getOne;
    const fetchGetOne = await getOne(slug);
    setDataEdit(fetchGetOne);
    setLoading(false);
    onOpenEdit();
  };

  const { slugCourse } = useParams();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoadingForm(true);
    dispatch(
      fetchData({
        slugCourse: slugCourse,
        slug,
        password: data.password,
      }),
    ).then((data) => {
      setLoadingForm(false);
      if (data.payload) {
        type === 1 ? navigate('./lab/' + slug) : navigate('./quiz/' + slug);
      }
    });
  };

  const handleClose = () => {
    onClose();
    setLoading(false);
  };
  return (
    <>
      {isOpen ? (
        <Modal isOpen={isOpen} onClose={handleClose}>
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
                <Button colorScheme="blue" mr={3} isLoading={loadingForm} type="submit">
                  Truy cập
                </Button>
                <Button onClick={handleClose}>Đóng</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      ) : isOpenDelete ? (
        <ModelConfirm
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          handleConfirm={handleDelete}
          isLoading={loadingForm}
          description="Nếu bạn xóa thì không thể hoàn tác lại thao tác! Bạn vẫn chắc muốn xóa?"
        />
      ) : isOpenConfig ? (
        <ModelConfigDeadline
          title="Cấu hình bài"
          customData={customData}
          id={dataConfig?.id}
          default={dataConfig}
          slugCourse={slugCourse}
          isOpen={isOpenConfig}
          onClose={onCloseConfig}
        />
      ) : null}

      {isOpenEdit && type === 2 ? (
        <ModelNewDocument
          title="Sửa tài liệu"
          id={dataEdit.id}
          default={dataEdit}
          slugCourse={slugCourse}
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
        />
      ) : isOpenEdit && type === 0 ? (
        <ModelNewQuiz
          title="Sửa thông tin Quiz"
          id={dataEdit.id}
          default={dataEdit}
          slugCourse={slugCourse}
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
        />
      ) : isOpenEdit && type === 1 ? (
        <ModelNewLab
          title="Sửa thông tin Lab"
          id={dataEdit.id}
          default={dataEdit}
          slugCourse={slugCourse}
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
        />
      ) : null}

      <Card bg={bg} {...rest} p="20px">
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }} alignItems="center">
          <GridItem colSpan={2} cursor="pointer" onClick={() => handleChoose()}>
            <Flex direction="row" alignItems="center">
              <Image h="100px" w="100px" src={rdBg[type]} objectFit="cover" borderRadius="8px" me="20px" />
              <Box mt={{ base: '10px', md: '0' }}>
                <Flex alignItems="center" gap={3}>
                  {password ? <MdSecurity /> : null}
                  <Text color={textColorPrimary} fontWeight="500" fontSize="xl">
                    {name}
                  </Text>
                  {loading ? <Spinner /> : null}
                </Flex>
                <Text fontWeight="500" color={textColorSecondary} fontSize="sm" me="4px">
                  {description} {level ? `Level: ${level}` : null}
                </Text>
                {user?.role.role_code === 'LECTURER' ? (
                  <Flex alignItems="center" gap={2} mt={2}>
                    <FiSettings />
                    <Text fontWeight="500" color={textColorSecondary} fontSize="sm" me="4px">
                      Chọn để cấu hình
                    </Text>
                  </Flex>
                ) : null}
              </Box>
            </Flex>
          </GridItem>
          <GridItem>
            {user?.role.role_code === 'LECTURER' && type !== 2 ? (
              <>
                <Box>
                  <Text color={textColorPrimary}>Thông tin:</Text>
                  <Text fontWeight="500" color={textColorSecondary} fontSize="sm" me="4px">
                    Có
                    <Text color="#34cf28" as="b">
                      {' '}
                      {data?.max_working ?? 0}{' '}
                    </Text>
                    lần {type === 1 ? 'nộp' : 'làm'} bài
                  </Text>
                  <Text fontWeight="500" color={textColorSecondary} fontSize="sm" me="4px">
                    <Text color="#34cf28" as="b">
                      {data?.student_worked ?? 0}/{data?.count_student ?? 0}{' '}
                    </Text>
                    sinh viên đã làm bài
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
              <Flex align="flex-end" direction="column" gap={4}>
                {user?.role.role_code === 'LECTURER' ? (
                  <Menu>
                    <MenuButton as={IconButton} rounded="lg" icon={<FiSettings />} />
                    <MenuList>
                      <MenuItem onClick={handleEdit}>Chỉnh sửa</MenuItem>
                      <MenuItem onClick={onOpenDelete}>Xóa</MenuItem>
                    </MenuList>
                  </Menu>
                ) : (
                  <FiCornerDownLeft />
                )}
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
                  ) : type !== 2 ? (
                    <Stack spacing={3} textAlign="right">
                      <Text>
                        <MdCallMissed style={{ display: 'inline-block' }} /> Không thể truy cập
                      </Text>
                      <Text fontSize="xs" color={textColorSecondary}>
                        Chưa cấu hình
                      </Text>
                    </Stack>
                  ) : null}
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
