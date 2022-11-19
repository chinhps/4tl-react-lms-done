import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
  Switch,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import classesAPI from '../../../api/classesAPI';
import roleAPI from '../../../api/roleAPI';
import userAPI from '../../../api/userAPI';

export default function CreateUser() {
  const [status, setStatus] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [role, setRole] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  function onSubmit(values) {
    return new Promise((resolve) => {
      if (status) values.status = 1;
      else values.status = 0;
      console.log(values);
      const postData = {
        user_code: values.code,
        password: values.password,
        email: values.email,
        phone_number: values.phone_number,
        name: values.name,
        status: Number(values.status),
        role_id: Number(values.role_id),
        class_id: Number(values.class_id),
      };

      userAPI.new(postData).then((res) => {
        setIsSubmit(false);
        toast({
          title: 'Thông báo',
          description: res.msg,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      });
    })
      .then(() => {
        setTimeout(() => {
          navigate('/user/list');
        }, 2000);
      })

      .catch((err) => {
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
    classesAPI
      .get()
      .then((res) => {
        setClasses(res);
      })
      .then(() => {
        roleAPI.get().then((res2) => {
          setRole(res2);
        });
      });
  }, []);

  return (
    <>
      <Text fontSize="6xl" fontWeight="bold">
        {params.id ? 'Sửa người dùng' : 'Thêm mới người dùng'}
      </Text>
      <form onSubmit={handleSubmit(onSubmit)} style={{ gap: '20px', display: 'flex', flexDirection: 'column' }}>
        <FormControl isInvalid={errors.code}>
          <FormLabel htmlFor="code">
            Mã tài khoản
            <span role="presentation" aria-hidden="true" style={{ color: 'red', marginLeft: '2px' }}>
              *
            </span>
          </FormLabel>
          <Input
            id="code"
            placeholder="Mã tài khoản"
            {...register('code', {
              required: 'Mã tài khoản không được để trống',
              minLength: { value: 4, message: 'Mã tài khoản phải lớn hơn 4 kí tự' },
            })}
          />
          <FormErrorMessage>{errors.code && errors.code.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">
            Email
            <span role="presentation" aria-hidden="true" style={{ color: 'red', marginLeft: '2px' }}>
              *
            </span>
          </FormLabel>
          <Input
            id="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email không được bỏ trống',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Email không hợp lệ',
              },
            })}
          />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <FormLabel htmlFor="password">
            Mật khẩu
            <span role="presentation" aria-hidden="true" style={{ color: 'red', marginLeft: '2px' }}>
              *
            </span>
          </FormLabel>
          <Input
            type="password"
            id="password"
            placeholder="password"
            {...register('password', {
              required: 'Mật khẩu không được bỏ trống',
              minLength: { value: 3, message: 'Mật khẩu phải ít nhất 3 ký tự' },
            })}
          />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">
            Họ và tên
            <span role="presentation" aria-hidden="true" style={{ color: 'red', marginLeft: '2px' }}>
              *
            </span>
          </FormLabel>
          <Input
            id="name"
            placeholder="Họ và tên"
            {...register('name', {
              required: 'Họ và tên không được bỏ trống',
              minLength: { value: 2, message: 'Họ và tên phải lớn hơn 2 kí tự' },
            })}
          />
          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.phone_number}>
          <FormLabel htmlFor="phone_number">
            Số điện thoại
            <span role="presentation" aria-hidden="true" style={{ color: 'red', marginLeft: '2px' }}>
              *
            </span>
          </FormLabel>
          <Input
            id="phone_number"
            placeholder="Số điện thoại"
            type={'number'}
            {...register('phone_number', {
              required: 'Số điện thoại không được bỏ trống',
              minLength: { value: 10, message: 'Số điện thoai có 10 chữ số' },
              maxLength: { value: 10, message: 'Số điện thoai có 10 chữ số' },
            })}
          />
          <FormErrorMessage>{errors.phone_number && errors.phone_number.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.role_id}>
          <FormLabel htmlFor="role_id">
            Vai trò
            <span role="presentation" aria-hidden="true" style={{ color: 'red', marginLeft: '2px' }}>
              *
            </span>
          </FormLabel>
          <Select
            id="role_id"
            placeholder="Vai trò"
            {...register('role_id', {
              required: 'Bạn chưa chọn vai trò',
            })}
          >
            {role.map((item) => (
              <option key={item.id} value={item.id}>
                {item.role_name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.role_id && errors.role_id.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.class_id}>
          <FormLabel htmlFor="class_id">
            Lớp
            <span role="presentation" aria-hidden="true" style={{ color: 'red', marginLeft: '2px' }}>
              *
            </span>
          </FormLabel>
          <Select
            id="class_id"
            placeholder="Lớp"
            {...register('class_id', {
              required: 'Bạn chưa chọn lớp',
            })}
          >
            {classes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.class_name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.class_id && errors.class_id.message}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="name">Khóa</FormLabel>
          <Switch onChange={() => setStatus(!status)} />
        </FormControl>
        <Button mt={4} colorScheme="teal" isLoading={isSubmit} type="submit" w={'100px'}>
          Thêm mới
        </Button>
      </form>
    </>
  );
}
