import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button, Switch, Box } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdateMajor() {
  const navigate = useNavigate();
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
      navigate('/major/list')
    });
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name} isRequired>
          <FormLabel htmlFor="name">Tên ngành</FormLabel>
          <Input
            id="name"
            placeholder="Tên ngành"
            {...register('name', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="name">Hiển thị</FormLabel>
          <Switch
            size="lg"
            onChange={() => {
              setStatus(!status);
            }}
          />
        </FormControl>
        <br />
        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Thêm mới
        </Button>
      </form>
    </Box>
  );
}
