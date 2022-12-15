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
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// import { AiFillCheckCircle } from 'react-icons/ai';

import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { AiOutlineSend } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import chatAPI from '../../api/chatAPI';
import Card from '../../Components/Core/Card/Card';
import ChatInfo from './ChatInfo';
import ChatLayout from './ChatLayout';
import MeChat from './MeChat';
import TheyChat from './TheyChat';

const Chat = () => {
  const bg = useColorModeValue('white', 'navy.700');
  const [myRoom, setMyroom] = useState([]);
  const [listMessages, setListMessages] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    chatAPI.myRoom().then((data) => {
      setMyroom(data);
    });
  }, []);

  useEffect(() => {
    if (slug) {
      chatAPI.listMessageCourse(slug).then((messages) => {
        setListMessages(messages);
      });
    }
  }, [slug]);
  console.log('listMessages', listMessages);
  return (
    <>
      <Grid templateColumns="30% 1fr" h="80vh" maxH="100%" gap={4}>
        <Card w="100%" bg={bg} padding={3} gap={5} boxShadow="base" overflowY="scroll">
          {myRoom.map((value, index) => (
            <ChatInfo
              slug={value.slug}
              key={index}
              lastMess={value.last_message[0]?.message}
              timeAgo={value.last_message[0]?.created_at}
              member={[{ name: 'Lâm' }]}
              name={value.name}
            />
          ))}
        </Card>
        {listMessages ? (
          <ChatLayout
            groupInfo={{ name: listMessages.name_course, members: listMessages.members }}
            messages={listMessages.messages}
          />
        ) : !slug ? (
          <Text>Chọn lớp học để xem!</Text>
        ) : (
          <Spinner />
        )}
      </Grid>
    </>
  );
};

export default Chat;
