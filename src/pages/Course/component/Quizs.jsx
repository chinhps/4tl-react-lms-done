import React from 'react';
import { Flex, Grid } from '@chakra-ui/react';
import CouseItem from './CouseItem';

function Quizs({courses}) {
  return (
    <Flex flexDirection="column" gap="20px">
      {courses.quizs?.map((data, index) => (
        <CouseItem
          max_working={data.max_working}
          password={data.password}
          config={data.config}
          level={data.level}
          key={index}
          name={data.name}
          deadline={data.deadlines}
          type={0}
          slug={data.slug}
          history={data.count_submit}
          data={data}
          description="Quiz"
        />
      ))}
    </Flex>
  );
}

export default Quizs;
