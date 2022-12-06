import { Flex } from '@chakra-ui/react';
import React from 'react';
import CouseItem from './CouseItem';

function Labs({ courses }) {
  return (
    <Flex gap={{ base: '20px', xl: '20px' }} flexDirection="column">
      {courses.labs?.map((document, index) => (
        <CouseItem
          key={index}
          password={document.password}
          deadline={document.deadlines}
          history={document.count_submit}
          name={document.name}
          slug={document.slug}
          type={1}
          description="Bài tập"
        />
      ))}
    </Flex>
  );
}

export default Labs;
