import React from 'react'
import { Link, Grid, GridItem, Stack, List, ListItem, Text } from '@chakra-ui/react'
import { newsActivity, newsFee, newsLearn, newsWork } from '../../utils/constants'

const News = () => {
    return (
        <Stack direction='column' p='20px' h='100vh' bg='gray.50'>
            <Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} boxShadow='md' rounded='lg' bg='white' h='full'>
                <GridItem p='16px' overflowY='scroll' borderRight={{ sm: 'none', md: '1px solid black', lg: '1px solid black' }} className='hide-scrollbar'>
                    <Stack direction='column'>
                        <Link href='/news-list/:listId' color='blue' fontWeight={700} _hover={{ color: 'blue.500' }}>
                            <Text fontSize='lg'>Thông tin học tập</Text>
                        </Link>

                        <List>
                            {newsLearn.map((learn) => (
                                <ListItem py='12px' borderBottom='1px dashed rgba(0, 0, 0, 0.1)' key={learn.name}>
                                    <Link href={`/news-detail/${learn.name}`} color='red' fontWeight={500} _hover={{ color: 'red.500' }}>
                                        {learn.name}
                                    </Link>
                                </ListItem>
                            ))} 
                        </List>
                    </Stack>
                </GridItem>
                <GridItem p='16px' overflowY='scroll' borderRight={{ sm: 'none', md: '1px solid black' }} className='hide-scrollbar'>
                    <Stack direction='column'>
                        <Link href='/news-list/:listId' color='blue' fontWeight={700} _hover={{ color: 'blue.500' }}>
                            <Text fontSize='lg'>Thông tin hoạt động</Text>
                        </Link>

                        <List>
                            {newsActivity.map((activity) => (
                                <ListItem py='12px' borderBottom='1px dashed rgba(0, 0, 0, 0.1)' key={activity.name}>
                                    <Link href={`/news-detail/${activity.name}`} color='red' fontWeight={500} _hover={{ color: 'red.500' }}>
                                        {activity.name}
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </Stack>
                </GridItem>
                <GridItem p='16px' overflowY='scroll' borderRight={{ sm: 'none', md: '1px solid black' }} className='hide-scrollbar'>
                    <Stack direction='column'>
                        <Link href='/news-list/:listId' color='blue' fontWeight={700} _hover={{ color: 'blue.500' }}>
                            <Text fontSize='lg'>Thông tin học phí</Text>
                        </Link>

                        <List>
                            {newsFee.map((fee) => (
                                <ListItem py='12px' borderBottom='1px dashed rgba(0, 0, 0, 0.1)' key={fee.name}>
                                    <Link href={`/news-detail/${fee.name}`} color='red' fontWeight={500} _hover={{ color: 'red.500' }}>
                                        {fee.name}
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </Stack>
                </GridItem>
                <GridItem p='16px' overflowY='scroll' className='hide-scrollbar'>
                    <Stack direction='column'>
                        <Link href='/news-list/:listId' color='blue' fontWeight={700} _hover={{ color: 'blue.500' }}>
                            <Text fontSize='lg'>Thông tin việc làm</Text>
                        </Link>

                        <List>
                            {newsWork.map((work) => (
                                <ListItem py='12px' borderBottom='1px dashed rgba(0, 0, 0, 0.1)' key={work.name}>
                                    <Link href={`/news-detail/${work.name}`} color='red' fontWeight={500} _hover={{ color: 'red.500' }}>
                                        {work.name}
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </Stack>
                </GridItem>
            </Grid>
        </Stack>
    )
}

export default News