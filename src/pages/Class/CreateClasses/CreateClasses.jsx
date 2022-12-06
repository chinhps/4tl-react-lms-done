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
import classesAPI from '../../../api/classesAPI';

export default function CreateClasses() {
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
      console.log(values);
      const postData = {
        class_name: values.class_name,
      };

      classesAPI.new(postData).then((res) => {
        setIsSubmit(!isSubmit);
        toast({
          title: 'Thông báo',
          description: res.msg,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate('/classes/list');
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
        Thêm lớp
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.class_name} isRequired>
          <FormLabel htmlFor="class_name">Tên lớp</FormLabel>
          <Input
            id="class_name"
            placeholder="Tên lớp"
            {...register('class_name', {
              required: 'Tên lớp không được để trống',
            })}
          />
          <FormErrorMessage>{errors.class_name && errors.class_name.message}</FormErrorMessage>
        </FormControl>
        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Thêm mới
        </Button>
      </form>
    </Box>
  );
}
