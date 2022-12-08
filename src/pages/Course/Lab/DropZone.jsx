import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Image, Input, Stack, Text, Button, useColorModeValue, Flex } from '@chakra-ui/react';
import uploadImg from '../../../assets/images/upload/cloud-upload-regular-240.png';
import { AiFillCloseCircle } from 'react-icons/ai';
import { imgConfig } from '../../../utils/constants';
import { FiX } from 'react-icons/fi';

const DropZone = (props) => {
  const [fileList, setFileList] = useState([]);
  const bg = useColorModeValue('white', 'navy.700');

  const handleFileDrop = (e) => {
    const file = e.target.files[0];

    if (file) {
      const updatedList = [...fileList, file];
      setFileList(updatedList);
      props.onFileChange(updatedList);
    }
  };
  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  return (
    <>
      <Box position="relative" w="full">
        <Stack direction="column" borderRadius="2xl" justify="center" p={10} align="center" border="2px dashed #4267B2">
          <Image src={uploadImg} alt="upload-file" w="100px" />
          <Text>Click vào đây để tải file của bạn lên</Text>
        </Stack>

        <Input
          position="absolute"
          type="file"
          top="0"
          w="full"
          h="full"
          opacity="0"
          cursor="pointer"
          outline="none"
          onChange={handleFileDrop}
        />
      </Box>

      {fileList.length > 0 ? (
        <Stack direction="column" mt={10} justify="start" align="start" w="full">
          <Text fontWeight={500} fontSize="lg">
            File đã chọn
          </Text>

          {fileList.map((item, index) => (
            <Stack
              position="relative"
              direction="row"
              justifyContent="space-between"
              align="center"
              gap="20px"
              w="full"
              p="3"
              bg={bg}
              rounded="lg"
              key={index}
            >
                <Flex gap={5}>
                  <Image src={imgConfig[item.type.split('/')[1]] || imgConfig['default']} alt={item.name} w="50px" />

                  <Stack direction="column" justify="start" align="start">
                    <Text>{item.name}</Text>

                    <Text>{item.size} byte</Text>
                  </Stack>
                </Flex>

                <Button variant="action" width="20px" borderRadius="50%" onClick={() => fileRemove(item)}>
                  <FiX height="10px" />
                </Button>
            </Stack>
          ))}
        </Stack>
      ) : null}
    </>
  );
};

DropZone.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropZone;
