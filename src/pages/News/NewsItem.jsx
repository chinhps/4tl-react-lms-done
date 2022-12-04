import React from 'react'
import { GridItem, Stack, Link, Image, Text } from '@chakra-ui/react'

const NewsItem = ({ news }) => {
    return (
        <GridItem bg='white' rounded='lg' boxShadow='md' p={3} key={news.id}>
            <Stack direction='column' gap={2}>
                <Link href={`/news-detail/${news.id}`} rounded='lg' overflow='hidden'>
                    <Image src={news.image} alt='news' w='full' h='160px' />
                </Link>

                <Link href={`/news-detail/${news.id}`} color='black' _hover={{ color: 'blue.500' }}>
                    <Text fontWeight={700} fontSize={16} noOfLines={2}>{news.name}</Text>
                </Link>
            </Stack>
        </GridItem>
    )
}

export default NewsItem