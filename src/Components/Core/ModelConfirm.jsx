import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';

function ModelConfirm({ id = null, isOpen, onClose, description, handleConfirm, isLoading }) {
  const cancelRef = useRef();

  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Bạn Có chắc muốn xóa?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{description ?? ''}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Hủy
            </Button>
            <Button colorScheme="red" ml={3} onClick={() => handleConfirm(id)} isLoading={isLoading}>
              Xóa
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ModelConfirm;
