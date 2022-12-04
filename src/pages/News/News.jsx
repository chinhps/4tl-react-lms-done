import React, { useEffect, useState } from 'react';
import { Box, Grid, SimpleGrid } from '@chakra-ui/react';

import newsAPI from '../../api/newsAPI';
import BoxCollection from '../../Components/Core/Card/BoxCollection';
import { Link, useNavigate } from 'react-router-dom';

const News = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState();
  useEffect(() => {
    const getNew = () => {
      newsAPI.getAll(999).then((res) => {
        setNews(res);
      });
    };
    getNew();
  }, []);
  return (
    <Box p={5} bg="gray.50">
      {/* <Grid templateColumns={{ sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={4}>
        {news ? news.map((news) => <NewsItem news={news} key={news.id} />) : <></>}
      </Grid> */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
        {news ? (
          news.map((vl, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/news-detail/${vl.id}`);
              }}
            >
              <BoxCollection name={vl.title} author={vl.user_id} bidders={[]} image={vl.thumb} />
            </div>
          ))
        ) : (
          <></>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default News;
