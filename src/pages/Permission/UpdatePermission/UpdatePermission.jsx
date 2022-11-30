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
import permissionsAPI from '../../../api/permissionsAPI';

export default function UpdatePermission() {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();
  const [isSubmit, setIsSubmit] = useState(false);
  const [permission, setPermission] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      const putData = {
        ps_code: values.ps_code,
        ps_name: values.ps_name,
        ps_group: values.ps_group,
      };
      permissionsAPI.put(id, putData).then((res) => {
        setIsSubmit(!isSubmit);
        toast({
          title: 'Thông báo',
          description: res.msg,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate('/permission/list');
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
    permissionsAPI.getById(id).then((res) => {
      setPermission(res);
    });
  }, [id]);

  return (
    <Box>
      <Text fontSize="6xl" fontWeight="bold">
        Sửa quyền
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        {permission ? (
          <>
            <FormControl isInvalid={errors.ps_name} isRequired>
              <FormLabel htmlFor="ps_name">Tên quyền</FormLabel>
              <Input
                id="ps_name"
                defaultValue={permission.ps_name ? permission?.ps_name : ''}
                placeholder="Tên quyền"
                {...register('ps_name', {
                  required: 'Tên quyền không được để trống',
                })}
              />
              <FormErrorMessage>{errors.ps_name && errors.ps_name.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.ps_code} isRequired>
              <FormLabel htmlFor="ps_code">Mã quyền</FormLabel>
              <Input
                id="ps_code"
                defaultValue={permission.ps_code ? permission?.ps_code : ''}
                placeholder="Mã quyền"
                {...register('ps_code', {
                  required: 'Mã quyền không được để trống',
                })}
              />
              <FormErrorMessage>{errors.ps_code && errors.ps_code.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.ps_group} isRequired>
              <FormLabel htmlFor="ps_group">Thể loại quyền</FormLabel>
              <Input
                id="ps_group"
                defaultValue={permission.ps_group ? permission?.ps_group : ''}
                placeholder="Thể loại quyền"
                {...register('ps_group', {
                  required: 'Thể loại quyền không được để trống',
                })}
              />
              <FormErrorMessage>{errors.ps_group && errors.ps_group.message}</FormErrorMessage>
            </FormControl>
            <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
              Sửa
            </Button>
          </>
        ) : (
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        )}
      </form>
    </Box>
  );
}
