import React from 'react'
import { Image, Stack, Text } from '@chakra-ui/react'

const NewsDetail = () => {
    return (
        <Stack p={5} bg='gray.50' direction={{ sm: 'column', lg: 'row' }} gap={3}>
            <Stack direction='column' gap={3} bg='white' boxShadow='md' rounded='lg'>
                <Text fontWeight={700} fontSize={20} borderBottom='1px solid black' p={3}>Sinh viên FPoly HCM thích thú tập làm phim hoạt hình tại Armada TMT</Text>

                <Stack direction='column' gap={3} p={3}>
                    <Text>Phạm Hoàng Nhân – Chàng sinh viên chuyên ngành Thiết kế đồ hoạ Cao đẳng FPT Polytechnic Cần Thơ đã xuất sắc vượt qua hàng trăm thí sinh cả nước, đạt giải Ba vòng chung kết quốc gia bảng B cuộc thi Vô địch thiết kế đồ hoạ thế giới – ACPWC 2022.</Text>

                    <Text>ACPWC – Sân chơi thiết kế đồ hoạ uy tín trên thế giới đã trải qua 4 mùa giải thành công với những dấu ấn thành tích đáng tự hào của tuổi trẻ nước nhà, cuộc thi ACPWC không chỉ là nơi thử sức với niềm đam mê thiết kế mà còn là bước đệm giúp các bạn trẻ đến với những thành công rộng mở trong công việc và học tập.</Text>

                    <Text>Cuộc thi dành cho học sinh, sinh viên độ tuổi từ 13 đến 22 với quy mô toàn cầu và thu hút hàng trăm ngàn thí sinh của gần 70 quốc gia và vùng lãnh thổ tham gia mỗi năm, các bạn sẽ có cơ hội thể hiện tài năng trong việc sử dụng phần mềm Adobe Photoshop, Adobe Illustrator và Adobe Indesign.</Text>

                    <Image src='https://caodang.fpt.edu.vn/wp-content/uploads/thong-bao-ket-qua-ACPWC-2022.jpg' />
                </Stack>
            </Stack>

            <Stack bg='white' direction='column' boxShadow='md' rounded='lg'>
                <Text fontWeight={700} fontSize={20} p={3}>Tin nổi bật</Text>

                <Stack direction='column'>
                    <Stack direction='row' p={2}>
                        <Image src='https://caodang.fpt.edu.vn/wp-content/uploads/thong-bao-ket-qua-ACPWC-2022.jpg' w={100} />

                        <Text fontWeight={500} fontSize={12}>Sinh viên FPoly HCM thích thú tập làm phim hoạt hình tại Armada TMT</Text>
                    </Stack>

                    <Stack direction='row' p={2}>
                        <Image src='https://caodang.fpt.edu.vn/wp-content/uploads/thong-bao-ket-qua-ACPWC-2022.jpg' w={100} />

                        <Text fontWeight={500} fontSize={12}>Sinh viên FPoly HCM thích thú tập làm phim hoạt hình tại Armada TMT</Text>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default NewsDetail