import { Grid } from '@chakra-ui/react';
import React from 'react';
import CouseItem from './CouseItem';

function Overviews() {
  return (
    <>
      <Grid
        gridTemplateColumns={{ xl: `repeat(1, 1fr)`, sm: '1fr 0.46fr' }}
        gap={{ base: '20px', xl: '20px' }}
        display={{ base: 'block', xl: 'grid' }}
      >
        <CouseItem
          name="Bài Quiz 1"
          type={0}
          history={['https://i.imgur.com/hF9bSEF.png']}
          dateline="3 Ngày, 17 Phút, 39 Giây"
          description="Quiz"
        />
        <CouseItem
          name="Bài Quiz 2"
          type={0}
          history={['https://i.imgur.com/hF9bSEF.png', 'https://i.imgur.com/hF9bSEF.png']}
          dateline="3 Ngày, 17 Phút, 39 Giây"
          description="Quiz"
        />
        <CouseItem name="Assignment 1" type={1} description="Tài liệu" />
        <CouseItem name="Assignment 2" type={1} description="Tài liệu" />
      </Grid>
    </>
  );
}

export default Overviews;
