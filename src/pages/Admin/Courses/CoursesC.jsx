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
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import coursesAPI from '../../../api/coursesAPI';
import { useState } from 'react';
import subjectsAPI from '../../../api/subjectAPI';
import classesAPI from '../../../api/classesAPI';
import Card from '../../../Components/Core/Card/Card';

const CoursesC = () => {
  const [listTeacher, setListTeacher] = useState([]);
  const [course, setCouse] = useState(null);
  const [classes, setClasses] = useState([]);
  const [subject, setSubject] = useState([]);
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const [defaultSwitchValue, setDefaultSwitchValue] = useState(true);
  const [sameAddressSwitch, setSameAddressSwitch] = useState(defaultSwitchValue);

  const handleSwitchOnChange = () => {
    const newValue = !sameAddressSwitch;
    setSameAddressSwitch(newValue);
  };

  function onSubmit(values) {
    const postData = {
      subject_id: Number(values.subject_id),
      class_code: values.class_code,
      name: values.name,
      status: sameAddressSwitch === true ? 1 : 0,
    };

    return new Promise((resolve) => {
      coursesAPI
        .new(postData)
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
    coursesAPI
      .getTeacher()
      .then((res) => {
        setListTeacher(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    subjectsAPI
      .getWithoutPaginate()
      .then((res) => {
        setSubject(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.subject_id}>
          <FormLabel htmlFor="subject_id">
            Môn học
            <span role="presentation" aria-hidden="true" style={{ color: 'red', marginLeft: '2px' }}>
              *
            </span>
          </FormLabel>
          <Select
            id="subject_id"
            placeholder="Chọn môn học"
            {...register('subject_id', {
              required: 'Vui lòng chọn môn học',
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
            id="name"
            placeholder="Chọn giáo viên"
            {...register('name', {
              required: 'Vui lòng nhập tên giáo viên',
            })}
          >
            {listTeacher.map((item) => (
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
          <Switch id="status" isChecked={defaultSwitchValue} onChange={handleSwitchOnChange} />
        </FormControl>
        <Button mt={4} colorScheme="teal" isLoading={isSubmit} type="submit">
          Lưu
        </Button>
      </form>
    </Card>
  );
};

export default CoursesC;
