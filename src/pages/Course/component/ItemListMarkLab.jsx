import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useColorModeValue,
  Text,
  Badge,
  Button,
  Flex,
  Box,
  IconButton,
  useDisclosure,
  useToast,
  Stack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';

function ItemListMarkLab({ vl, setIdDelete, onOpenDelete, handleMark, handleDownloadLab, isOpenMark }) {
  // loading
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setIsEdit(false);
  }, [isOpenMark]);
  return (
    <>
      <Tr key={vl.id}>
        <Td>{vl.user_code}</Td>
        <Td>{vl.name}</Td>
        <Td>{vl.name_submit}</Td>
        <Td>{vl.count_submit}</Td>
        <Td>{vl.point ?? 'Chưa chấm'}</Td>
        <Td>
          <Flex flexDirection="column" gap={2}>
            {vl.content.map((value, i) => (
              <Badge
                key={i}
                colorScheme="red"
                cursor="pointer"
                onClick={() => handleDownloadLab(value.link, value.name)}
              >
                {value.name}
              </Badge>
            ))}
          </Flex>
        </Td>
        <Td>
          <Badge colorScheme={vl.note === 'Failed' ? 'red' : 'green'}>{vl.note}</Badge>
        </Td>
        <Td>
          <Flex flexDirection="column" gap={2}>
            <IconButton
              icon={<FiEdit3 />}
              isLoading={isEdit}
              onClick={() => {
                handleMark(vl.id);
                setIsEdit(true);
              }}
            />
            <IconButton
              icon={<FiTrash2 />}
              onClick={() => {
                setIdDelete(vl.id);
                onOpenDelete();
              }}
            />
          </Flex>
        </Td>
      </Tr>
    </>
  );
}

export default ItemListMarkLab;
