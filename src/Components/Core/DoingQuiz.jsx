import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { chakra } from '@chakra-ui/react';
import { useState } from 'react';

function DoingQuiz() {
  const [tabIndex, setTabIndex] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState([
    {
      id: 0,
      answer: 0,
    },
    {
      id: 0,
      answer: 0,
    },
    {
      id: 0,
      answer: 0,
    },
    {
      id: 0,
      answer: 0,
    },
    {
      id: 0,
      answer: 0,
    },
    {
      id: 0,
      answer: 0,
    },
    {
      id: 0,
      answer: 0,
    },
    {
      id: 0,
      answer: 0,
    },
    {
      id: 0,
      answer: 0,
    },
    {
      id: 0,
      answer: 0,
    },
  ]);
  const handleSubmit = () => {
    console.log(studentAnswer);
  };
  let button = 0;
  switch (tabIndex) {
    case 0:
      button = (
        <Box>
          <Button
            colorScheme="teal"
            variant="outline"
            margin={'5px'}
            w={'90px'}
            onClick={() => setTabIndex(tabIndex + 1)}
          >
            Tiếp
          </Button>
        </Box>
      );
      break;
    case 9:
      button = (
        <Box>
          <Button
            colorScheme="teal"
            variant="outline"
            w={'90px'}
            margin={'5px'}
            onClick={() => setTabIndex(tabIndex - 1)}
          >
            Trước
          </Button>
          <Button colorScheme="teal" variant="outline" w={'90px'} margin={'5px'} onClick={handleSubmit}>
            Nộp bài
          </Button>
        </Box>
      );
      break;
    default:
      button = (
        <Box>
          <Button
            colorScheme="teal"
            variant="outline"
            w={'90px'}
            margin={'5px'}
            onClick={() => setTabIndex(tabIndex - 1)}
          >
            Trước
          </Button>
          <Button
            colorScheme="teal"
            variant="outline"
            w={'90px'}
            margin={'5px'}
            onClick={() => setTabIndex(tabIndex + 1)}
          >
            Tiếp
          </Button>
        </Box>
      );
      break;
  }

  return (
    <Box w="100%" p={4} color="black" textAlign={'center'}>
      <chakra.h1 fontSize="lg"> 15 phút </chakra.h1>
      <Box bg={''} margin={5} padding={5} borderRadius={5}>
        <Tabs
          flex={3}
          bg={'#f9f9f9'}
          borderRadius={'3px'}
          p={'10px'}
          index={tabIndex}
          onChange={(index) => setTabIndex(index)}
        >
          <TabList>
            <Tab>Câu 1</Tab>
            <Tab>Câu 2</Tab>
            <Tab>Câu 3</Tab>
            <Tab>Câu 4</Tab>
            <Tab>Câu 5</Tab>
            <Tab>Câu 6</Tab>
            <Tab>Câu 7</Tab>
            <Tab>Câu 8</Tab>
            <Tab>Câu 9</Tab>
            <Tab>Câu 10</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <FormControl as="fieldset">
                <FormLabel as="legend">Favorite</FormLabel>
                <RadioGroup
                  defaultValue=""
                  onChange={(value) =>
                    setStudentAnswer((prevState) => {
                      prevState[0] = { id: 0, answer: value };
                      return prevState;
                    })
                  }
                >
                  <VStack spacing="10px" alignItems={'flex-start'}>
                    <Radio value="Sasuke" borderColor={'#d9d9d9'}>
                      Sasuke
                    </Radio>
                    <Radio value="Nagato" borderColor={'#d9d9d9'}>
                      Nagato
                    </Radio>
                    <Radio value="Itachi" borderColor={'#d9d9d9'}>
                      Itachi
                    </Radio>
                    <Radio value="Sage of the six Paths" borderColor={'#d9d9d9'}>
                      Sage of the six Paths
                    </Radio>
                  </VStack>
                </RadioGroup>
              </FormControl>
            </TabPanel>
            <TabPanel>
              <FormControl as="fieldset">
                <FormLabel as="legend">Favorite Naruto Character</FormLabel>
                <RadioGroup
                  defaultValue=""
                  onChange={(value) =>
                    setStudentAnswer((prevState) => {
                      prevState[1] = { id: 0, answer: value };
                      return prevState;
                    })
                  }
                >
                  <VStack spacing="10px" alignItems={'flex-start'}>
                    <Radio value="Sasuke" borderColor={'#d9d9d9'}>
                      Sasuke
                    </Radio>
                    <Radio value="Nagato" borderColor={'#d9d9d9'}>
                      Nagato
                    </Radio>
                    <Radio value="Itachi" borderColor={'#d9d9d9'}>
                      Itachi
                    </Radio>
                    <Radio value="Sage of the six Paths" borderColor={'#d9d9d9'}>
                      Sage of the six Paths
                    </Radio>
                  </VStack>
                </RadioGroup>
              </FormControl>
            </TabPanel>
            <TabPanel>
              <FormControl as="fieldset">
                <FormLabel as="legend">Favorite Naruto Character</FormLabel>
                <RadioGroup
                  defaultValue=""
                  onChange={(value) =>
                    setStudentAnswer((prevState) => {
                      prevState[2] = { id: 0, answer: value };
                      return prevState;
                    })
                  }
                >
                  <VStack spacing="10px" alignItems={'flex-start'}>
                    <Radio value="Sasuke" borderColor={'#d9d9d9'}>
                      Sasuke
                    </Radio>
                    <Radio value="Nagato" borderColor={'#d9d9d9'}>
                      Nagato
                    </Radio>
                    <Radio value="Itachi" borderColor={'#d9d9d9'}>
                      Itachi
                    </Radio>
                    <Radio value="Sage of the six Paths" borderColor={'#d9d9d9'}>
                      Sage of the six Paths
                    </Radio>
                  </VStack>
                </RadioGroup>
              </FormControl>
            </TabPanel>
            <TabPanel>
              <FormControl as="fieldset">
                <FormLabel as="legend">Favorite Naruto Character</FormLabel>
                <RadioGroup
                  defaultValue=""
                  onChange={(value) =>
                    setStudentAnswer((prevState) => {
                      prevState[3] = { id: 0, answer: value };
                      return prevState;
                    })
                  }
                >
                  <VStack spacing="10px" alignItems={'flex-start'}>
                    <Radio value="Sasuke" borderColor={'#d9d9d9'}>
                      Sasuke
                    </Radio>
                    <Radio value="Nagato" borderColor={'#d9d9d9'}>
                      Nagato
                    </Radio>
                    <Radio value="Itachi" borderColor={'#d9d9d9'}>
                      Itachi
                    </Radio>
                    <Radio value="Sage of the six Paths" borderColor={'#d9d9d9'}>
                      Sage of the six Paths
                    </Radio>
                  </VStack>
                </RadioGroup>
              </FormControl>
            </TabPanel>
            <TabPanel>
              <FormControl as="fieldset">
                <FormLabel as="legend">Favorite Naruto Character</FormLabel>
                <RadioGroup
                  defaultValue=""
                  onChange={(value) =>
                    setStudentAnswer((prevState) => {
                      prevState[4] = { id: 0, answer: value };
                      return prevState;
                    })
                  }
                >
                  <VStack spacing="10px" alignItems={'flex-start'}>
                    <Radio value="Sasuke" borderColor={'#d9d9d9'}>
                      Sasuke
                    </Radio>
                    <Radio value="Nagato" borderColor={'#d9d9d9'}>
                      Nagato
                    </Radio>
                    <Radio value="Itachi" borderColor={'#d9d9d9'}>
                      Itachi
                    </Radio>
                    <Radio value="Sage of the six Paths" borderColor={'#d9d9d9'}>
                      Sage of the six Paths
                    </Radio>
                  </VStack>
                </RadioGroup>
              </FormControl>
            </TabPanel>
            <TabPanel>
              <FormControl as="fieldset">
                <FormLabel as="legend">Favorite Naruto Character</FormLabel>
                <RadioGroup
                  defaultValue=""
                  onChange={(value) =>
                    setStudentAnswer((prevState) => {
                      prevState[5] = { id: 0, answer: value };
                      return prevState;
                    })
                  }
                >
                  <VStack spacing="10px" alignItems={'flex-start'}>
                    <Radio value="Sasuke" borderColor={'#d9d9d9'}>
                      Sasuke
                    </Radio>
                    <Radio value="Nagato" borderColor={'#d9d9d9'}>
                      Nagato
                    </Radio>
                    <Radio value="Itachi" borderColor={'#d9d9d9'}>
                      Itachi
                    </Radio>
                    <Radio value="Sage of the six Paths" borderColor={'#d9d9d9'}>
                      Sage of the six Paths
                    </Radio>
                  </VStack>
                </RadioGroup>
              </FormControl>
            </TabPanel>
            <TabPanel>
              <FormControl as="fieldset">
                <FormLabel as="legend">Favorite Naruto Character</FormLabel>
                <RadioGroup
                  defaultValue=""
                  onChange={(value) =>
                    setStudentAnswer((prevState) => {
                      prevState[6] = { id: 0, answer: value };
                      return prevState;
                    })
                  }
                >
                  <VStack spacing="10px" alignItems={'flex-start'}>
                    <Radio value="Sasuke" borderColor={'#d9d9d9'}>
                      Sasuke
                    </Radio>
                    <Radio value="Nagato" borderColor={'#d9d9d9'}>
                      Nagato
                    </Radio>
                    <Radio value="Itachi" borderColor={'#d9d9d9'}>
                      Itachi
                    </Radio>
                    <Radio value="Sage of the six Paths" borderColor={'#d9d9d9'}>
                      Sage of the six Paths
                    </Radio>
                  </VStack>
                </RadioGroup>
              </FormControl>
            </TabPanel>
            <TabPanel>
              <FormControl as="fieldset">
                <FormLabel as="legend">Favorite Naruto Character</FormLabel>
                <RadioGroup
                  defaultValue=""
                  onChange={(value) =>
                    setStudentAnswer((prevState) => {
                      prevState[7] = { id: 0, answer: value };
                      return prevState;
                    })
                  }
                >
                  <VStack spacing="10px" alignItems={'flex-start'}>
                    <Radio value="Sasuke" borderColor={'#d9d9d9'}>
                      Sasuke
                    </Radio>
                    <Radio value="Nagato" borderColor={'#d9d9d9'}>
                      Nagato
                    </Radio>
                    <Radio value="Itachi" borderColor={'#d9d9d9'}>
                      Itachi
                    </Radio>
                    <Radio value="Sage of the six Paths" borderColor={'#d9d9d9'}>
                      Sage of the six Paths
                    </Radio>
                  </VStack>
                </RadioGroup>
              </FormControl>
            </TabPanel>
            <TabPanel>
              <FormControl as="fieldset">
                <FormLabel as="legend">Favorite Naruto Character</FormLabel>
                <RadioGroup
                  defaultValue=""
                  onChange={(value) =>
                    setStudentAnswer((prevState) => {
                      prevState[8] = { id: 0, answer: value };
                      return prevState;
                    })
                  }
                >
                  <VStack spacing="10px" alignItems={'flex-start'}>
                    <Radio value="Sasuke" borderColor={'#d9d9d9'}>
                      Sasuke
                    </Radio>
                    <Radio value="Nagato" borderColor={'#d9d9d9'}>
                      Nagato
                    </Radio>
                    <Radio value="Itachi" borderColor={'#d9d9d9'}>
                      Itachi
                    </Radio>
                    <Radio value="Sage of the six Paths" borderColor={'#d9d9d9'}>
                      Sage of the six Paths
                    </Radio>
                  </VStack>
                </RadioGroup>
              </FormControl>
            </TabPanel>
            <TabPanel>
              <FormControl as="fieldset">
                <FormLabel as="legend">Favorite Naruto Character</FormLabel>
                <RadioGroup
                  defaultValue=""
                  onChange={(value) =>
                    setStudentAnswer((prevState) => {
                      prevState[9] = { id: 0, answer: value };
                      return prevState;
                    })
                  }
                >
                  <VStack spacing="10px" alignItems={'flex-start'}>
                    <Radio value="Sasuke" borderColor={'#d9d9d9'}>
                      Sasuke
                    </Radio>
                    <Radio value="Nagato" borderColor={'#d9d9d9'}>
                      Nagato
                    </Radio>
                    <Radio value="Itachi" borderColor={'#d9d9d9'}>
                      Itachi
                    </Radio>
                    <Radio value="Sage of the six Paths" borderColor={'#d9d9d9'}>
                      Sage of the six Paths
                    </Radio>
                  </VStack>
                </RadioGroup>
              </FormControl>
            </TabPanel>
          </TabPanels>
          {button}
        </Tabs>
      </Box>
    </Box>
  );
}

export default DoingQuiz;
