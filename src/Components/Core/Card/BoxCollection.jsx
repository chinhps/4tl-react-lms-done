import React, { useState } from 'react';
// Chakra imports
import { Box, Button, Flex, Icon, Image, Link, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { isValidHttpUrl } from '../../../utils/data';

function BoxCollection(props) {
  const { image, name, id, time } = props;
  const [like, setLike] = useState(false);
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorBid = useColorModeValue('brand.500', 'white');
  const navigate = useNavigate();
  const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
  const bg = useColorModeValue('white', 'navy.700');

  return (
    <Card p="20px" bg={bg} boxShadow={cardShadow}>
      <Flex direction={{ base: 'column' }} justify="center">
        <Box mb={{ base: '20px', '2xl': '20px' }} position="relative">
          <Image
            onClick={() => {
              navigate(`/news-detail/${id}`);
            }}
            style={{ cursor: 'pointer' }}
            src={isValidHttpUrl(image) ? image : process.env.REACT_APP_API + image}
            w={{ base: '100%', '3xl': '100%' }}
            h={'160px'}
            objectFit="cover"
            borderRadius="20px"
          />
        </Box>
        <Flex flexDirection="column" gap={3} justify="space-between" h="100%">
          <Flex
            justify="space-between"
            direction={{
              base: 'row',
              md: 'column',
              lg: 'row',
              xl: 'column',
              '2xl': 'row',
            }}
            mb="auto"
          >
            <Flex direction="column">
              <Text
                color={textColor}
                fontSize={{
                  base: 'xl',
                  md: 'lg',
                  lg: 'lg',
                  xl: 'lg',
                  '2xl': 'md',
                  '3xl': 'lg',
                }}
                className="title-news"
                mb="5px"
                fontWeight="bold"
                me="14px"
                onClick={() => {
                  navigate(`/news-detail/${id}`);
                }}
                style={{ cursor: 'pointer' }}
              >
                {name}
              </Text>
              <Text
                color="secondaryGray.600"
                fontSize={{
                  base: 'sm',
                }}
                fontWeight="400"
                me="14px"
              >
                {moment(time).format('D/M/YYYY - h:mm A')}
              </Text>
            </Flex>
          </Flex>
          <Flex
            align="start"
            justify="space-between"
            direction={{
              base: 'row',
              md: 'column',
              lg: 'row',
              xl: 'column',
              '2xl': 'row',
            }}
          >
            <Button
              variant="darkBrand"
              color="white"
              fontSize="sm"
              fontWeight="500"
              borderRadius="70px"
              px="24px"
              py="5px"
              onClick={() => {
                navigate(`/news-detail/${id}`);
              }}
              style={{ cursor: 'pointer' }}
            >
              Chi tiết
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}

export default BoxCollection;
