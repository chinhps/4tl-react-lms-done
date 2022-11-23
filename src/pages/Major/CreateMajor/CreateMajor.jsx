import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button, Switch, Box, useToast, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import majorsAPI from '../../../api/majorAPI';

export default function CreateMajor() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      if (status) values.status = 1;
      else values.status = 0;
      console.log(values);
      const postData = {
        name: values.name,
        branchable_type: 'courses',
        slug: values.name,
        status: Number(values.status),
      };

      majorsAPI.new(postData).then((res) => {
        setIsSubmit(!isSubmit);
        toast({
          title: 'Thông báo',
          description: res.msg,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate('/major/list');
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
        Thêm ngành học
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">
            Tên ngành
            <span role="presentation" aria-hidden="true" style={{ color: 'red', marginLeft: '2px' }}>
              *
            </span>
          </FormLabel>
          <Input
            id="name"
            placeholder="Tên ngành"
            {...register('name', {
              required: 'Tên ngành học không được bỏ trống',
              minLength: { value: 4, message: 'Tên ngành học phải ' },
            })}
          />
          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="status">Hiển thị</FormLabel>
          <Switch
            size="lg"
            onChange={() => {
              setStatus(!status);
            }}
          />
        </FormControl>
        <br />
        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Thêm mới
        </Button>
      </form>
    </Box>
  );
}
