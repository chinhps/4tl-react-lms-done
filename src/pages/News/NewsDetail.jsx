import React from 'react'
import { Stack, Text, Box } from '@chakra-ui/react'

const NewsDetail = () => {
    return (
        <Stack direction='column' p='20px' bg='gray.50' h='100vh'>
            <Stack direction='column' bg='white' boxShadow='md' h='full'>
                <Box borderBottom='1px solid rgba(0, 0, 0, 0.1)' p='12px'>
                    <Text fontSize='lg'>🥇 P.KHẢO THÍ_THÔNG TIN QUAN TRỌNG VỀ THI TẬP TRUNG MÔN PHÁP LUẬT, TIẾNG ANH, CHÍNH TRỊ</Text>
                </Box>

                <Stack p='12px'>
                    <Text>
                        box noi dung
                    </Text>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default NewsDetail