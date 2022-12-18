import { Grid, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import chatAPI from '../../api/chatAPI';
import Card from '../../Components/Core/Card/Card';
import ChatLayout from './ChatLayout';
import ChatRoom from './ChatRoom';

const Chat = () => {
  const bg = useColorModeValue('white', 'navy.800');
  const [listMessages, setListMessages] = useState(null);
  const [loadingChat, setLoadingChat] = useState(false);
  const { slug } = useParams();
  const [loadingRoom, setLoadingRoom] = useState(false);
  const [myRoom, setMyroom] = useState([]);

  useEffect(() => {
    if (slug) {
      setLoadingChat(true);
      chatAPI.listMessageCourse(slug).then((messages) => {
        setListMessages(messages);
        setLoadingChat(false);
      });
    }
  }, [slug]);

  useEffect(() => {
    setLoadingRoom(true);
    chatAPI.myRoom().then((data) => {
      setMyroom(data);
      setLoadingRoom(false);
    });
  }, []);
  return (
    <>
      <Grid templateColumns={{ base: '1fr', xl: '30% 1fr' }} h="85vh" maxH="100%" gap={4}>
        <Card
          w="100%"
          display={{ base: 'none', xl: 'flex' }}
          bg={bg}
          padding={3}
          gap={5}
          boxShadow="base"
          overflowY="scroll"
          overflowX="hidden"
        >
          <ChatRoom loadingRoom={loadingRoom} myRoom={myRoom} />
        </Card>
        <Card isLoading={loadingChat} gap={1} display={'grid'} bg={bg} boxShadow="base" height="inherit">
          {listMessages ? (
            <>
              <ChatLayout
                listRoomLayout={ChatRoom}
                loadingRoom={loadingRoom} 
                myRoom={myRoom}
                groupInfo={{ name: listMessages.name_course, members: listMessages.members }}
                messages={listMessages.messages}
              />
            </>
          ) : !slug ? (
            <>
              <Text display={{ base: 'none', xl: 'block' }}>Chọn lớp học để xem!</Text>
              <Card
                w="100%"
                display={{ base: 'flex', xl: 'none' }}
                bg={bg}
                padding={3}
                gap={5}
                boxShadow="base"
                overflowY="scroll"
                overflowX="hidden"
              >
                <ChatRoom loadingRoom={loadingRoom} myRoom={myRoom} />
              </Card>
            </>
          ) : (
            <Spinner />
          )}
        </Card>
      </Grid>
    </>
  );
};

export default Chat;
