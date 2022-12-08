import { Avatar, AvatarBadge, AvatarGroup, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatInfo = ({ lastMess, timeAgo, avatar, member, name }) => {
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
        navigate(`/chat/${3}`);
      }}
      rounded="md"
      p={2}
      cursor={'pointer'}
      _hover={{ bg: bgSecond }}
      transition="all 0.3s ease-in-out"
      position={'relative'}
      justifyContent={['center', 'center', 'center', 'center', 'start']}
    >
      <Avatar src={avatar} size="lg">
        <AvatarBadge boxSize="0.8em" border="0.15em solid" bg="green.500" />
      </Avatar>
      <Box ml="4" display={['none', 'none', 'none', 'none', 'block']}>
        <Text fontWeight="bold"> {name}</Text>
        <Flex>
          <Text fontSize="sm" color={textColorSecondary} noOfLines={1} w={'80%'}>
            Bạn: {lastMess}
          </Text>
          <Text fontSize="sm" color={textColorSecondary} w={['0px', '0px', '0px', '0px', '100px']}>
            {timeAgo}
          </Text>
        </Flex>
        <AvatarGroup size="xs" max={3} position="absolute" right={2} w={{ 375: 0 }}>
          {member ? member.map((item, index) => <Avatar key={index} name={item.name} src={item.avatar} />) : <></>}
        </AvatarGroup>

        {/* <AvatarGroup size="xs" max={3} position="absolute" right={2} w={{ 375: 0 }}>
      <AiFillCheckCircle style={{ width: '1.3em', color: 'grey' }} />
    </AvatarGroup> */}
      </Box>
    </Flex>
  );
};

export default ChatInfo;
