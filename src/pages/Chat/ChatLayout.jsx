import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  useColorModeValue,
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
import { FiMenu } from 'react-icons/fi';
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

  const { user } = useSelector((state) => state.user);
  const { slug } = useParams();
  const [messages, setMessage] = useState([]);
  const [userHere, setUserHere] = useState([]);
  const [loadingSend, setLoadingSend] = useState(false);
  const [typing, setTyping] = useState(false);
  const boxChat = useRef();

  useEffect(() => {
    const maxHeight = boxChat.current.scrollHeight;
    boxChat.current.scrollTop = maxHeight;
  }, [messages]);

  useEffect(() => {
    console.log('change channel',props.messages);
    setMessage(props.messages);
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
        setTyping(true);
        window.timeTyping = setTimeout(function () {
          setTyping(false);
        }, 900);
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
    const fetchChat = await chatAPI.sendMessage(slug, data.message);
    reset();
    setLoadingSend(false);
  };

  const isTyping = () => {
    window.Echo.join(`room.${slug}`).whisper('typing', {
      typing: true,
    });
  };

  return (
    <Card gap={1} display={'grid'} bg={bg} boxShadow="base" height="inherit">
      <Flex bg={!bg} w={'100%'} justifyContent="space-between">
        <Flex gap={3}>
          <Avatar size={'md'} name={props.groupInfo.name} src="" />
          <Box ml="2">
            <Text fontWeight="bold">{props.groupInfo.name}</Text>
            <Text fontSize="sm">{props.groupInfo.members} thành viên</Text>
          </Box>
        </Flex>
        <IconButton display={{ base: 'flex', xl: 'none' }} icon={<FiMenu />}></IconButton>
      </Flex>
      <Flex gap={2} flexDirection="column">
        <Flex ref={boxChat} flexDirection={'column'} height="60vh" overflowY="scroll">
          {messages?.map((item, index) => {
            return (
              <div key={index}>
                {user.id === item.user_id ? (
                  <MeChat mess={item?.message} />
                ) : (
                  <TheyChat
                    active={userHere.filter((user) => user.id === item?.user_id)}
                    mess={item?.message}
                    name={item?.name}
                    thumb={item?.avatar}
                  />
                )}
              </div>
            );
          })}
        </Flex>
        {typing ? <Text mb={2}>Người nào đó đang nhập tin...</Text> : null}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl bg={bg} isInvalid={errors.message}>
            <InputGroup size="lg">
              <Flex flexDirection="column" width="100%">
                <Input
                  color={textColorPrimary}
                  focusBorderColor="none"
                  h={'55px'}
                  onKeyDown={isTyping}
                  placeholder="Aa"
                  {...register('message', { required: 'Bạn cần nhập tin nhắn để gửi' })}
                />
              </Flex>
              <InputRightAddon
                p={0}
                height="inherit"
                children={
                  <Button
                    isLoading={loadingSend}
                    type="submit"
                    bg={'none'}
                    _hover={{ bg: 'none' }}
                    px="30px"
                    height="100%"
                  >
                    <AiOutlineSend />
                  </Button>
                }
                color={'#0084ff'}
                cursor={'pointer'}
              />
            </InputGroup>
          </FormControl>
        </form>
      </Flex>
    </Card>
  );
};

export default ChatLayout;
