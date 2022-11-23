import React from 'react';
import CouseItem from './CouseItem';

function Labs({courses}) {
  return (
    <>
      {courses.labs?.map((document, index) => (
        <CouseItem key={index} deadline={document.deadlines} name={document.name} type={1} description="Bài tập" />
      ))}
    </>
  );
}

export default Labs;
