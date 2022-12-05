import { Flex } from '@chakra-ui/react';
import React from 'react';
import CouseItem from './CouseItem';

function Documents({ courses }) {
  return (
    <Flex gap={{ base: '20px', xl: '20px' }} flexDirection="column">
      {courses.documents?.map((lab, index) => (
        <CouseItem
          key={index}
          deadline={lab.deadlines}
          history={lab.point_submit}
          name={lab.name}
          slug={lab.slug}
          type={2}
          description="Tài liệu"
        />
      ))}
    </Flex>
  );
}

export default Documents;
