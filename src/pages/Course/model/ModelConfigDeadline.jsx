import deadlineConfigAPI from '../../../api/deadlineConfigAPI';
import ModelForm from '../../../Components/Core/ModelForm';

function ModelConfigDeadline(props) {
  const { ...res } = props;

  const dataForm = [
    {
      id: 1,
      label: 'Ngày bắt đầu',
      name: 'time_start',
      type: 'input',
      typeInput: 'datetime-local',
      default: props.default?.time_start ?? null,
      validate: { required: 'Bạn cần phải chọn ngày bắt đầu' },
    },
    {
      id: 2,
      label: 'Ngày kết thúc',
      name: 'time_end',
      type: 'input',
      typeInput: 'datetime-local',
      default: props.default?.time_end ?? null,
      validate: { required: 'Bạn cần phải chọn ngày kết thúc' },
    },
    {
      id: 3,
      label: 'Mật khẩu',
      name: 'password',
      type: 'input',
      default: props.default?.password ?? null,
    },
    {
      id: 4,
      label: 'Số lượng câu hỏi',
      name: 'questions',
      type: 'inputNumber',
      default: props.default?.questions ?? 10,
      validate: { required: 'Bạn cần phải nhập số lượng câu hỏi' },
    },
    {
      id: 5,
      label: 'Thời gian làm bài (giây)',
      name: 'max_time_working',
      type: 'inputNumber',
      min: 60,
      max: 7200,
      default: props.default?.max_time_working ?? 60,
    },
    {
      id: 6,
      label: 'Số lần làm/nộp bài tối đa',
      name: 'max_working',
      type: 'inputNumber',
      min: 1,
      max: 10,
      default: props.default?.max_working ?? 1,
      validate: { required: 'Bạn cần phải nhập số lần làm/nộp bài' },
    },
  ];

  const dataAPI = {
    fcApi: deadlineConfigAPI.upsert,
  };

  return (
    <>
      <ModelForm {...res} dataForm={dataForm} dataAPI={dataAPI} />
    </>
  );
}

export default ModelConfigDeadline;
