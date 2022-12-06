import { Flex } from '@chakra-ui/react';
import React from 'react';
import CouseItem from './CouseItem';

function Labs({ courses }) {
  return (
    <Flex gap={{ base: '20px', xl: '20px' }} flexDirection="column">
      {courses.labs?.map((data, index) => (
        <CouseItem
          max_working={data.max_working}
          key={index}
          level={data.level}
          config={data.config}
          password={data.password}
          deadline={data.deadlines}
          history={data.count_submit}
          name={data.name}
          slug={data.slug}
          type={1}
          description="Bài tập"
        />
      ))}
    </Flex>
  );
}

export default Labs;
