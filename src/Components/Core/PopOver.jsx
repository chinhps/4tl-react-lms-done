import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
} from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';
const PopOver = ({ courseName, courseDetail, isOpen, onClose, setIsYes }) => {
    // const navigate = useNavigate();
    // navigate(`/course/${id}`);

    const handleYes = () => {};
    const handleClose = () => {
        onClose();
    };
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{courseName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>{courseDetail}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => setIsYes(true)}>
                            Tham gia
                        </Button>
                        <Button variant="ghost" onClick={handleClose}>
                            Hủy
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default PopOver;
