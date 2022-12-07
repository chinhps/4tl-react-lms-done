import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  useToast,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classesAPI from '../../../api/classesAPI';

export default function UpdateClasses() {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();
  const [isSubmit, setIsSubmit] = useState(false);
  const [permission, setPermission] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      const putData = {
        class_name: values.class_name,
      };
      classesAPI.put(id, putData).then((res) => {
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
      setIsSubmit(!isSubmit);
      toast({
        title: 'Lỗi',
        description: err.errorInfo,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    });
  }
  useEffect(() => {
    classesAPI.getById(id).then((res) => {
      setPermission(res);
      reset(res);
    });
  }, [id]);

  return (
    <Box>
      <Text fontSize="6xl" fontWeight="bold">
        Sửa lớp
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        {permission ? (
          <>
            <FormControl isInvalid={errors.class_name} isRequired>
              <FormLabel htmlFor="class_name">Tên lớp</FormLabel>
              <Input
                id="class_name"
                defaultValue={permission.class_name ? permission?.class_name : ''}
                placeholder="Tên lớp"
                {...register('class_name', {
                  required: 'Tên lớp không được để trống',
                })}
              />
              <FormErrorMessage>{errors.class_name && errors.class_name.message}</FormErrorMessage>
            </FormControl>
            <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
              Cập nhật
            </Button>
          </>
        ) : (
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        )}
      </form>
    </Box>
  );
}
