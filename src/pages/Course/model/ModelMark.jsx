import pointSubmitAPI from '../../../api/pointSubmit';
import ModelForm from '../../../Components/Core/ModelForm';

function ModelMark(props) {
  const { ...res } = props;
  const dataForm = [
    {
      id: 1,
      label: 'Điểm',
      name: 'point',
      type: 'inputNumber',
      min: 0,
      max: 10,
      default: props.default?.point ?? null,
      validate: { required: 'Bạn cần điểm' },
    },
    {
      id: 2,
      label: 'Mô tả',
      name: 'description',
      default: props.default?.description ?? null,
      type: 'textarea',
    },
  ];

  const dataAPI = {
    fcApi: pointSubmitAPI.setPointSubmit,
  };

  return (
    <>
      <ModelForm {...res} dataForm={dataForm} dataAPI={dataAPI} />
    </>
  );
}

export default ModelMark;
