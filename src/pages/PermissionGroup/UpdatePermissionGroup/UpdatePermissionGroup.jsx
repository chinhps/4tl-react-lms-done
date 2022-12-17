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
import permissionGroupAPI from '../../../api/permissionsGroup';
import Card from '../../../Components/Core/Card/Card';

export default function UpdatePermissionGroup() {
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
        name: values.name,
      };
      permissionGroupAPI.put(id, putData).then((res) => {
        setIsSubmit(!isSubmit);
        toast({
          title: 'Thông báo',
          description: res.msg,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate('/permission-group/list');
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
    permissionGroupAPI.getById(id).then((res) => {
      setPermission(res);
      reset(res);
    });
  }, [id]);

  return (
    <Card>
      <Text fontSize="6xl" fontWeight="bold">
        Sửa quyền
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        {permission ? (
          <>
            <FormControl isInvalid={errors.name} isRequired>
              <FormLabel htmlFor="name">Tên quyền</FormLabel>
              <Input
                id="name"
                defaultValue={permission.name ? permission?.name : ''}
                placeholder="Tên quyền"
                {...register('name', {
                  required: 'Tên quyền không được để trống',
                })}
              />
              <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
            </FormControl>
            <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
              Cập nhật
            </Button>
          </>
        ) : (
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        )}
      </form>
    </Card>
  );
}
