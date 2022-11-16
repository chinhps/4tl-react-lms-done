import { Box, Flex, Grid, Link, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import Banner from '../../Components/Core/Banner';
import BoxCollection from '../../Components/Core/Card/BoxCollection';

function Home() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  useEffect(() => {
    let data = axiosClient.get('https://api2.chinh.dev/api/users');
    console.log(data);
  },[]);
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
                  Trending NFTs
                </Text>
                <Flex align="center" me="20px" ms={{ base: '24px', md: '0px' }} mt={{ base: '20px', md: '0px' }}>
                  <Link color={textColorBrand} fontWeight="500" me={{ base: '34px', md: '44px' }} to="#art">
                    Art
                  </Link>
                  <Link color={textColorBrand} fontWeight="500" me={{ base: '34px', md: '44px' }} to="#music">
                    Music
                  </Link>
                  <Link color={textColorBrand} fontWeight="500" me={{ base: '34px', md: '44px' }} to="#collectibles">
                    Collectibles
                  </Link>
                  <Link color={textColorBrand} fontWeight="500" to="#sports">
                    Sports
                  </Link>
                </Flex>
              </Flex>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
                <BoxCollection
                  name="Abstract Colors"
                  author="By Esthera Jackson"
                  bidders={['https://i.imgur.com/v4YUHjU.png', 'https://i.imgur.com/v4YUHjU.png']}
                  image={'https://i.imgur.com/v4YUHjU.png'}
                  currentbid="0.91 ETH"
                  download="#"
                />
                <BoxCollection
                  name="ETH AI Brain"
                  author="By Nick Wilson"
                  bidders={['https://i.imgur.com/v4YUHjU.png', 'https://i.imgur.com/v4YUHjU.png']}
                  image={'https://i.imgur.com/v4YUHjU.png'}
                  currentbid="0.91 ETH"
                  download="#"
                />
                <BoxCollection
                  name="ETH AI Brain"
                  author="By Nick Wilson"
                  bidders={['https://i.imgur.com/v4YUHjU.png', 'https://i.imgur.com/v4YUHjU.png']}
                  image={'https://i.imgur.com/v4YUHjU.png'}
                  currentbid="0.91 ETH"
                  download="#"
                />
              </SimpleGrid>
             
            </Flex>
          </Flex>
        </Grid>
      </Box>
    </>
  );
}

export default Home;
