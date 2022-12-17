import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button, Switch, Box, useToast, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rolesAPI from '../../../api/roleAPI';
import Card from '../../../Components/Core/Card/Card';

export default function CreateRole() {
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
      const postData = {
        role_code: values.role_code,
        role_name: values.role_name,
      };

      rolesAPI.new(postData).then((res) => {
        setIsSubmit(!isSubmit);
        toast({
          title: 'Thông báo',
          description: res.msg,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate('/role/list');
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
    <Card>
      <Text fontSize="6xl" fontWeight="bold">
        Thêm vai trò
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.role_name} isRequired>
          <FormLabel htmlFor="role_name">Tên vai trò</FormLabel>
          <Input
            id="role_name"
            placeholder="Tên vai trò"
            {...register('role_name', {
              required: 'Tên vai trò không được để trống',
            })}
          />
          <FormErrorMessage>{errors.role_name && errors.role_name.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.role_code} isRequired>
          <FormLabel htmlFor="role_code">Mã vai trò</FormLabel>
          <Input
            id="role_code"
            placeholder="Mã vai trò"
            {...register('role_code', {
              required: 'Mã vai trò không được để trống',
            })}
          />
          <FormErrorMessage>{errors.role_code && errors.role_code.message}</FormErrorMessage>
        </FormControl>
        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Thêm mới
        </Button>
      </form>
    </Card>
  );
}
