import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function ModelForm({ id = null, isOpen, onClose, title = '', dataForm, dataAPI, slugCourse, customData }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const toast = useToast();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (file) => {
    setFiles(file);
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let formData = new FormData();

      // custom data
      if (customData) {
        Object.keys(customData).forEach((key) => {
          formData.append(key, customData[key]);
        });
      }

      // upsert
      formData.append('id', id);
      if (slugCourse) {
        formData.append('slugCourse', slugCourse);
      }
      Object.keys(data).forEach(function (k) {
        formData.append(k, data[k]);
      });
      files.forEach((file) => {
        formData.append('files[]', file);
      });
      const fetchData = await dataAPI.fcApi(formData);
      toast({
        title: 'Thông báo!',
        description: fetchData.msg,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      onClose();
    } catch (err) {
      console.log(err);
      toast({
        title: 'Thông báo!',
        description: err.response.data.msg,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      onClose();
    }
    reset();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size="2xl">
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(10deg)" />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              {dataForm?.map((form) => (
                <FormControl mb={5} key={form.id} isInvalid={errors[form.name]}>
                  <FormLabel>{form.label}</FormLabel>
                  {form.type === 'input' ? (
                    <Input
                      {...register(form.name, { value: form.default ?? null, ...(form.validate ?? null) })}
                      type={form.typeInput ?? 'text'}
                      placeholder={form.label}
                    />
                  ) : form.type === 'textarea' ? (
                    <Textarea
                      {...register(form.name, { value: form.default ?? null, ...(form.validate ?? null) })}
                      placeholder={form.label}
                      size="sm"
                      resize="vertical"
                    />
                  ) : form.type === 'inputNumber' ? (
                    <NumberInput
                      {...register(form.name, { value: form.default ?? null, ...(form.validate ?? null) })}
                      max={form.max ?? 50}
                      min={form.min ?? 1}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  ) : form.type === 'select' ? (
                    <Select
                      placeholder={form.label}
                      {...register(form.name, { value: form.default ?? null, ...(form.validate ?? null) })}
                    >
                      {form.selects.map((select, index) => (
                        <option key={index} value={select.value}>
                          {select.label}
                        </option>
                      ))}
                    </Select>
                  ) : form.type === 'component' ? (
                    <form.Component onFileChange={(files) => handleFileChange(files)} />
                  ) : null}
                  <FormErrorMessage>{errors[form.name] && errors[form.name].message}</FormErrorMessage>
                </FormControl>
              ))}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit" isLoading={loading}>
                {title}
              </Button>
              <Button variant="ghost" onClick={handleClose}>
                Đóng
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModelForm;
