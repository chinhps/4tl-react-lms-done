import React from 'react';
import { Stack, Text } from '@chakra-ui/react';
import DropZone from './DropZone';

function Lab() {
  const handleFileChange = (files) => {
    console.log(files);
  };

  return (
    <>
      <Stack direction="column" justify="center" align="center" h="100vh">
        <Stack direction="column" justify="center" align="center" gap="20px" bg="white" boxShadow="md" p="30px" w="80%">
          <Text fontWeight={500} fontSize="lg">
            Chọn file để tải lên
          </Text>
          <DropZone onFileChange={(files) => handleFileChange(files)} />
        </Stack>
      </Stack>
    </>
  );
}

export default Lab;
