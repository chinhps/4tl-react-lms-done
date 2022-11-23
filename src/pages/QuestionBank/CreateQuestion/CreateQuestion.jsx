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
  Checkbox,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import classesAPI from '../../../api/classesAPI';
import roleAPI from '../../../api/roleAPI';
import userAPI from '../../../api/userAPI';
import subjectsAPI from '../../../api/subjectAPI';
import questionsBankAPI from '../../../api/questionBankAPI';

export default function CreateQuestion() {
  const [status, setStatus] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  let answers = [
    {
      id: 1,
      answer: '',
      isCorrect: false,
    },
    {
      id: 2,
      answer: '',
      isCorrect: false,
    },
    {
      id: 3,
      answer: '',
      isCorrect: false,
    },
    {
      id: 4,
      answer: '',
      isCorrect: false,
    },
  ];
  const handleOnCheck = (index) => {
    answers[index].isCorrect = !answers[index].isCorrect;
    console.log(answers);
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [subjects, setSubject] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  function onSubmit(values) {
    return new Promise((resolve) => {
      console.log(values);
      answers[0].answer = values.answer1;
      answers[1].answer = values.answer2;
      answers[2].answer = values.answer3;
      answers[3].answer = values.answer4;
      const postData = {
        subject_id: values.subject_id,
        question: values.question,
        answers: JSON.stringify(answers),
        level: values.level,
        user_id: 0,
      };

      questionsBankAPI.new(postData).then((res) => {
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
          navigate('/question-bank/list');
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
    subjectsAPI.get().then((res) => {
      setSubject(res);
    });
  }, []);
  return (
    <>
      <Text fontSize="6xl" fontWeight="bold">
        {params.id ? 'Sửa người dùng' : 'Thêm mới người dùng'}
      </Text>
      <form onSubmit={handleSubmit(onSubmit)} style={{ gap: '20px', display: 'flex', flexDirection: 'column' }}>
        <FormControl isInvalid={errors.subject_id}>
          <FormLabel htmlFor="subject_id">
            Môn học
            <span role="presentation" aria-hidden="true" style={{ color: 'red', marginLeft: '2px' }}>
              *
            </span>
          </FormLabel>
          <Select
            id="subject_id"
            placeholder="Môn học"
            {...register('subject_id', {
              required: 'Bạn chưa chọn môn học',
            })}
          >
            {subjects.data?.map((item) => (
              <option key={item.name} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.subject_id && errors.subject_id.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.question}>
          <FormLabel htmlFor="question">
            Câu hỏi
            <span role="presentation" aria-hidden="true" style={{ color: 'red', marginLeft: '2px' }}>
              *
            </span>
          </FormLabel>
          <Input
            id="question"
            placeholder="Câu hỏi"
            {...register('question', {
              required: 'Câu hỏi không được để trống',
            })}
          />
          <FormErrorMessage>{errors.question && errors.question.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.answer1}>
          <FormLabel htmlFor="answer1">
            Câu trả lời
          </FormLabel>
          <Input id="answer1" placeholder="Câu trả lời" {...register('answer1')} />
          <FormErrorMessage>{errors.answer1 && errors.answer1.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.answer2}>
          <FormLabel htmlFor="answer2">
            Câu trả lời
          </FormLabel>
          <Input id="answer2" placeholder="Câu trả lời" {...register('answer2')} />
          <FormErrorMessage>{errors.answer2 && errors.answer2.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.answer3}>
          <FormLabel htmlFor="answer3">
            Câu trả lời
          </FormLabel>
          <Input id="answer3" placeholder="Câu trả lời" {...register('answer3')} />
          <FormErrorMessage>{errors.answer3 && errors.answer3.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.answer4}>
          <FormLabel htmlFor="answer4">
            Câu trả lời
          </FormLabel>
          <Input id="answer4" placeholder="Câu trả lời" {...register('answer4')} />
          <FormErrorMessage>{errors.answer4 && errors.answer4.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.level}>
          <FormLabel htmlFor="level">
            Level
            <span role="presentation" aria-hidden="true" style={{ color: 'red', marginLeft: '2px' }}>
              *
            </span>
          </FormLabel>
          <Input
            type="number"
            id="level"
            placeholder="Level"
            {...register('level', {
              required: 'Bạn chưa nhập level',
              min: 1,
              max: 8,
            })}
          />
          <FormErrorMessage>{errors.level && errors.level.message}</FormErrorMessage>
        </FormControl>
        <FormLabel>
          Câu trả lời đúng
          <span role="presentation" aria-hidden="true" style={{ color: 'red', marginLeft: '2px' }}>
            *
          </span>
        </FormLabel>
        <Checkbox onChange={() => handleOnCheck(0)}>Câu trả lời 1</Checkbox>
        <Checkbox onChange={() => handleOnCheck(1)}>Câu trả lời 2</Checkbox>
        <Checkbox onChange={() => handleOnCheck(2)}>Câu trả lời 3</Checkbox>
        <Checkbox onChange={() => handleOnCheck(3)}>Câu trả lời 4</Checkbox>
        <Button mt={4} colorScheme="teal" isLoading={isSubmit} type="submit" w={'100px'}>
          Thêm mới
        </Button>
      </form>
    </>
  );
}
