// Chakra imports
import { Button, Flex, Grid, Spinner, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react';
// Custom components
import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../../Components/Core/Card/Card';
import ModelNewBranch from '../../Course/model/ModelNewBranch';
import Project from './Project';
import { userSelector } from '../../../selectors';

export default function Projects({ title, data, pendingBranch }) {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';

  const user = useSelector(userSelector);
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
  return (
    <Card mb={{ base: '0px', '2xl': '20px' }}>
      {isOpenModal ? (
        <ModelNewBranch title="Thêm mới nhánh" isOpen={isOpenModal} onClose={onCloseModal} />
      ) : null}
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text color={textColorPrimary} fontWeight="bold" fontSize="2xl" mt="10px" mb="4px">
          {title}
        </Text>
        {user.role.role_code === 'ADMIN' ? (
          <Button colorScheme="teal" variant="action" marginBottom={'-5%'} onClick={onOpenModal}>
            Thêm nhánh mới
          </Button>
        ) : null}
      </Flex>
      <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
        Nơi tham gia các lớp học hoặc lấy tài liệu học tập.
      </Text>
      <Grid
        gridTemplateColumns={{ xl: `repeat(${data.length > 6 ? 2 : 1}, 1fr)`, sm: '1fr 0.46fr' }}
        gap={{ base: '20px', xl: '20px' }}
        display={{ base: 'block', xl: 'grid' }}
      >
        {!pendingBranch ? (
          data.map((project, i) => (
            <Project key={i} data={project} image={project.thumb} link={project.slug} title={project.name} />
          ))
        ) : (
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        )}
      </Grid>
    </Card>
  );
}
