import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const MeChat = ({ mess }) => {
  const textColorFour = useColorModeValue('#2D88FF', '#2D88FF');

  return (
    <Flex gap={3} p={3} alignItems={'center'} justifyContent="flex-end" maxW={'50%'} ml={'auto'}>
      <Flex flexDirection={'column'}>
        <Text borderRadius={7} bg={textColorFour} px={3} py={1}>
          {mess}
        </Text>
      </Flex>
    </Flex>
  );
};

export default MeChat;
