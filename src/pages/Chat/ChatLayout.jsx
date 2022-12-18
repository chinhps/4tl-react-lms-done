import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
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
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineSend } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import chatAPI from '../../api/chatAPI';
import Card from '../../Components/Core/Card/Card';
import MeChat from './MeChat';
import TheyChat from './TheyChat';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { FiImage, FiMenu, FiSend } from 'react-icons/fi';
import { useRef } from 'react';

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.REACT_APP_PUSHER_APP_KEY,
  cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
  encrypted: true,
  forceTLS: true,
  authorizer: (channel, options) => {
    return {
      authorize: (socketId, callback) => {
        axiosClient
          .post(process.env.REACT_APP_API + '/api/broadcasting/auth', {
            socket_id: socketId,
            channel_name: channel.name,
          })
          .then((response) => {
            callback(false, response);
          })
          .catch((error) => {
            callback(true, error);
          });
      },
    };
  },
});

const ChatLayout = (props) => {
  const bg = useColorModeValue('white', 'navy.700');
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const borderInput = useColorModeValue('1px', '0');
  const bgSend = useColorModeValue('brand.500', 'brand.400');

  const { user } = useSelector((state) => state.user);
  const { slug } = useParams();
  const [messages, setMessage] = useState([]);
  const [userHere, setUserHere] = useState([]);
  const [loadingSend, setLoadingSend] = useState(false);
  const [nameTyping, setNameTyping] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const boxChat = useRef();
  const ListRoomLayout = props.listRoomLayout;

  useEffect(() => {
    console.log('change channel', props.messages);
    setMessage(props.messages);
  }, []);

  useEffect(() => {
    const maxHeight = boxChat.current.scrollHeight;
    boxChat.current.scrollTop = maxHeight;
  }, [messages]);

  useEffect(() => {
    window.Echo.join(`room.${slug}`)
      .listen('.private-room', (e) => {
        setMessage((old) => [...old, e]);
      })
      .here((users) => {
        setUserHere(users);
      })
      .joining((current) => {
        setUserHere((currentUsers) => [...currentUsers, current]);
      })
      .leaving((userLeave) => {
        const newUserHere = userHere.splice(
          userHere.findIndex((user) => user.id === userLeave.id),
          1,
        );
        setUserHere(newUserHere);
      })
      .error((err) => {
        console.log(err);
      })
      .listenForWhisper('typing', (e) => {
        if (e.user_id !== user.id) {
          setNameTyping(e.name);
        }
        if (!window.timeTyping) {
          window.timeTyping = setTimeout(function () {
            setNameTyping(null);
            clearTimeout(window.timeTyping);
            window.timeTyping = undefined;
          }, 3000);
        }
      });
    return () => {
      window.Echo.leave(`room.${slug}`);
      clearTimeout(window.timeTyping);
    };
  }, [slug]);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoadingSend(true);
    console.log(data);
    let formData = new FormData();
    formData.append('slug', slug);
    formData.append('message', data.message);
    formData.append('image', data.image[0]);
    const fetchChat = await chatAPI.sendMessage(formData);
    reset();
    setLoadingSend(false);
  };

  const isTyping = () => {
    window.Echo.join(`room.${slug}`).whisper('typing', {
      name: user.name,
      user_id: user.id,
      typing: true,
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(10deg)" />
        <ModalContent>
          <ModalHeader>Danh sách các phòng</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ListRoomLayout loadingRoom={props.loadingRoom} myRoom={props.myRoom} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex bg={!bg} w={'100%'} justifyContent="space-between">
        <Flex gap={3}>
          <Avatar size={'md'} name={props.groupInfo.name} src="" />
          <Box ml="2">
            <Text fontWeight="bold">{props.groupInfo.name}</Text>
            <Text fontSize="sm">{props.groupInfo.members} thành viên</Text>
          </Box>
        </Flex>
        <IconButton display={{ base: 'flex', xl: 'none' }} onClick={onOpen} icon={<FiMenu />}></IconButton>
      </Flex>
      <Flex gap={2} flexDirection="column">
        <Flex ref={boxChat} flexDirection={'column'} height="60vh" overflowY="scroll">
          {messages?.map((item, index) => {
            return (
              <div key={index}>
                {user.id === item.user_id ? (
                  <>
                    <MeChat item={item} mess={item?.message} created_at={item?.created_at} />
                  </>
                ) : (
                  <>
                    <TheyChat
                      item={item}
                      active={userHere.filter((user) => user.id === item?.user_id)}
                      mess={item?.message}
                      name={item?.name}
                      thumb={item?.avatar}
                      created_at={item?.created_at}
                    />
                  </>
                )}
              </div>
            );
          })}
        </Flex>
        {nameTyping ? <Text mb={2}>{nameTyping} đang nhập tin...</Text> : null}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex gap={3} mt={3} alignItems="center">
            <Flex flexDirection="column" position="relative" width="100%">
              <FormControl isInvalid={errors.message}>
                <Input
                  py={8}
                  px={10}
                  bg={bg}
                  color={textColorPrimary}
                  rounded="full"
                  border={borderInput}
                  onKeyDown={isTyping}
                  placeholder={`Nhập để nhắn tin tới ${props.groupInfo.name}`}
                  {...register('message', { required: 'Bạn cần nhập tin nhắn để gửi' })}
                />
              </FormControl>
              <Flex position="absolute" right="5%" top={0} bottom={0} alignItems="center">
                <FormControl>
                  <FormLabel m={0}>
                    <FiImage cursor={'pointer'} />
                  </FormLabel>
                  <Input type="file" accept="image/*" {...register('image')} display="none" />
                </FormControl>
              </Flex>
            </Flex>
            <Button
              borderRadius="50%"
              isLoading={loadingSend}
              type="submit"
              bg={bgSend}
              height="70px"
              width="75px"
              _hover={{ bg: 'none' }}
              // px="30px"
              cursor={'pointer'}
            >
              <FiSend />
            </Button>
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export default ChatLayout;
