import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
  Text,
  useToast,
  Checkbox,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import subjectsAPI from '../../../api/subjectAPI';
import questionsBankAPI from '../../../api/questionBankAPI';
import { userSelector } from '../../../selectors';
import { useSelector } from 'react-redux';

export default function CreateQuestion() {
  const user = useSelector(userSelector);
  const [answers, setAnswers] = useState([
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
  ]);
  const params = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const handleOnCheck = (index) => {
    answers[index].isCorrect = !answers[index].isCorrect;
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm();
  const [subjects, setSubject] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  function onSubmit(values) {
    return new Promise((resolve) => {
      const tempAnswer = [];
      let tempId = 1;
      answers.forEach((element) => {
        if (element.answer !== '') {
          tempAnswer.push({
            id: tempId,
            answer: element.answer,
            isCorrect: element.isCorrect,
          });
          tempId++;
        }
      });
      if (tempAnswer.length === 0) {
        toast({
          title: 'Thông báo',
          description: 'Bạn chưa nhập câu trả lời nào',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        return;
      } else if (values.level > 8 || values.level < 1) {
        toast({
          title: 'Thông báo',
          description: 'Level là số từ 1 đến 8',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      const postData = {
        subject_id: values.subject_id,
        question: values.question,
        answers: JSON.stringify(tempAnswer),
        level: values.level,
        user_id: user ? user.id : 0,
      };
      questionsBankAPI
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
    });
  }
  useEffect(() => {
    subjectsAPI.getWithoutPaginate().then((res) => {
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
            {subjects?.map((item, index) => (
              <option key={`subject-${index}`} value={item.id}>
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
          <FormLabel htmlFor="answer1">Câu trả lời</FormLabel>
          <Input
            id="answer1"
            placeholder="Câu trả lời"
            {...register('answer1')}
            onChange={(e) => {
              const temp = [...answers];
              temp[0].answer = e.target.value;
              setAnswers(temp);
            }}
          />
          <FormErrorMessage>{errors.answer1 && errors.answer1.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.answer2}>
          <FormLabel htmlFor="answer2">Câu trả lời</FormLabel>
          <Input
            id="answer2"
            placeholder="Câu trả lời"
            {...register('answer2')}
            onChange={(e) => {
              const temp = [...answers];
              temp[1].answer = e.target.value;
              setAnswers(temp);
            }}
          />
          <FormErrorMessage>{errors.answer2 && errors.answer2.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.answer3}>
          <FormLabel htmlFor="answer3">Câu trả lời</FormLabel>
          <Input
            id="answer3"
            placeholder="Câu trả lời"
            {...register('answer3')}
            onChange={(e) => {
              const temp = [...answers];
              temp[2].answer = e.target.value;
              setAnswers(temp);
            }}
          />
          <FormErrorMessage>{errors.answer3 && errors.answer3.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.answer4}>
          <FormLabel htmlFor="answer4">Câu trả lời</FormLabel>
          <Input
            id="answer4"
            placeholder="Câu trả lời"
            {...register('answer4')}
            onChange={(e) => {
              const temp = [...answers];
              temp[3].answer = e.target.value;
              setAnswers(temp);
            }}
          />
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
        {answers?.map((element, index) => (
          <Checkbox
            key={`answer` + index}
            disabled={element.answer === '' ? true : false}
            onChange={() => handleOnCheck(index)}
          >
            {element.answer || `Câu trả lời ${index + 1}`}
          </Checkbox>
        ))}
        <Button mt={4} colorScheme="teal" isLoading={isSubmit} type="submit" w={'100px'}>
          Thêm mới
        </Button>
      </form>
    </>
  );
}
