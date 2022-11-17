import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button, Switch, useToast, Select } from '@chakra-ui/react';
import { useState } from 'react';
import subjectsAPI from '../../../api/subjectAPI';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import majorsAPI from '../../../api/majorAPI';

export default function CreateSubject() {
  const toast = useToast();
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [major, setMajor] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      if (status) {
        values.status = 1;
      } else {
        values.status = 0;
      }
      console.log(values);
      const postData = {
        major_id: Number(values.major_id),
        code: values.code,
        name: values.name,
        status: values.status,
      };
      subjectsAPI
        .new(postData)
        .then((res) => {
          toast({
            title: 'Thông báo',
            description: res.msg,
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        })
        .then(() => {
          setTimeout(() => {
            navigate('/courses');
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
      console.log(postData);
    });
  }
  useEffect(() => {
    majorsAPI.get().then((res) => {
      setMajor(res);
    });
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ gap: '20px', display: 'flex', flexDirection: 'column' }}>
        <FormControl isInvalid={errors.major_id}>
          <FormLabel htmlFor="major_id">
            Ngành học
            <span role="presentation" aria-hidden="true" style={{ color: 'red', marginLeft: '2px' }}>
              *
            </span>
          </FormLabel>
          <Select
            id="major_id"
            placeholder="Chọn ngành học"
            defaultValue={''}
            {...register('major_id', {
              required: 'Vui lòng chọn ngành học',
            })}
          >
            {major ? (
              major.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))
            ) : (
              <></>
            )}
          </Select>
          <FormErrorMessage>{errors.code && errors.code.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.code}>
          <FormLabel htmlFor="code">
            Mã môn học
            <span role="presentation" aria-hidden="true" style={{ color: 'red', marginLeft: '2px' }}>
              *
            </span>
          </FormLabel>
          <Input
            id="code"
            placeholder="Mã môn học"
            {...register('code', {
              required: 'Mã môn học không được bỏ trống',
              minLength: { value: 2, message: 'Mã môn học phải ít nhất 2 kí tự' },
            })}
          />
          <FormErrorMessage>{errors.code && errors.code.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">
            Tên môn học
            <span role="presentation" aria-hidden="true" style={{ color: 'red', marginLeft: '2px' }}>
              *
            </span>
          </FormLabel>
          <Input
            id="name"
            placeholder="Tên môn học"
            {...register('name', {
              required: 'Tên môn học không được bỏ trống',
              minLength: { value: 4, message: 'Tên môn học phải ít nhất 4 kí tự' },
            })}
          />
          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Hiển thị</FormLabel>
          <Switch
            onChange={() => {
              setStatus(!status);
            }}
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit" w={'100px'}>
          Thêm mới
        </Button>
      </form>
    </>
  );
}
