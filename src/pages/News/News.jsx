import React from 'react'
import { Box, Grid } from '@chakra-ui/react'
import { news } from '../../utils/data'
import NewsItem from './NewsItem'

const News = () => {
    return (
        <Box p={5} bg='gray.50'>
            <Grid templateColumns={{ sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={4}>
                {news.map((news) => (
                    <NewsItem news={news} key={news.id} />
                ))}
            </Grid>
        </Box>
    )
}

export default News