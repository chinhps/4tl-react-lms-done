import React from 'react';
import { Grid } from '@chakra-ui/react';
import CouseItem from './CouseItem';

function Quizs({courses}) {
  return (
    <>
      {courses.quizs?.map((couse, index) => (
        <CouseItem
          key={index}
          name={'Bài ' + couse.name}
          deadline={couse.deadlines}
          type={0}
          history={['https://i.imgur.com/hF9bSEF.png']}
          description="Quiz"
        />
      ))}
    </>
  );
}

export default Quizs;
