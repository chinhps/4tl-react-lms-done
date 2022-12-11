import quizAPI from '../../../api/quizAPI';
import ModelForm from '../../../Components/Core/ModelForm';

function ModelNewQuiz(props) {
  const { ...res } = props;
  const dataForm = [
    {
      id: 1,
      label: 'Tên bài Quiz',
      name: 'nameQuiz',
      type: 'input',
      default: props.default?.nameQuiz ?? null,
      validate: { required: 'Bạn cần nhập tên' },
    },
    {
      id: 2,
      label: 'Cấp độ Quiz',
      name: 'level',
      type: 'inputNumber',
      default: props.default?.level ?? 1,
    },
    {
      id: 3,
      label: 'Phạm vi Quiz',
      name: 'rangeQuiz',
      type: 'select',
      default: props.default?.rangeQuiz ?? null,
      validate: { required: 'Bạn chọn phạm vi bài Quiz' },
      selects: [
        {
          label: 'Riêng lớp học',
          value: 'courses',
        },
        {
          label: 'Tất cả lớp có môn học này',
          value: 'subjects',
        },
      ],
    },
    {
      id: 4,
      label: 'Mô tả',
      name: 'description',
      default: props.default?.description ?? null,
      type: 'textarea',
    },
  ];

  const dataAPI = {
    fcApi: quizAPI.createQuiz,
  };

  return (
    <>
      <ModelForm {...res} dataForm={dataForm} dataAPI={dataAPI} />
    </>
  );
}

export default ModelNewQuiz;
