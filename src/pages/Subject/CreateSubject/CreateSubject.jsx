import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button, Switch } from '@chakra-ui/react';
import { useState } from 'react';

export default function CreateSubject() {
  const [status, setStatus] = useState(false);
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
      console.log(values);
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ gap: '20px', display: 'flex', flexDirection: 'column' }}>
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
        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit" w={'100px'}>
          Thêm mới
        </Button>
      </form>
    </>
  );
}
