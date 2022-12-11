import { useEffect, useState } from 'react';
import { Box, Flex, Grid, GridItem, Image, Spinner, Stack, Tag, Text } from '@chakra-ui/react';
import newsAPI from '../../api/newsAPI';
import { Link, useParams } from 'react-router-dom';
import Card from '../../Components/Core/Card/Card';
import moment from 'moment';
const NewsDetail = () => {
  const [post, setPost] = useState(null);
  const [allPost, setAllPost] = useState(null);

  const { id } = useParams();
  const getPost = () => {
    newsAPI.getById(id).then((res) => {
      setPost(res);
    });
  };

  const getAllPost = () => {
    newsAPI.getAll(99).then((res) => {
      setAllPost(res);
    });
  };
  useEffect(() => {
    getPost();
    getAllPost();
  }, []);

  return (
    <Card>
      <Grid gridTemplateColumns={{ base: '100%', xl: '70% 30%' }} gap={6}>
        <GridItem>
          <Stack direction="column" gap={3}>
            <Text fontWeight={700} fontSize={20} borderBottom="1px solid black" p={3}>
              {post?.title}
            </Text>
            <Flex gap={5}>
              <Tag w="100px" justifyContent={'center'} colorScheme="teal">
                {moment(post?.created_at).format('DD/MM/YYYY')}
              </Tag>
              <Tag w="100px" justifyContent={'center'} colorScheme="teal">
                {moment(post?.created_at).format('hh:mm:ss')}
              </Tag>
            </Flex>
            <Stack direction="column" gap={3} p={3}>
              <Text>{post?.content}</Text>
            </Stack>
            <Image src={post?.thumb} rounded={'md'} />
          </Stack>
        </GridItem>
        <GridItem>
          <Stack direction="column">
            <Text fontWeight={700} fontSize={20} p={3}>
              Tin nổi bật
            </Text>

            <Stack direction="column">
              {allPost ? (
                allPost.map((item) => (
                  <Link to={`/news-detail/${item?.id}`} key={item?.id}>
                    <Stack direction="row" p={2}>
                      <Image src={item?.thumb} w={100} rounded={'md'} />

                      <Box display="flex" flexDirection={'column'}>
                        <Text fontWeight={500} fontSize={12} noOfLines={1}>
                          {item?.title}
                        </Text>
                        <Tag justifyContent={'center'} colorScheme="teal">
                          {item?.created_at}
                        </Tag>
                      </Box>
                    </Stack>
                  </Link>
                ))
              ) : (
                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
              )}
            </Stack>
          </Stack>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default NewsDetail;
