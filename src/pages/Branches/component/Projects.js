// Chakra imports
import { Grid, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import React from 'react';
import Card from '../../../Components/Core/Card/Card';
import Project from './Project';

export default function Projects({ data, pendingBranch }) {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  return (
    <Card mb={{ base: '0px', '2xl': '20px' }}>
      <Text color={textColorPrimary} fontWeight="bold" fontSize="2xl" mt="10px" mb="4px">
        Kho kiến thức
      </Text>
      <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
        Nơi tham gia các lớp học hoặc lấy tài liệu học tập.
      </Text>
      <Grid
        gridTemplateColumns={{ xl: `repeat(${data.length > 6 ? 2 : 1}, 1fr)`, sm: '1fr 0.46fr' }}
        gap={{ base: '20px', xl: '20px' }}
        display={{ base: 'block', xl: 'grid' }}
      >
        {!pendingBranch ? (
          data.map((project, i) => (
            <Project key={i} data={project} image={project.thumb} link={project.slug} title={project.name} />
          ))
        ) : (
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        )}
      </Grid>
    </Card>
  );
}
