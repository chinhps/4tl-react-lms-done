import React from 'react';
import { Flex, Grid } from '@chakra-ui/react';
import CouseItem from './CouseItem';

function Quizs({courses}) {
  return (
    <Flex gap={{ base: '20px', xl: '20px' }} flexDirection="column">
      {courses.quizs?.map((couse, index) => (
        <CouseItem
          password={couse.password}
          key={index}
          name={'Bài ' + couse.name}
          deadline={couse.deadlines}
          type={0}
          slug={couse.slug}
          history={couse.count_submit}
          description="Quiz"
        />
      ))}
    </Flex>
  );
}

export default Quizs;
