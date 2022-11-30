import { Avatar, AvatarBadge, AvatarGroup, Box, Center, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { AiFillCheckCircle } from 'react-icons/ai';

import React from 'react';

const Chat = () => {
  return (
    <>
      <Grid templateColumns="30% 1fr" gap={4}>
        <GridItem w="100%" h="100vh" bg="white" rounded="md" padding={3} gap={5} boxShadow="base">
          <Flex
            rounded="md"
            p={2}
            _hover={{ bg: '#e0e3ea' }}
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
        <GridItem gap={1} display={'grid'}>
          <Flex boxShadow="base" bg="white" rounded="md" w={'100%'} p={2}>
            <Avatar src="https://bit.ly/sage-adebayo " size="md">
              <AvatarBadge boxSize="0.8em" border="0.15em solid" bg="green.500" />
            </Avatar>

            <Box ml="2">
              <Text fontWeight="bold"> Chấm Ly</Text>
              <Text fontSize="sm">Đang hoạt động</Text>
            </Box>
          </Flex>
          <Grid gap={2}>
            <GridItem w="100%" h="89vh" rounded="md" boxShadow="base" overflowY={'auto'}>
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
                    <Text borderRadius={27} bg={'gray.200'} px={3} py={1} wordBreak={'break-all'}>
                      loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312
                    </Text>
                  </Flex>
                </Flex>
                {/* Me Chat */}
                <Flex gap={3} p={3} alignItems={'center'} justifyContent="flex-end" maxW={'50%'} ml={'auto'}>
                  <Flex flexDirection={'column'}>
                    <Text borderRadius={27} bg={'gray.200'} px={3} py={1}>
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312
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
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312
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
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312
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
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312
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
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312 321312
                      321312 321312 321312 321312 321312 321312
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </GridItem>
            <GridItem h={'5vh'} bg="white" rounded="md" boxShadow="base">
              123123
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </>
  );
};

export default Chat;
