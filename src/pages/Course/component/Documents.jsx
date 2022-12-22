import { Flex } from '@chakra-ui/react';
import React from 'react';
import CouseItem from './CouseItem';

function Documents({ courses }) {
  return (
    <Flex flexDirection="column" gap="20px">
      {courses.documents?.map((lab, index) => (
        <CouseItem
          key={index}
          name={lab.name}
          slug={lab.slug}
          linkDoc={lab.link}
          type={2}
          description="Tài liệu"
        />
      ))}
    </Flex>
  );
}

export default Documents;
