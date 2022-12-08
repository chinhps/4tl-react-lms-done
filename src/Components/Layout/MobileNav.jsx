import React, { useRef } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { logOut } from '../../utils/auth';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import userAPI from '../../api/userAPI';

function MobileNav({ onOpen, ...rest }) {
  const { user: userRd } = useSelector((state) => state.user);
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen: onOpenModel, onClose } = useDisclosure();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    userAPI.changePassword(data.password_old, data.password).then((data2) => {
      onClose();
      toast({
        title: 'Thông báo!',
        description: data2.msg,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }).catch((e) => {
      
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(10deg)" />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Đổi mật khẩu</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mb={5}>
                <FormLabel>Mật khẩu cũ</FormLabel>
                <Input
                  textColor={textColorPrimary}
                  {...register('password_old')}
                  type="password"
                  placeholder="Mật khẩu cũ"
                />
              </FormControl>
              <FormControl mb={5} isInvalid={errors.password}>
                <FormLabel>Mật khẩu mới</FormLabel>
                <Input
                  textColor={textColorPrimary}
                  {...register('password', {
                    required: 'Mật khẩu không được để trống',
                  })}
                  type="password"
                  placeholder="Mật khẩu cũ"
                />
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>
              <FormControl mb={5} isInvalid={errors.password_confirmation}>
                <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                <Input
                  textColor={textColorPrimary}
                  {...register('password_confirmation', {
                    required: 'Mật khẩu không được để trống',
                    validate: (val) => {
                      if (watch('password') != val) {
                        return 'Xác nhận mật khẩu không đúng!';
                      }
                    },
                  })}
                  type="password"
                  placeholder="Xác nhận mật khẩu mới"
                />
                <FormErrorMessage>
                  {errors.password_confirmation && errors.password_confirmation.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Xác nhận
              </Button>
              <Button onClick={onClose}>Đóng</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
        {...rest}
      >
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />

        <Text display={{ base: 'flex', md: 'none' }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          LMS 4TL
        </Text>

        <HStack spacing={{ base: '1', md: '6' }}>
          {/* <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} /> */}
          <Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>

          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    size={'sm'}
                    name={userRd.name}
                    src=""
                  />
                  <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                    <Text fontSize="sm">{userRd.name}</Text>
                    <Text fontSize="xs" color="gray.600">
                      {userRd.role.role_name}
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
              >
                <MenuItem onClick={() => onOpenModel()}>Đổi mật khẩu</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => logOut()}>Đăng xuất</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    </>
  );
}

export default MobileNav;
