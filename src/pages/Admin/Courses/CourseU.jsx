import { useForm } from 'react-hook-form';
import React from 'react';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
  Text,
  Switch,
  Toast,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import coursesAPI from '../../../api/coursesAPI';
import { useState } from 'react';
import subjectsAPI from '../../../api/subjectAPI';
import classesAPI from '../../../api/classesAPI';
import Card from '../../../Components/Core/Card/Card';

const CoursesU = () => {
  const [listTeacher, setListTeacher] = useState([]);
  const [course, setCouse] = useState(null);
  const [defaultSubject, setDefaultSubject] = useState(null);
  const [subject, setSubject] = useState([]);
  const [classes, setClasses] = useState([]);
 
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const params = useParams();
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [defaultName, setDefaultName] = useState(null);
  const [defaultSwitchValue, setDefaultSwitchValue] = useState();

  function onSubmit(values) {
    const postData = {
      subject_id: Number(values.subject_id),
      class_code: values.class_code,
      name: values.name,
      status: defaultSwitchValue === true ? 1 : 0,
    };
    return new Promise((resolve) => {
      coursesAPI
        .put(params.id, postData)
        .then((res) => {
          setIsSubmit(false);
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
            navigate('/admin/courses');
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
      const res = await coursesAPI.getById(params.id);
      setCouse(res);
      setDefaultName(await res.name);
      setDefaultSwitchValue(res.status === 1 ? true : false);

      const res2 = await coursesAPI.getTeacher();
      const res3 = await subjectsAPI.getWithoutPaginate();

      setListTeacher(res2);
      setSubject(res3);
      console.log(res);
      for (const [key, value] of Object.entries(res)) {
        setValue(`${key}`, value);
      }
      for (const [key, value] of Object.entries(res2)) {
        setValue(`${key}`, value);
      }
      setDefaultSubject(res.subject_id);
    };
    fetchData().catch((err) => console.log(err));
    classesAPI
      .getWithoutPaginate()
      .then((res) => {
        setClasses(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Card>
      <Text fontSize="6xl" fontWeight="bold">
        {params.id ? 'Sửa khóa học' : 'Thêm mới khóa học'}
      </Text>
      {defaultSubject && listTeacher && course ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.subject_id}>
            <FormLabel htmlFor="subject_id">
              Môn học
              <span role="presentation" aria-hidden="true" style={{ color: 'red', marginLeft: '2px' }}>
                *
              </span>
            </FormLabel>
            <Select
              value={defaultSubject? defaultSubject : null}
              id="subject_id"
              placeholder="Chọn môn học"
              {...register('subject_id', {
                required: 'Vui lòng chọn khóa học',
              })}
            >
              {subject?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.subject_id && errors.subject_id.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.class_code}>
          <FormLabel htmlFor="class_code">
            Lớp
            <span role="presentation" aria-hidden="true" style={{ color: 'red', marginLeft: '2px' }}>
              *
            </span>
          </FormLabel>
          <Select
            id="class_code"
            placeholder="Lớp"
            {...register('class_code', {
              required: 'Bạn chưa chọn lớp',
            })}
          >
            {classes?.map((item) => (
              <option key={item.id} value={item.class_name}>
                {item.class_name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.class_code && errors.class_code.message}</FormErrorMessage>
        </FormControl>
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">
              Tên giáo viên
              <span role="presentation" aria-hidden="true" style={{ color: 'red', marginLeft: '2px' }}>
                *
              </span>
            </FormLabel>
            <Select
              placeholder="Chọn giáo viên"
              id="name"
              {...register('name', {
                required: 'Vui lòng nhập tên giáo viên',
              })}
            >
              {listTeacher?.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
          </FormControl>
          <FormControl display="flex" alignItems="center" mt="15">
            <FormLabel htmlFor="status" mb="0">
              Hiện thị
            </FormLabel>
            <Switch
              id="status"
              isChecked={defaultSwitchValue}
              onChange={() => setDefaultSwitchValue(!defaultSwitchValue)}
            />
          </FormControl>
          <Button mt={4} colorScheme="teal" isLoading={isSubmit} type="submit">
            Lưu
          </Button>
        </form>
      ) : (
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      )}
    </Card>
  );
};

export default CoursesU;
