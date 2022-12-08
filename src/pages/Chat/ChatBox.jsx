import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
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
// import { AiFillCheckCircle } from 'react-icons/ai';

import React from 'react';

import { useForm } from 'react-hook-form';
import { AiOutlineSend } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../Components/Core/Card/Card';
import ChatInfo from './ChatInfo';
import ChatLayout from './ChatLayout';
import MeChat from './MeChat';
import TheyChat from './TheyChat';

const Chat = () => {
  const bg = useColorModeValue('white', 'navy.700');
  const bgSecond = useColorModeValue('blue.100', '#495579');

  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const textColorTree = useColorModeValue('gray.200', '#3E4042');
  const textColorFour = useColorModeValue('#2D88FF', '#2D88FF');

  const navigate = useNavigate();
  const { id } = useParams();
  const {
    handleSubmit,
    register,

    reset,
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      if (values === '') {
        console.log('rỗng');
      } else {
        console.log(values);
        reset({ message: '' });
      }
    });
  }

  return (
    <>
      <Grid templateColumns="30% 1fr" gap={4} overflow="hidden">
        <Card w="100%" h="800px" bg={bg} padding={3} gap={5} boxShadow="base">
          <ChatInfo
            lastMess={'dsagdsaguydsa'}
            timeAgo={'36 phút'}
            avatar={'a.png'}
            member={[{ name: 'Lâm' }]}
            name={'Chấm ly'}
          />
        </Card>
        <ChatLayout
          groupInfo={{ name: 'Hội ngu học', avatar: 'c.png' }}
          messages={[
            { mess: 'chó chính', sender: '2', time: '12:00', type: 'me', name: 'Lâm', avatar: 'a.png', id: '2' },
            {
              mess: 'chó tiến1 ',
              sender: '3',
              time: '12:01',
              type: 'other',
              name: 'Chính',
              avatar: 'b.png',
              status: 1,
              id: '3',
            },
            {
              mess: 'chó tiến2',
              sender: '3',
              time: '12:01',
              type: 'other',
              name: 'Chính',
              avatar: 'b.png',
              status: 1,
              id: '3',
            },
            {
              mess: 'chó tiến3',
              sender: '3',
              time: '12:01',
              type: 'other',
              name: 'Chính',
              avatar: 'b.png',
              status: 1,
              id: '3',
            },
            {
              mess: 'chó chính4554',
              sender: '2',
              time: '12:00',
              type: 'me',
              name: 'Chính',
              avatar: 'b.png',
              status: 1,
              id: '3',
            },
          ]}
        />
      </Grid>
    </>
  );
};

export default Chat;
