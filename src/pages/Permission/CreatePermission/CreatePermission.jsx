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
import permissionsAPI from '../../../api/permissionsAPI';
import permissionGroupAPI from '../../../api/permissionsGroup';
import Card from '../../../Components/Core/Card/Card';

export default function CreatePermission() {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const toast = useToast();
  const [permissionGroup, setPermissionGroup] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
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

  useEffect(() => {
    permissionGroupAPI.getWithoutPaginate().then((res) => {
      setPermissionGroup(res);
    });
  }, []);

  return (
    <Card>
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

        <FormControl isInvalid={errors.ps_group}>
          <FormLabel htmlFor="ps_group">
            Ngành học
            <span role="presentation" aria-hidden="true" style={{ color: 'red', marginLeft: '2px' }}>
              *
            </span>
          </FormLabel>
          <Select
            id="ps_group"
            placeholder="Chọn ngành học"
            defaultValue={''}
            {...register('ps_group', {
              required: 'Vui lòng chọn ngành học',
            })}
          >
            {permissionGroup ? (
              permissionGroup.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))
            ) : (
              <></>
            )}
          </Select>
          <FormErrorMessage>{errors.ps_group && errors.ps_group.message}</FormErrorMessage>
        </FormControl>
        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Thêm mới
        </Button>
      </form>
    </Card>
  );
}
