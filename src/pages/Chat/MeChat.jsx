import { Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { FiCheck } from 'react-icons/fi';

const MeChat = ({ item, mess, created_at }) => {
  const textColorChat = useColorModeValue('brand.500', 'brand.400');
  const textColorTime = 'white';

  return (
    <Flex gap={2} py={1} px={5} alignItems={'center'} justifyContent="flex-end" maxW={'90%'} ml={'auto'}>
      <Flex
        flexDirection={'column'}
        borderTopLeftRadius="2xl"
        borderBottomRightRadius="2xl"
        borderBottomLeftRadius="2xl"
        bg={textColorChat}
        paddingInline="24px"
        py="16px"
      >
        {item.message_type === 1 ? (
          <Text textColor="white" fontSize="md" wordBreak={'break-all'}>
            {mess}
          </Text>
        ) : item.message_type === 2 ? (
          <>
            <Text textColor="white" fontSize="md" wordBreak={'break-all'}>
              {mess.message}
            </Text>
            <Image src={ process.env.REACT_APP_API + mess.link} />
          </>
        ) : null}
        <Flex alignItems="center" gap={2}>
          <FiCheck />
          <Text fontSize="xs" color={textColorTime} mt={1}>
            {moment(created_at).format('h:mm A')}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MeChat;
