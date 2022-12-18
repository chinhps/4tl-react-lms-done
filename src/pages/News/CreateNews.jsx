import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Switch,
  Box,
  useToast,
  Text,
  Select,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classesAPI from '../../api/classesAPI';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import newsAPI from '../../api/newsAPI';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userSelector } from '../../selectors';
import Card from '../../Components/Core/Card/Card';
import DropZone from '../../Components/Core/DropZone/DropZone';

export default function CreateNews() {
  const user = useSelector(userSelector);
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [file, setFile] = useState(null);
  const toast = useToast();
  const bg = useColorModeValue('white', '#1B254B');
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

  // const [image, setImage] = useState();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  const onSubmit = (values) => {
    let formData = new FormData();
    formData.append('thumb', file);
    formData.append('title', values.title);
    formData.append('content', values.content);

    newsAPI.upsert(formData).then((data) => {
      toast({
        title: 'Thông báo',
        description: data.msg,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    });
  };

  const handleFileChange = (files) => {
    setFile(files[0]);
  };
  console.log(file);
  return (
    <Box p={10}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex justifyContent="space-between">
          <Text fontSize="22px" fontWeight="700" lineHeight="100%">
            Thêm mới tin tức
          </Text>
          <Button rounded="md" colorScheme="teal" isLoading={isSubmitting} type="submit">
            Thêm mới
          </Button>
        </Flex>
        <FormControl isInvalid={errors.title} isRequired>
          <FormLabel htmlFor="title">Tiêu đề</FormLabel>
          <Input
            id="title"
            placeholder="Tiêu đề"
            {...register('title', {
              required: 'Tiêu đề không được để trống',
            })}
          />
          <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Nội dung</FormLabel>
          <CKEditor
            editor={ClassicEditor}
            data=""
            onBlur={(event, editor) => {
              setValue('content', editor.getData());
            }}
          />
        </FormControl>
        <FormControl>
          <DropZone onFileChange={(files) => handleFileChange(files)} />
        </FormControl>
        <Button mt={4} w="100%" rounded="md" colorScheme="teal" isLoading={isSubmitting} type="submit">
          Thêm mới
        </Button>
      </form>
    </Box>
  );
}
