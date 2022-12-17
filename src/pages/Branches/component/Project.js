// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
// Custom components
import React from 'react';
// Assets
import { MdKeyboardReturn } from 'react-icons/md';
import Card from '../../../Components/Core/Card/Card';
import { Link as ReachLink, useNavigate } from 'react-router-dom';
import coursesAPI from '../../../api/coursesAPI';
import { setTitle } from '../../../reducer/branchSlide';
import { useDispatch, useSelector } from 'react-redux';
import { FiMoreHorizontal } from 'react-icons/fi';
import { userSelector } from '../../../selectors';
import ModelNewBranch from '../../Course/model/ModelNewBranch';

export default function Project({ data, image, link, title }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
  const bg = useColorModeValue('white', 'navy.700');
  const toast = useToast();
  const user = useSelector(userSelector);
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();

  const handelJoinCourse = async (id) => {
    const data = await coursesAPI.joinCourse(id);
    onClose();
    if (data.status == 200) {
      toast({
        title: `Thông báo!`,
        description: 'Tham gia khóa học thành công.',
        position: 'bottom-right',
        status: 'success',
        isClosable: true,
      });
    }
    navigate('/course/' + data.slug);
  };

  const dispatch = useDispatch();

  const handelClickProject = (data) => {
    dispatch(setTitle(data.name));
    // onOpen
    if (data.class_code) {
      onOpen();
    } else {
      navigate(
        `/branches/${link}${
          data.branchable_type ? `/${data.branchable_type == 'courses' ? 'subjects' : data.branchable_type}` : ''
        }`,
      );
    }
  };

  return (
    <>
      <Modal closeOnOverlayClick size="xl" onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thông báo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Bạn có chắc muốn tham gia khóa học?</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mx={2} onClick={() => handelJoinCourse(data.id)}>
              Đồng ý
            </Button>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Hủy
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Card bg={bg} boxShadow={cardShadow} p="14px">
        <Flex align="center" direction={{ base: 'column', md: 'row' }}>
          <Image h="80px" w="80px" src={image ?? 'https://i.imgur.com/v4YUHjU.png'} borderRadius="8px" me="20px" />
          <Box mt={{ base: '10px', md: '0' }}>
            <Link onClick={() => handelClickProject(data)}>
              <Text color={textColorPrimary} fontWeight="500" fontSize="md" mb="4px">
                {data.class_code ?? null} {title}
              </Text>
              <Text fontWeight="500" color={textColorSecondary} fontSize="sm" me="4px">
                {data.branchable_type == 'majors' && data.level != 1
                  ? 'Ngành học'
                  : data.class_code
                  ? 'Môn học'
                  : 'Thư mục'}
              </Text>
            </Link>
          </Box>
          <Link onClick={() => handelClickProject(data)} variant="no-hover" me="16px" ms="auto" p="0px !important">
            <Icon as={MdKeyboardReturn} color="secondaryGray.500" h="18px" w="18px" />
          </Link>
          {user.role.role_code === 'ADMIN' ? (
            <Menu>
              <MenuButton as={IconButton} aria-label="Options" icon={<FiMoreHorizontal />} variant="outline" />
              <MenuList>
                <MenuItem onClick={onOpenModal}>Chỉnh sửa</MenuItem>
              </MenuList>
            </Menu>
          ) : null}
          {isOpenModal ? (
            <ModelNewBranch
              title="Sửa nhánh"
              id={data.id}
              default={data}
              isOpen={isOpenModal}
              onClose={onCloseModal}
            />
          ) : null}
        </Flex>
      </Card>
    </>
  );
}
