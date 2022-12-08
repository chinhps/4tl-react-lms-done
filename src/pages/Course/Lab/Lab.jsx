import React, { useEffect } from 'react';
import { Box, Button, Grid, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react';
import DropZone from './DropZone';
import Card from '../../../Components/Core/Card/Card';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import HistoryItem from '../../../Components/Core/Table/HistoryItem';
import iconFile from '../../../assets/images/file.png';
import labAPI from '../../../api/labAPI';

function Lab() {
  const { lab: labs } = useSelector((state) => state.lab);
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';

  const { slugCourse, slugLab } = useParams();
  const [listFile, setListFile] = useState([]);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (labs === undefined || labs?.slug !== slugLab) {
      navigate(`/course/${slugCourse}`);
      toast({
        title: 'Thông báo!',
        description: 'Không thể truy cập Lab trực tiếp',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, []);

  const handleFileChange = (files) => {
    setListFile(files);
    console.log(files);
  };

  const handleUploadLab = () => {
    let formData = new FormData();
    formData.append('id_point', labs?.id_point);
    formData.append('slug_course', slugCourse);
    formData.append('slug_lab', slugLab);
    
    listFile.forEach((image_file) => {
      formData.append('listFile[]', image_file);
    });
    labAPI
      .submitLab(formData)
      .then((data) => {
        // bật thông báo
        setMsg(data.msg);
        onOpen();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleClose = () => {
    onClose();
    toast({
      title: 'Thông báo!',
      description: 'Nộp bài thành công!',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    navigate(`/course/${slugCourse}`);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thông báo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{msg}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Grid
        gridTemplateColumns={{ base: 'repeat(3, 1fr)', sm: '1fr 0.46fr' }}
        gap={{ base: '20px', xl: '20px' }}
        display={{ base: 'block', xl: 'grid' }}
      >
        <Card mb={{ base: '0px', '2xl': '20px' }} p={8}>
          <Text color={textColorPrimary} fontWeight="bold" fontSize="2xl" mt="10px" mb="4px">
            {labs?.name ?? 'Đang tải...'}
          </Text>
          <Text color={textColorSecondary} fontSize="md" me="26px" mb="20px">
            Không thể xóa File khi đã nộp <br />
            Bạn có thể nộp tối đa {labs?.max_working ?? 'Đang tải...'} File (Docx, PDF, Zip,...) <br />
            Hãy chú ý kích thước lớn nhất của file là 32.0 MB
          </Text>
          <Text fontWeight={500} fontSize="lg" mb={3}>
            Chọn file để tải lên
          </Text>
          <DropZone onFileChange={(files) => handleFileChange(files)} />

          <Box textAlign="center" w="full">
            <Button
              onClick={() => handleUploadLab()}
              mt="30px"
              px={10}
              borderRadius="md"
              bg="#28A745"
              color="white"
              _hover={{ bg: 'green.400' }}
            >
              Nộp bài ngay
            </Button>
          </Box>
        </Card>
        <Card mb={{ base: '0px', '2xl': '20px' }} p={8}>
          <Text color={textColorPrimary} fontWeight="bold" fontSize="2xl" mt="10px" mb="4px">
            Thông tin
          </Text>
          <Text color={textColorSecondary} fontSize="md" me="26px" mb="20px">
            {labs ? (labs?.description ? labs.description : 'Không có thông tin') : null}
          </Text>
          <Box>
            <Text color={textColorPrimary} fontWeight="bold" fontSize="2xl" mt="10px" mb="4px">
              Bài đã nộp
            </Text>
            {labs
              ? labs.uploaded_lab?.map((vl, index) => (
                  <HistoryItem key={index} image={iconFile} name={vl.name} author={vl.link} />
                ))
              : null}
          </Box>
        </Card>
      </Grid>
    </>
  );
}

export default Lab;
