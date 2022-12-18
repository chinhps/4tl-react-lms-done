import { Spinner } from '@chakra-ui/react';
import ChatInfo from './ChatInfo';

function ChatRoom({loadingRoom,myRoom}) {

  return (
    <>
      {loadingRoom ? (
        <Spinner />
      ) : (
        myRoom.map((value, index) => (
          <ChatInfo
            slug={value.slug}
            key={index}
            lastMess={value?.last_message}
            timeAgo={value?.created_at}
            member={[{ name: 'Lâm' }]}
            name={value.name}
          />
        ))
      )}
    </>
  );
}

export default ChatRoom;
