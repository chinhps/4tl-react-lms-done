import {
  Avatar,
  AvatarBadge,
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
import React from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineSend } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../Components/Core/Card/Card';
import MeChat from './MeChat';
import TheyChat from './TheyChat';

const ChatLayout = (props) => {
  const bg = useColorModeValue('white', 'navy.700');
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

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
    <Card gap={1} display={'grid'} bg={bg} boxShadow="base">
      <Flex bg={!bg} w={'100%'} p={2}>
        <Avatar
          src={
            // props.groupInfo.avatar ||
            'https://i.discogs.com/dSU2G1tvSJQdN95edaLNV5HNMqLMEJWPthLQXOchHY0/rs:fit/g:sm/q:90/h:490/w:408/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTE4NzE1/MC0xMjMwNjcyNTEx/LmpwZWc.jpeg'
          }
          size="md"
        >
          <AvatarBadge boxSize="0.8em" border="0.15em solid" bg="green.500" />
        </Avatar>

        <Box ml="2">
          <Text fontWeight="bold">{props.groupInfo.name}</Text>
          <Text fontSize="sm">Đang hoạt động</Text>
        </Box>
      </Flex>
      <Grid gap={2}>
        <GridItem w="100%" h="600px" color={textColorPrimary} overflowY={'auto'}>
          <Flex flexDirection={'column'}>
            {props.messages.map((item, index) => {
              console.log(index);
              return (
                <div key={index}>
                  {item.type === 'me' ? (
                    <MeChat mess={item?.mess} />
                  ) : (
                    <TheyChat mess={item?.mess} name={item?.name} thumb={item?.avatar} />
                  )}
                </div>
              );
            })}
          </Flex>
        </GridItem>
        <GridItem h={'55px'} rounded="md" boxShadow="base" bg={bg}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <InputGroup size="lg">
                <Input
                  color={textColorPrimary}
                  name="message"
                  focusBorderColor="none"
                  h={'55px'}
                  id="message"
                  placeholder="Aa"
                  {...register('message', {})}
                />
                <InputRightAddon
                  h={'55px'}
                  children={
                    <Button type="submit" bg={'none'} _hover={{ bg: 'none' }}>
                      <AiOutlineSend />
                    </Button>
                  }
                  color={'#0084ff'}
                  cursor={'pointer'}
                />
              </InputGroup>
            </FormControl>
          </form>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default ChatLayout;
