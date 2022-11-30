import React from 'react'
import { Stack, Grid, GridItem, Link, Text, List, ListItem } from '@chakra-ui/react'
import { newsLearn } from '../../utils/constants'

const NewsList = () => {
    return (
        <Stack direction='column' p='20px' h='100vh' bg='gray.50'>
            <Grid templateColumns='repeat(1, 1fr)' bg='white' rounded='lg' boxShadow='md' h='full'>
                <GridItem p='16px' overflowY='scroll'>
                    <Stack direction='column'>
                        <Link href='/news-list/:listId' color='blue' fontWeight={700} _hover={{ color: 'blue.500' }}>
                            <Text fontSize='lg'>Thông tin học tập</Text>
                        </Link>

                        <List>
                            {newsLearn.map((learn) => (
                                <ListItem py='12px' borderBottom='1px dashed rgba(0, 0, 0, 0.1)' key={learn.name}>
                                    <Link color='red' fontWeight={500} _hover={{ color: 'red.500' }}>
                                        {learn.name}
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

export default NewsList