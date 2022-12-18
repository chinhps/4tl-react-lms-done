import { Avatar, AvatarBadge, Box, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';

const TheyChat = ({ item, thumb, mess, name, active, created_at }) => {
  const textColorTree = useColorModeValue('gray.200', '#3E4042');
  const textColorMessage = useColorModeValue('secondaryGray.900', 'white');
  const textColorChat = useColorModeValue('secondaryGray.300', 'navy.600');
  const textColorTime = 'secondaryGray.600';
  return (
    <Flex gap={3} p={3} alignItems={'center'} maxW={'90%'}>
      <Avatar src={thumb} name={name} size="sm" bg={thumb ? 'white' : null}>
        {active.length > 0 ? <AvatarBadge boxSize="0.8em" border="0.15em solid" bg="green.500" /> : null}
      </Avatar>
      <Box>
        <Text color={!textColorTree} fontSize={'sm'} fontWeight={300}>
          {name}
        </Text>
        <Flex
          paddingInline="24px"
          py="16px"
          flexDirection={'column'}
          borderTopRightRadius="2xl"
          borderBottomRightRadius="2xl"
          borderBottomLeftRadius="2xl"
          bg={textColorChat}
        >
          {item.message_type === 1 ? (
            <Text fontSize="md" color={textColorMessage} wordBreak={'break-all'}>
              {mess}
            </Text>
          ) : item.message_type === 2 ? (
            <>
              <Text fontSize="md" color={textColorMessage} wordBreak={'break-all'}>
                {mess.message}
              </Text>
              <Image src={process.env.REACT_APP_API + mess.link} />
            </>
          ) : null}
          <Text fontSize="xs" color={textColorTime} mt={1}>
            {moment(created_at).format('h:mm A')}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default TheyChat;
