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
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// import { AiFillCheckCircle } from 'react-icons/ai';

import React from 'react';

import { useForm } from 'react-hook-form';
import { AiOutlineSend } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';

const Chat = () => {
  const bg = useColorModeValue('white', 'navy.700');
  const bgSecond = useColorModeValue('blue.100', 'white.200');

  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const textColorTree = useColorModeValue('gray.200', '#3E4042');
  const textColorFour = useColorModeValue('#2D88FF', '#2D88FF');

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
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
    <>
      <Grid templateColumns="30% 1fr" gap={4}>
        <GridItem w="100%" h="800px" bg={bg} borderRadius="md" padding={3} gap={5} boxShadow="base">
          <Flex
            onClick={() => {
              navigate(`/chat/${3}`);
            }}
            borderRadius="md"
            p={2}
            _hover={{ bg: bgSecond }}
            transition="all 0.3s ease-in-out"
            position={'relative'}
            justifyContent={['center', 'center', 'center', 'center', 'start']}
          >
            <Avatar src="https://bit.ly/sage-adebayo " size="lg">
              <AvatarBadge boxSize="0.8em" border="0.15em solid" bg="green.500" />
            </Avatar>
            <Box ml="4" display={['none', 'none', 'none', 'none', 'block']}>
              <Text fontWeight="bold"> Chấm Ly</Text>
              <Flex>
                <Text fontSize="sm" color={textColorSecondary} noOfLines={1} w={'40%'}>
                  Bạn: ê mai cà phê sdghạhdcdsb
                </Text>
                <Text fontSize="sm" color={textColorSecondary} noOfLines={1} w={150}>
                  36 phút
                </Text>
              </Flex>
              <AvatarGroup size="xs" max={3} position="absolute" right={2} w={{ 375: 0 }}>
                <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
                <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
                <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
                <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
                <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
              </AvatarGroup>

              {/* <AvatarGroup size="xs" max={3} position="absolute" right={2} w={{ 375: 0 }}>
                <AiFillCheckCircle style={{ width: '1.3em', color: 'grey' }} />
              </AvatarGroup> */}
            </Box>
          </Flex>
          <Flex
            onClick={() => {
              navigate(`/chat/${4}`);
            }}
            borderRadius="md"
            p={2}
            _hover={{ bg: bgSecond }}
            transition="all 0.3s ease-in-out"
            position={'relative'}
            justifyContent={['center', 'center', 'center', 'center', 'start']}
          >
            <Avatar src="https://bit.ly/sage-adebayo " size="lg">
              <AvatarBadge boxSize="0.8em" border="0.15em solid" bg="green.500" />
            </Avatar>
            <Box ml="4" display={['none', 'none', 'none', 'none', 'block']}>
              <Text fontWeight="bold"> Chấm Ly</Text>
              <Flex>
                <Text fontSize="sm" color={'grey'} noOfLines={1} w={'40%'}>
                  Bạn: ê mai cà phê sdghạhdcdsb
                </Text>
                <Text fontSize="sm" color={'grey'} noOfLines={1} w={150}>
                  36 phút
                </Text>
              </Flex>
              <AvatarGroup size="xs" max={3} position="absolute" right={2} w={{ 375: 0 }}>
                <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
                <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
                <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
                <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
                <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
              </AvatarGroup>

              {/* <AvatarGroup size="xs" max={3} position="absolute" right={2} w={{ 375: 0 }}>
                <AiFillCheckCircle style={{ width: '1.3em', color: 'grey' }} />
              </AvatarGroup> */}
            </Box>
          </Flex>
        </GridItem>
        <GridItem gap={1} display={'grid'} bg={bg}>
          <Flex boxShadow="base" bg={!bg} borderRadius="md" w={'100%'} p={2}>
            <Avatar src="https://bit.ly/sage-adebayo " size="md">
              <AvatarBadge boxSize="0.8em" border="0.15em solid" bg="green.500" />
            </Avatar>

            <Box ml="2">
              <Text fontWeight="bold"> Chấm Ly</Text>
              <Text fontSize="sm">Đang hoạt động</Text>
            </Box>
          </Flex>
          <Grid gap={2}>
            <GridItem w="100%" h="670px" color={textColorPrimary} borderRadius="md" boxShadow="base" overflowY={'auto'}>
              <Flex flexDirection={'column'}>
                {/* They Chat */}
                <Flex gap={3} p={3} alignItems={'center'} maxW={'50%'}>
                  <Avatar src="https://bit.ly/sage-adebayo " size="sm">
                    <AvatarBadge boxSize="0.8em" border="0.15em solid" bg="green.500" />
                  </Avatar>
                  <Flex flexDirection={'column'}>
                    <Text color={'grey'} fontSize={'sm'} fontWeight={300}>
                      Lâm
                    </Text>
                    <Text borderRadius={27} bg={textColorTree} px={3} py={1} wordBreak={'break-all'}>
                      loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                    </Text>
                  </Flex>
                </Flex>
                {/* Me Chat */}
                <Flex gap={3} p={3} alignItems={'center'} justifyContent="flex-end" maxW={'50%'} ml={'auto'}>
                  <Flex flexDirection={'column'}>
                    <Text borderRadius={27} bg={textColorFour} px={3} py={1}>
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                    </Text>
                  </Flex>
                </Flex>
                <Flex justifyContent={'center'}>
                  <Text color={'gray.500'} fontSize={'sm'} fontWeight={400}>
                    12:00
                  </Text>
                </Flex>
                {/* They Chat */}
                <Flex gap={3} p={3} alignItems={'center'}>
                  <Avatar src="https://bit.ly/sage-adebayo " size="sm">
                    <AvatarBadge boxSize="0.8em" border="0.15em solid" bg="green.500" />
                  </Avatar>
                  <Flex flexDirection={'column'}>
                    <Text color={'grey'} fontSize={'sm'} fontWeight={300}>
                      Lâm
                    </Text>
                    <Text borderRadius={27} bg={'gray.200'} px={3} py={1}>
                      321312
                    </Text>
                  </Flex>
                </Flex>
                <Flex gap={3} p={3} alignItems={'center'} maxW={'50%'}>
                  <Avatar src="https://bit.ly/sage-adebayo " size="sm">
                    <AvatarBadge boxSize="0.8em" border="0.15em solid" bg="green.500" />
                  </Avatar>
                  <Flex flexDirection={'column'}>
                    <Text color={'grey'} fontSize={'sm'} fontWeight={300}>
                      Lâm
                    </Text>
                    <Text borderRadius={27} bg={'gray.200'} px={3} py={1} wordBreak={'break-all'}>
                      loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem
                    </Text>
                  </Flex>
                </Flex>{' '}
                <Flex gap={3} p={3} alignItems={'center'} maxW={'50%'}>
                  <Avatar src="https://bit.ly/sage-adebayo " size="sm">
                    <AvatarBadge boxSize="0.8em" border="0.15em solid" bg="green.500" />
                  </Avatar>
                  <Flex flexDirection={'column'}>
                    <Text color={'grey'} fontSize={'sm'} fontWeight={300}>
                      Lâm
                    </Text>
                    <Text borderRadius={27} bg={'gray.200'} px={3} py={1} wordBreak={'break-all'}>
                      loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem
                    </Text>
                  </Flex>
                </Flex>{' '}
                <Flex gap={3} p={3} alignItems={'center'} maxW={'50%'}>
                  <Avatar src="https://bit.ly/sage-adebayo " size="sm">
                    <AvatarBadge boxSize="0.8em" border="0.15em solid" bg="green.500" />
                  </Avatar>
                  <Flex flexDirection={'column'}>
                    <Text color={'grey'} fontSize={'sm'} fontWeight={300}>
                      Lâm
                    </Text>
                    <Text borderRadius={27} bg={'gray.200'} px={3} py={1} wordBreak={'break-all'}>
                      loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                    </Text>
                  </Flex>
                </Flex>{' '}
                <Flex gap={3} p={3} alignItems={'center'} maxW={'50%'}>
                  <Avatar src="https://bit.ly/sage-adebayo " size="sm">
                    <AvatarBadge boxSize="0.8em" border="0.15em solid" bg="green.500" />
                  </Avatar>
                  <Flex flexDirection={'column'}>
                    <Text color={'grey'} fontSize={'sm'} fontWeight={300}>
                      Lâm
                    </Text>
                    <Text borderRadius={27} bg={'gray.200'} px={3} py={1} wordBreak={'break-all'}>
                      loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </GridItem>
            <GridItem h={'55px'} borderRadius="md" boxShadow="base" bg={bg}>
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
        </GridItem>
      </Grid>
    </>
  );
};

export default Chat;
