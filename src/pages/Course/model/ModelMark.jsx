import pointSubmitAPI from '../../../api/pointSubmit';
import ModelForm from '../../../Components/Core/ModelForm';

function ModelMark(props) {
  const { ...res } = props;
  console.log(props);
  const dataForm = [
    {
      id: 1,
      label: 'Điểm',
      name: 'point',
      type: 'inputNumber',
      min: 0,
      max: 10,
      default: props.default?.point,
      validate: { required: 'Bạn cần điểm' },
    },
    {
      id: 2,
      label: 'Mô tả',
      name: 'description',
      default: props.default?.description,
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
