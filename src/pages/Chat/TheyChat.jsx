import { Avatar, AvatarBadge, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const TheyChat = ({ thumb, mess, name }) => {
  const textColorTree = useColorModeValue('gray.200', '#3E4042');

  return (
    <Flex gap={3} p={3} alignItems={'center'} maxW={'50%'}>
      <Avatar src={thumb} size="sm">
        <AvatarBadge boxSize="0.8em" border="0.15em solid" bg="green.500" />
      </Avatar>
      <Flex flexDirection={'column'}>
        <Text color={'grey'} fontSize={'sm'} fontWeight={300}>
          {name}
        </Text>
        <Text borderRadius={7} bg={textColorTree} px={3} py={2} wordBreak={'break-all'}>
          {mess}
        </Text>
      </Flex>
    </Flex>
  );
};

export default TheyChat;
