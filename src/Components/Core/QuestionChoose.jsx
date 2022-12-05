import { Box, useCheckbox, useRadio } from '@chakra-ui/react';
import React from 'react';

function QuestionChoose(props) {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } = useCheckbox(props);
  return (
    <Box as="label" w="100%">
      <input {...getInputProps()} hidden />
      <Box
        {...getCheckboxProps()}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        // boxShadow="sm"
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default QuestionChoose;
