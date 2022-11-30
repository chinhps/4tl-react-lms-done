import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button, Switch, Box, useToast, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import permissionsAPI from '../../../api/permissionsAPI';

export default function CreatePermission() {
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
        ps_code: values.ps_code,
        ps_name: values.ps_name,
        ps_group: values.ps_group,
      };

      permissionsAPI.new(postData).then((res) => {
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
        Thêm quyền
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.ps_name} isRequired>
          <FormLabel htmlFor="ps_name">Tên quyền</FormLabel>
          <Input
            id="ps_name"
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
            placeholder="Thể loại quyền"
            {...register('ps_group', {
              required: 'Thể loại quyền không được để trống',
            })}
          />
          <FormErrorMessage>{errors.ps_group && errors.ps_group.message}</FormErrorMessage>
        </FormControl>
        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Thêm mới
        </Button>
      </form>
    </Box>
  );
}
