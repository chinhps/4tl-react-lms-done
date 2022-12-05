import { Box, Flex, Grid, Link, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import newsAPI from '../../api/newsAPI';
import React, { useEffect } from 'react';
import Banner from '../../Components/Core/Banner';
import BoxCollection from '../../Components/Core/Card/BoxCollection';
import MiniCalendar from '../../Components/Core/MiniCalendar/MiniCalendar';
import HistoryCourse from '../../Components/Core/Table/HistoryCourse';

function Home() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const [news, setNews] = useState([]);

  useEffect(() => {
    newsAPI.getAll(3).then((data) => {
      setNews(data);
    });
  }, []);

  return (
    <>
      <Box>
        {/* Main Fields */}
        <Grid
          gridTemplateColumns={{ xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr' }}
          gap={{ base: '20px', xl: '20px' }}
          display={{ base: 'block', xl: 'grid' }}
        >
          <Flex flexDirection="column" gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2' }}>
            <Banner />
            <Flex direction="column">
              <Flex
                mt="45px"
                mb="20px"
                justifyContent="space-between"
                direction={{ base: 'column', md: 'row' }}
                align={{ base: 'start', md: 'center' }}
              >
                <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
                  Tin tức 4TL
                </Text>
              </Flex>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
                {news.map((vl, index) => (
                  <BoxCollection
                    key={index}
                    name={vl.title}
                    author={vl.user_id}
                    bidders={[]}
                    image={vl.thumb}
                  />
                ))}
              </SimpleGrid>
            </Flex>
          </Flex>
          <Flex flexDirection="column" gap="20px">
            <Flex flexDirection="column">
              <HistoryCourse />
            </Flex>
            <Flex flexDirection="column">
              <MiniCalendar minW="100%" selectRange={false} />
            </Flex>
          </Flex>
        </Grid>
      </Box>
    </>
  );
}

export default Home;
