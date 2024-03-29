import React from 'react';
// Chakra imports
import { Button, Flex, Icon, Image, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
// Assets
import { FaEthereum } from 'react-icons/fa';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';

function HistoryItem({ image, name, author, link }) {
  // Chakra Color Mode
  const textColor = useColorModeValue('brands.900', 'white');
  const bgItem = useColorModeValue(
    { bg: 'white', boxShadow: '0px 40px 58px -20px rgba(112, 144, 176, 0.12)' },
    { bg: 'navy.700', boxShadow: 'unset' },
  );
  const textColorDate = useColorModeValue('secondaryGray.600', 'white');
  return (
    <Card _hover={bgItem} bg="transparent" boxShadow="unset" px="24px" py="21px" transition="0.2s linear">
      <Flex direction={{ base: 'column' }} justify="center">
        <Flex position="relative" align="center">
          <Image src={image} w="66px" h="66px" borderRadius="20px" me="16px" />
          <Flex
            direction="column"
            w={{ base: '70%', md: '100%' }}
            me={{ base: '4px', md: '32px', xl: '10px', '3xl': '32px' }}
          >
            <Text
              color={textColor}
              fontSize={{
                base: 'md',
              }}
              mb="5px"
              fontWeight="bold"
              me="14px"
            >
              {name}
            </Text>
            <Text
              color="secondaryGray.600"
              fontSize={{
                base: 'sm',
              }}
              // whiteSpace="nowrap"
              // overflow="hidden"
              // textOverflow="ellipsis"
              // w="240px"
              fontWeight="400"
              me="14px"
            >
              {author}
            </Text>
          </Flex>
          {link ? (
            <Flex>
              <Link to={`/course/` + link}>
                <Button variant="action">Chi tiết</Button>
              </Link>
            </Flex>
          ) : null}
        </Flex>
      </Flex>
    </Card>
  );
}

export default HistoryItem;
