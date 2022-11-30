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
  Spinner,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import majorsAPI from '../../../api/majorAPI';

export default function UpdateMajor() {
  const navigate = useNavigate();
  const [status, setStatus] = useState();
  const { id } = useParams();
  const toast = useToast();
  const [isSubmit, setIsSubmit] = useState(false);
  const [major, setMajor] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      if (status) {
        values.status = 1;
      } else {
        values.status = 0;
      }
      const putData = {
        name: values.name,
        branchable_type: 'courses',
        slug: values.name,
        status: Number(values.status),
      };
      majorsAPI.put(id, putData).then((res) => {
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
    majorsAPI.getById(id).then((res) => {
      setMajor(res);
      setStatus(res.status);
    });
  }, [id]);

  return (
    <Box>
      <Text fontSize="6xl" fontWeight="bold">
        Sửa ngành học
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
        <FormControl>
          <FormLabel htmlFor="status">Hiển thị</FormLabel>
          {status != undefined ? (
            <Switch
              defaultChecked={status}
              size="lg"
              onChange={() => {
                setStatus(!status);
              }}
            />
          ) : (
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
          )}
        </FormControl>
        <br />
        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Sửa
        </Button>
      </form>
    </Box>
  );
}
