import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Image, Input, Stack, Text, Button } from '@chakra-ui/react'
import uploadImg from '../../assets/images/upload/cloud-upload-regular-240.png'
import { AiFillCloseCircle } from 'react-icons/ai'
import { imgConfig } from '../../utils/constants'

const DropZone = props => {
    const [fileList, setFileList] = useState([])
    const handleFileDrop = (e) => {
        const file = e.target.files[0]

        if (file) {
            const updatedList = [...fileList, file]
            setFileList(updatedList)
            props.onFileChange(updatedList)
        }
    }
    const fileRemove = (file) => {
        const updatedList = [...fileList]
        updatedList.splice(fileList.indexOf(file), 1)
        setFileList(updatedList)
        props.onFileChange(updatedList)
    }

    return (
        <>
            <Box position='relative' w='full'>
                <Stack direction='column' justify='center' align='center' border='2px dashed #4267B2' bg='#F5F8FF'>
                    <Image src={uploadImg} alt='upload-file' w='100px' />

                    <Text>Click vào đây để tải file của bạn lên</Text>
                </Stack>

                <Input 
                    position='absolute'
                    type='file'
                    top='0'
                    w='full'
                    h='full'
                    opacity='0'
                    cursor='pointer'
                    outline='none'
                    onChange={handleFileDrop}
                />
            </Box>

            {fileList.length > 0 ? (
                <Stack direction='column' justify='start' align='start' w='full'>
                    <Text fontWeight={500} fontSize='lg'>
                        File đã chọn
                    </Text>

                    {fileList.map((item, index) => (
                        <Stack position='relative' direction='row' justify='start' align='center' gap='20px' bg='#F5F8FF' w='full' p='3' rounded='lg' key={index}>
                            <Image src={imgConfig[item.type.split('/')[1]] || imgConfig['default']} alt={item.name} w='50px' />

                            <Stack direction='column' justify='start' align='start'>
                                <Text>{item.name}</Text>

                                <Text>{item.size}B</Text>
                            </Stack>

                            <AiFillCloseCircle 
                                fontSize={36}
                                style={{ position: 'absolute', right: '0', color: 'red', margin: '10px', opacity: '1' }}
                                onClick={() => fileRemove(item)}
                            />
                        </Stack>
                    ))}

                    <Box textAlign='center' w='full'>
                        <Button mt='30px' bg='#28A745' color='white' _hover={{ bg: 'green.400' }}>
                            Upload
                        </Button>
                    </Box>
                </Stack>
            ) : null}
        </>
    )
}

DropZone.propTypes = {
    onFileChange: PropTypes.func
}

export default DropZone