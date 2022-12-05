import React from 'react';
// Chakra imports
import { Box, Flex, Grid, GridItem, Icon, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react';
// Assets
import { MdAccessTime, MdCallMissed, MdKeyboardReturn } from 'react-icons/md';
import Card from '../../../Components/Core/Card/Card';
import moment from 'moment';
import 'moment/locale/vi';
import { Link } from 'react-router-dom';

function CouseItem({ name, description, type, history, deadline, slug }, rest) {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const bg = useColorModeValue('white', 'navy.700');
  const rdBg = [
    'https://i.imgur.com/iZSJCDq.png',
    'https://i.imgur.com/hF9bSEF.png',
    'https://i.imgur.com/TVo32ES.png',
  ];

  return (
    <Card bg={bg} {...rest} p="20px">
      <Link to={"./quiz/" + slug}>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }} alignItems="center">
          <GridItem colSpan={2}>
            <Flex direction="row" alignItems="center">
              <Image h="100px" w="100px" src={rdBg[type]} objectFit="cover" borderRadius="8px" me="20px" />
              <Box mt={{ base: '10px', md: '0' }}>
                <Text color={textColorPrimary} fontWeight="500" fontSize="xl" mb="4px">
                  {name}
                </Text>
                <Text fontWeight="500" color={textColorSecondary} fontSize="sm" me="4px">
                  {description}
                </Text>
              </Box>
            </Flex>
          </GridItem>
          <GridItem>
            <Box>
              {history ? (
                <>
                  <Text color={textColorPrimary}>Đã nộp:</Text>
                  <Text fontWeight="500" color={textColorSecondary} fontSize="sm" me="4px">
                    {history.length} bài đã nộp
                  </Text>
                </>
              ) : null}
            </Box>
          </GridItem>
          <GridItem>
            <Box>
              <Flex align="flex-end" direction="column">
                <Icon as={MdKeyboardReturn} color="secondaryGray.500" h="18px" w="18px" />
                <Flex alignItems="center" gap="10px">
                  {deadline ? (
                    <>
                      <MdAccessTime />
                      {moment(deadline.time_end).locale('vi').subtract(deadline.time_start).calendar()}
                    </>
                  ) : (
                    <Stack spacing={3}>
                      <Text>
                        <MdCallMissed style={{ display: 'inline-block' }} /> Truy cập ngay
                      </Text>
                      <Text fontSize="xs" color={textColorSecondary}>
                        Không có hạn
                      </Text>
                    </Stack>
                  )}
                </Flex>
              </Flex>
            </Box>
          </GridItem>
        </Grid>
      </Link>
    </Card>
  );
}

export default CouseItem;
