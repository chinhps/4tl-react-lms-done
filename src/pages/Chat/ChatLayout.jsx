import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
  GridItem,
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

const ChatLayout = (props) => {
  const bg = useColorModeValue('white', 'navy.700');
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

  const { user } = useSelector((state) => state.user);
  const { slug } = useParams();
  const [messages, setMessage] = useState([]);
  console.log('messages', messages);

 
  useEffect(() => {
    setMessage(props.messages);

    window.Pusher = Pusher;
    window.Pusher.logToConsole = true;

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

    window.Echo.private(`room.${slug}`)
      .listen('.private-room', (e) => {
        setMessage((old) => [...old, e]);
        console.log(e);
      })
      .error((err) => {
        console.log(err);
      });
    return () => {
      window.Echo.leave(`room.${slug}`);
    };
  }, [slug]);

  const {
    handleSubmit,
    register,

    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const fetchChat = await chatAPI.sendMessage(slug, data.message);
    console.log(fetchChat);
  };

  return (
    <Card gap={1} display={'grid'} bg={bg} boxShadow="base" h="100%">
      <Flex bg={!bg} w={'100%'} p={2}>
        <Avatar size={'md'} name={props.groupInfo.name} src="" />
        <Box ml="2">
          <Text fontWeight="bold">{props.groupInfo.name}</Text>
          <Text fontSize="sm">{props.groupInfo.members} thành viên</Text>
        </Box>
      </Flex>
      <Grid gap={2}>
        <GridItem w="100%" color={textColorPrimary} h="95%" overflowY={'scroll'}>
          <Flex flexDirection={'column'}>
            {messages?.map((item, index) => {
              return (
                <div key={index}>
                  {user.id === item.user_id ? (
                    <MeChat mess={item?.message} />
                  ) : (
                    <TheyChat mess={item?.message} name={item?.name} thumb={item?.avatar} />
                  )}
                </div>
              );
            })}
          </Flex>
        </GridItem>
        <GridItem h={'55px'} rounded="md" boxShadow="base" bg={bg}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <InputGroup size="lg">
                <Input
                  color={textColorPrimary}
                  name="message"
                  focusBorderColor="none"
                  h={'55px'}
                  id="message"
                  placeholder="Aa"
                  {...register('message', {})}
                />
                <InputRightAddon
                  h={'55px'}
                  children={
                    <Button type="submit" bg={'none'} _hover={{ bg: 'none' }}>
                      <AiOutlineSend />
                    </Button>
                  }
                  color={'#0084ff'}
                  cursor={'pointer'}
                />
              </InputGroup>
            </FormControl>
          </form>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default ChatLayout;
