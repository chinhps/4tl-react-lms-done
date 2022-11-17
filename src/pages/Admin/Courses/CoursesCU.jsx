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
import coursesAPI from '../../../api/courseAPI';
import { useState } from 'react';

const Courses = () => {
  const [listTeacher, setListTeacher] = useState([]);
  const [course, setCouse] = useState(null);
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

    if (params.id) {
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
      });
    } else {
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
      });
    }
  }
  useEffect(() => {
    coursesAPI.getById(params.id).then((res) => {
      setCouse(res);
      setDefaultSwitchValue(res.status === 1 ? true : false);
    });
  }, [params.id]);

  useEffect(() => {
    coursesAPI
      .getTeacher()
      .then((res) => {
        setListTeacher(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Text fontSize="6xl" fontWeight="bold">
        {params.id ? 'Sửa khóa học' : 'Thêm mới khóa học'}
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.subject_id}>
          <FormLabel htmlFor="subject_id">Mã khóa học</FormLabel>
          <Input
            type="number"
            id="subject_id"
            placeholder="Mã khóa học"
            defaultValue={course ? course.subject_id : ''}
            {...register('subject_id', {
              required: 'Vui lòng nhập mã khóa học',
              minLength: { value: 1, message: `Không được dưới 1 ký tự` },
            })}
          />
          <FormErrorMessage>{errors.subject_id && errors.subject_id.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.class_code}>
          <FormLabel htmlFor="class_code">Mã lớp</FormLabel>
          <Input
            id="class_code"
            defaultValue={course ? course.class_code : ''}
            placeholder="Mã lớp"
            {...register('class_code', {
              required: 'Vui lòng nhập mã lớp',
              minLength: { value: 3, message: 'Không được dưới 4 ký tự' },
            })}
          />
          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>
        {course ? (
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">Tên giáo viên</FormLabel>
            <Select
              id="name"
              defaultValue={course.name}
              {...register('name', {
                required: 'Vui lòng nhập tên giáo viên',
              })}
            >
              <option disabled value="">
                Tên giáo viên
              </option>

              {listTeacher.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
          </FormControl>
        ) : (
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">Tên giáo viên</FormLabel>
            <Select
              id="name"
              defaultValue={''}
              {...register('name', {
                required: 'Vui lòng nhập tên giáo viên',
              })}
            >
              <option disabled value="">
                Tên giáo viên
              </option>

              {listTeacher.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
          </FormControl>
        )}

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
    </>
  );
};

export default Courses;
