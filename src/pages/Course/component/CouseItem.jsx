import React from 'react';
// Chakra imports
import { Box, Flex, Icon, Image, Link, Text, useColorModeValue } from '@chakra-ui/react';
// Assets
import { MdAccessTime, MdCallMissed, MdKeyboardReturn } from 'react-icons/md';
import Card from '../../../Components/Core/Card/Card';

function CouseItem({ name, description, type, history, dateline }, rest) {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const bg = useColorModeValue('white', 'navy.700');
  const rdBg = ['https://i.imgur.com/iZSJCDq.png', 'https://i.imgur.com/hF9bSEF.png'];

  return (
    <Card bg={bg} {...rest} p="20px">
      <Flex align="center" direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
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
        {history ? (
          <Box>
            <Text color={textColorPrimary}>Đã nộp:</Text>
            <Text fontWeight="500" color={textColorSecondary} fontSize="sm" me="4px">
              https://i.imgur.com/hF9bSEF.png
            </Text>
          </Box>
        ) : null}

        <Box>
          <Flex align="flex-end" direction="column">
            <Link href={'link'} variant="no-hover" me="16px" p="0px !important">
              <Icon as={MdKeyboardReturn} color="secondaryGray.500" h="18px" w="18px" />
            </Link>

            <Text color={textColorPrimary}>
              <Flex alignItems="center" gap="10px">
                {dateline ? (
                  <>
                    <MdAccessTime />
                    {dateline}
                  </>
                ) : (
                  <>
                    <MdCallMissed />
                    Truy cập ngay
                  </>
                )}
              </Flex>
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
}

export default CouseItem;
