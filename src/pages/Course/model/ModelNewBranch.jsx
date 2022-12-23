import branchAPI from '../../../api/branchAPI';
import ModelForm from '../../../Components/Core/ModelForm';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ModelNewBranch(props) {
  const { slug } = useParams();
  const [parent, setParent] = useState();

  const { workSomeThing } = useSelector((state) => state.global);

  const { ...res } = props;
  useEffect(() => {
    const getParent = async () => {
      await branchAPI.getBySlug(slug).then((res) => {
        if (res) {
          setParent(res.id);
        }
      });
    };
    getParent();
  }, [workSomeThing]);
  const dataForm = [
    {
      id: 1,
      label: 'Tên nhánh',
      name: 'name',
      type: 'input',
      validate: { required: 'Tên nhánh không được bỏ trống' },
      default: props.default?.name ?? null,
    },
  ];

  const dataAPI = {
    fcApi: branchAPI.new,
  };

  return (
    <>
      <ModelForm
        {...res}
        dataForm={dataForm}
        dataAPI={dataAPI}
        customData={{ thumb: 'https://i.imgur.com/v4YUHjU.png', parent: parent ? parent : 0 }}
      />
    </>
  );
}

export default ModelNewBranch;
