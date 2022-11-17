import { Box, ChakraProvider, Stack, Text, Image, Input, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import uploadImage from './assets/cloud-upload-regular-240.png'
import { AiFillCloseCircle } from 'react-icons/ai'

const FileUpload = () => {
    const [fileList, setFileList] = useState([])
    const handleFileDrop = (e) => {
    const file = e.target.files[0]
        if (file) {
            const updateList = [...fileList, file]
            setFileList(updateList)
        }
    }

    return (
        <ChakraProvider>
            <Stack direction='row' justify='center' align='center' h='100vh'>
                <Stack direction='column' justify='center' align='center' bg='white' boxShadow='md' p='30px' w='80%'>
                    <Text fontWeight='700' fontSize='3xl'>Chọn file để tải lên</Text>

                    <Box mt='30px' position='relative' w='100%'>
                        <Stack border='2px dashed #4267b2' direction='column' justify='center' align='center' bg='#f5f8ff' h='250px'>
                        <Image src={uploadImage} alt='upload' w='100px' />
                        <Text>Click vào đây để tải file của bạn lên</Text>
                        </Stack>

                        <Input type='file' position='absolute' top='0' left='0' opacity='0' w='100%' h='100%' value='' cursor='pointer' onChange={handleFileDrop} />
                    </Box>

                    {fileList.length > 0 ? (
                        <Stack direction='column' justify='start' align='start' w='100%'>
                            <Text fontWeight='500' fontSize='2xl'>File đã chọn</Text>

                            {fileList.map((file, index) => (
                                <Stack key={index} position='relative' direction='row' justify='start' align='center' gap='20px' bg='#f5f8ff' w='100%' p='3' rounded='lg'>
                                <Image src={uploadImage} alt='upload' w='50px' />

                                <Stack direction='column' justify='start' align='start'>
                                    <Text>{file.name}</Text>
                                    <Text>{file.size}B</Text>
                                </Stack>

                                <AiFillCloseCircle fontSize={36} style={{ position: 'absolute', right: '0', color: 'red', margin: '10px', opacity: '0' }} />
                                </Stack>
                            ))}

                            <Box textAlign='center' w='100%'>
                                <Button mt='30px' bg='#28a745' color='white' _hover={{bg: 'green.400'}}>Upload</Button>
                            </Box>
                        </Stack>
                    ) : null}
                </Stack>
            </Stack>
        </ChakraProvider>
    )
}

export default FileUpload