import { Grid } from '@chakra-ui/react';
import React from 'react';
import Documents from './Documents';
import Labs from './Labs';
import Quizs from './Quizs';

function Overviews({ courses }) {
  return (
    <>
      <Grid
        gridTemplateColumns={{ xl: `repeat(1, 1fr)`, sm: '1fr 0.46fr' }}
        gap={{ base: '20px', xl: '20px' }}
        display={{ base: 'flex', xl: 'grid' }}
        flexDirection="column"
      >
        <Quizs courses={courses} />
        <Documents courses={courses} />
        <Labs courses={courses}/> 
      </Grid>
    </>
  );
}

export default Overviews;
