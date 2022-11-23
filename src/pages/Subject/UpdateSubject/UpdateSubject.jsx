import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  useToast,
  Select,
  Switch,
  Flex,
  Text,
  Checkbox,
} from '@chakra-ui/react';
import subjectsAPI from '../../../api/subjectAPI';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import majorsAPI from '../../../api/majorAPI';
import { useEffect } from 'react';

export default function UpdateSubject() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const toast = useToast();
  const navigate = useNavigate();
  const [major, setMajor] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [subject, setSubject] = useState(null);
  const [majorSelected, setMajorSelected] = useState(null);
  const params = useParams();
  const [status, setStatus] = useState();

  function onSubmit(values) {
    return new Promise((resolve) => {
      if (status) {
        values.status = 1;
      } else {
        values.status = 0;
      }

      const postData = {
        major_id: Number(values.major_id),
        code: values.code,
        name: values.name,
        status: values.status,
      };

      subjectsAPI
        .put(params.id, postData)
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
            navigate('/subject/list');
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
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await subjectsAPI.getById(params.id);
      setSubject(res);
      const res2 = await majorsAPI.get();
      setMajor(res2);
      setMajorSelected(Number(res.major_id));
      setStatus(res.status);
      for (const [key, value] of Object.entries(res)) {
        setValue(`${key}`, value);
      }
    };
    fetchData();
  }, [params.id]);

  return (
    <>
      <Text fontSize="6xl" fontWeight="bold">
        {params.id ? 'Sửa môn học' : 'Thêm mới môn học'}
      </Text>
      {subject && majorSelected ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.major_id}>
            <FormLabel htmlFor="name">Ngành học</FormLabel>
            <Select
              placeholder="Chọn ngành học"
              id="major_id"
              value={majorSelected}
              {...register('major_id', {
                required: 'Vui lòng nhập tên giáo viên',
              })}
            >
              {major.data?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>

            <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
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
              defaultValue={subject ? subject.code : ''}
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
              defaultValue={subject ? subject.name : ''}
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
              defaultChecked={status}
              onChange={() => {
                setStatus(!status);
              }}
            />
          </FormControl>
          <Flex gap={'1rem'}>
            <Button mt={4} bg="gray.300" type="button" onClick={() => navigate('/subject/list')}>
              Quay lại
            </Button>
            <Button mt={4} colorScheme="teal" isLoading={isSubmit} type="submit">
              Sửa
            </Button>
          </Flex>
        </form>
      ) : (
        <></>
      )}
    </>
  );
}
