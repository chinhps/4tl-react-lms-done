import React from 'react';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function Chart() {
  const [data, setData] = useState({
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    series: [
      {
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  return (
    <>
      <ReactApexChart options={data.options} series={data.series} type="line" width="100%" />
    </>
  );
}

export default Chart;
