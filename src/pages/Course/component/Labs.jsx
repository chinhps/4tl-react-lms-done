import { Flex } from '@chakra-ui/react';
import React from 'react';
import CouseItem from './CouseItem';

function Labs({ courses }) {
  return (
    <Flex gap={{ base: '20px', xl: '20px' }} flexDirection="column">
      {courses.labs?.map((document, index) => (
        <CouseItem
          key={index}
          deadline={document.deadlines}
          history={document.point_submit}
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
