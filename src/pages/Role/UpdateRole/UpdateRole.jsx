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
import rolesAPI from '../../../api/roleAPI';
import Card from '../../../Components/Core/Card/Card';

export default function UpdateRole() {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();
  const [isSubmit, setIsSubmit] = useState(false);
  const [role, setRole] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      const putData = {
        role_code: values.role_code,
        role_name: values.role_name,
      };
      rolesAPI.put(id, putData).then((res) => {
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
    rolesAPI.getById(id).then((res) => {
      setRole(res);
    });
  }, [id]);

  return (
    <Card>
      <Text fontSize="6xl" fontWeight="bold">
        Sửa vai trò
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        {role ? (
          <>
            <FormControl isInvalid={errors.role_name} isRequired>
              <FormLabel htmlFor="role_name">Tên vai trò</FormLabel>
              <Input
                id="role_name"
                defaultValue={role.role_name ? role?.role_name : ''}
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
                defaultValue={role.role_code ? role?.role_code : ''}
                placeholder="Mã vai trò"
                {...register('role_code', {
                  required: 'Mã vai trò không được để trống',
                })}
              />
              <FormErrorMessage>{errors.role_code && errors.role_code.message}</FormErrorMessage>
            </FormControl>
            <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
              Sửa
            </Button>
          </>
        ) : (
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        )}
      </form>
    </Card>
  );
}
