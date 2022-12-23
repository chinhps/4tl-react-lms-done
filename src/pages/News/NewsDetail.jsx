import { useEffect, useState } from 'react';
import { Box, Flex, Grid, GridItem, Image, Spinner, Stack, Tag, Text, useColorModeValue } from '@chakra-ui/react';
import newsAPI from '../../api/newsAPI';
import { Link, useParams } from 'react-router-dom';
import Card from '../../Components/Core/Card/Card';
import moment from 'moment';
import { isValidHttpUrl } from '../../utils/data';
const NewsDetail = () => {
  const [post, setPost] = useState(null);
  const [allPost, setAllPost] = useState(null);
  const textColorSecondary = useColorModeValue('secondaryGray.900', 'gray.400');
  const bg = useColorModeValue('white', 'navy.700');
  const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const getPost = () => {
    newsAPI.getById(id).then((res) => {
      setPost(res);
      setLoading(true);
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
  }, [id]);

  return (
    <>
      {loading && post ? (
        <Grid gridTemplateColumns={{ base: '100%', xl: '70% 1fr' }} gap="20px">
          <GridItem>
            <Card p={10}>
              {post ? (
                <>
                  <Text fontWeight={700} fontSize={30} py={3}>
                    {post.title}
                  </Text>
                  <Text color={textColorSecondary} mt={3}>
                    {moment(post.created_at).format('DD/MM/YYYY hh:mm A')}
                  </Text>
                  <Stack direction="column" gap={3} py={3}>
                    <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                  </Stack>
                  <Image
                    src={isValidHttpUrl(post.thumb) ? post.thumb : process.env.REACT_APP_API + post.thumb}
                    rounded={'md'}
                  />
                </>
              ) : (
                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
              )}
            </Card>
          </GridItem>
          <GridItem>
            <Card>
              <Stack direction="column">
                <Text fontWeight={700} fontSize={20} p={3}>
                  Tin nổi bật
                </Text>

                <Stack direction="column">
                  {allPost ? (
                    allPost.map((item) => (
                      <Link to={`/news-detail/${item?.id}`} key={item?.id}>
                        <Card bg={bg} boxShadow={cardShadow} p="14px" flexDirection="rows" gap={3}>
                          <Image
                            src={isValidHttpUrl(item.thumb) ? item.thumb : process.env.REACT_APP_API + item.thumb}
                            w="150px"
                            height="100px"
                            objectFit="cover"
                            borderRadius="8px"
                          />

                          <Box display="flex" flexDirection={'column'} justifyContent="center">
                            <Text fontWeight={500} fontSize={18} noOfLines={1}>
                              {item?.title}
                            </Text>
                            <Text color={textColorSecondary} fontSize={14}>
                              {moment(item?.created_at).format('DD/MM/YYYY hh:mm A')}
                            </Text>
                          </Box>
                        </Card>
                      </Link>
                    ))
                  ) : (
                    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
                  )}
                </Stack>
              </Stack>
            </Card>
          </GridItem>
        </Grid>
      ) : (
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      )}
    </>
  );
};

export default NewsDetail;
