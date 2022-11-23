import React from 'react';
import CouseItem from './CouseItem';

function Documents({ courses }) {
  return (
    <>
      {courses.documents?.map((lab, index) => (
        <CouseItem key={index} deadline={lab.deadlines} name={lab.name} type={2} description="Tài liệu" />
      ))}
    </>
  );
}

export default Documents;
