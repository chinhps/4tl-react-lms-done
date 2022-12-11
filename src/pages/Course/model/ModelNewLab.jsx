import labAPI from '../../../api/labAPI';
import ModelForm from '../../../Components/Core/ModelForm';

function ModelNewLab(props) {
  const { ...res } = props;
  const dataForm = [
    {
      id: 1,
      label: 'Tên bài Lab',
      name: 'nameLab',
      type: 'input',
      default: props.default?.nameLab ?? null,
      validate: { required: "Bạn cần nhập tên" }
    },
    {
      id: 2,
      label: 'Cấp độ Lab',
      name: 'level',
      type: 'inputNumber',
      default: props.default?.level ?? 1,
    },
    {
      id: 3,
      label: 'Phạm vi Lab',
      name: 'rangeLab',
      type: 'select',
      default: props.default?.rangeLab ?? null,
      validate: { required: "Bạn chọn phạm vi bài Lab" },
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
      type: 'textarea',
      default: props.default?.description ?? null,
    },
  ];

  const dataAPI = {
    fcApi: labAPI.createLab,
  };
  return (
    <>
      <ModelForm {...res} dataForm={dataForm} dataAPI={dataAPI} />
    </>
  );
}

export default ModelNewLab;
