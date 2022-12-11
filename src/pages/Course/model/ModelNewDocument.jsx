import documentAPI from "../../../api/documentAPI";
import ModelForm from "../../../Components/Core/ModelForm";
import DropZone from "../Lab/DropZone";

function ModelNewDocument(props) {
  const {...res} = props;
  const dataForm = [
    {
      id: 1,
      label: "Tên tài liệu",
      name: "nameDocument",
      type: "input",
      default: props.default?.nameDocument ?? null,
      validate: { required: "Bạn cần nhập tên tài liệu" }
    },
    {
      id: 2,
      label: "Phạm vi tài liệu",
      name: "rangeDocument",
      type: "select",
      default: props.default?.rangeDocument ?? null,
      validate: { required: "Bạn cần chọn phạm vi" },
      selects: [
        {
          label: "Riêng lớp học",
          value: "courses"
        },
        {
          label: "Tất cả lớp có môn học này",
          value: "subjects"
        }
      ]
    },
    {
      id: 3,
      label: 'Mô tả',
      name: 'description',
      default: props.default?.description ?? null,
      type: 'textarea',
    },
    {
      id: 4,
      label: "Tài liệu",
      name: "document",
      type: "component",
      Component: DropZone
    },
  ];

  const dataAPI = {
    fcApi: documentAPI.createDocument
  };

  return (
    <>
      <ModelForm {...res} dataForm={dataForm} dataAPI={dataAPI} />
    </>
  );
}

export default ModelNewDocument;
