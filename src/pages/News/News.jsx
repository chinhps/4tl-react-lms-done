import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import newsAPI from '../../api/newsAPI';
import BoxCollection from '../../Components/Core/Card/BoxCollection';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../Components/Core/Card/Card';
import { useSelector } from 'react-redux';
import { userSelector } from '../../selectors';
import CreateNews from './CreateNews';

const News = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState();
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const user = useSelector(userSelector);
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();

  useEffect(() => {
    const getNew = () => {
      newsAPI.getAll(999).then((res) => {
        setNews(res);
      });
    };
    getNew();
  }, []);
  return (
    <Card>
      {isOpenModal ? (
        <Modal isOpen={isOpenModal} onClose={onCloseModal} size="5xl">
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <CreateNews />
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : null}
      <Flex justifyContent="space-between">
        <Text color={textColorPrimary} fontWeight="bold" fontSize="2xl" mt="10px" mb={3}>
          Tất cả tin tức
        </Text>

        {user.role.role_code === 'ADMIN' ? (
          <Button colorScheme="teal" variant="action" marginBottom={'-5%'} onClick={onOpenModal}>
            Thêm mới
          </Button>
        ) : null}
      </Flex>

      <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: 4, '2xl': 5 }} gap="20px">
        {news ? (
          news.map((vl, index) => (
            <Box
              key={index}
              onClick={() => {
                navigate(`/news-detail/${vl.id}`);
              }}
            >
              <BoxCollection name={vl.title} time={vl.created_at} bidders={[]} image={vl.thumb} />
            </Box>
          ))
        ) : (
          <></>
        )}
      </SimpleGrid>
    </Card>
  );
};

export default News;
