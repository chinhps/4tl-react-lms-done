import { Avatar, AvatarBadge, AvatarGroup, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/vi';

const ChatInfo = ({ slug, lastMess, timeAgo, member, name }) => {
  const navigate = useNavigate();
  const bg = useColorModeValue('white', 'navy.700');
  const bgSecond = useColorModeValue('blue.100', '#495579');

  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const textColorTree = useColorModeValue('gray.200', '#3E4042');
  const textColorFour = useColorModeValue('#2D88FF', '#2D88FF');
  return (
    <Flex
      onClick={() => {
        navigate(`/chat/${slug}`);
      }}
      rounded="md"
      p={3}
      cursor={'pointer'}
      _hover={{ bg: bgSecond }}
      transition="all 0.2s ease-in-out"
      position={'relative'}
      justifyContent={['center', 'center', 'center', 'center', 'start']}
    >
      <Avatar size={'lg'} name={name} src="" />
      <Box ml="4" display={['none', 'none', 'none', 'none', 'flex']} justifyContent="center" flexDirection="column">
        <Text fontWeight="bold"> {name}</Text>
        <Flex flexDirection="column">
          {lastMess ? (
            <>
              <Text fontSize="sm" color={textColorSecondary} noOfLines={1}>
                Tin nhắn cũ: {lastMess}
              </Text>
              <Text fontSize="sm" color={textColorSecondary}>
                {moment(timeAgo).locale('vi').calendar()}
              </Text>
            </>
          ) : (
            <Text fontSize="sm" color={textColorSecondary} noOfLines={1} w={'80%'}>
              Chưa có tin nhắn
            </Text>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default ChatInfo;