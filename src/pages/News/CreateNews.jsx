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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classesAPI from '../../api/classesAPI';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import newsAPI from '../../api/newsAPI';

export default function CreateNews() {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      const thumb = document.getElementById('thumb');
      console.log(values);
      const file = thumb.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        // Base64 Data URL 👇
        console.log(reader.result);
      });

      reader.readAsDataURL(file);
      const postData = {
        class_name: values.class_name,
      };

      newsAPI.new(postData).then((res) => {
        setIsSubmit(!isSubmit);
        toast({
          title: 'Thông báo',
          description: res.msg,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate('/news/list');
        }, 2000);
      });
    }).catch((err) => {
      setIsSubmit(false);

      toast({
        title: 'Lỗi',
        description: err.errorInfo,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    });
  }

  return (
    <Box>
      <Text fontSize="6xl" fontWeight="bold">
        Thêm tin
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <FormControl isInvalid={errors.thumb} isRequired>
          <FormLabel htmlFor="thumb">Hình ảnh</FormLabel>
          <Input
            onChange={(e) => console.log(e)}
            type={'file'}
            id="thumb"
            placeholder="Hình ảnh"
            {...register('thumb', {
              required: 'Hình ảnh không được để trống',
            })}
          />
          <FormErrorMessage>{errors.thumb && errors.thumb.message}</FormErrorMessage>
        </FormControl>
        <FormLabel htmlFor="thumb">Nội dung</FormLabel>
        <CKEditor
          editor={ClassicEditor}
          data=""
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
        />
        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Thêm mới
        </Button>
      </form>
    </Box>
  );
}
