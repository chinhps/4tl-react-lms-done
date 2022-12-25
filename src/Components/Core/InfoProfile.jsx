// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import Card from './Card/Card';

function InfoProfile(props) {
  const { banner, avatar, name, job, countInfo } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const borderColor = useColorModeValue('white !important', '#111C44 !important');
  return (
    <Card align="center">
      <Box bg={`url(${banner})`} bgSize="cover" borderRadius="16px" h="131px" w="100%" />
      {avatar ? (
        <Avatar mx="auto" src={avatar} h="87px" w="87px" mt="-43px" border="4px solid" borderColor={borderColor} />
      ) : null}

      <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="20px">
        {name}
      </Text>
      {job ? (
        <Text color={textColorSecondary} fontSize="sm">
          {job}
        </Text>
      ) : null}
      <Flex justifyContent="space-evenly" mt="26px">
        {countInfo.map((info,index) => (
          <Flex key={index} direction="column">
            <Text color={textColorPrimary} fontSize="xl" fontWeight="500">
              {info.name}
            </Text>
            <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
              {info.value}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Card>
  );
}

export default InfoProfile;
