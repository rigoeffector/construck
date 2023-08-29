import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import { Paper } from '@mui/material';
import './canvas.css'
const LineBarComboChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext('2d');

    new Chart(myChartRef, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Unpaid Assets',
            data: [10, 20, 30, 25, 40, 35],
            backgroundColor: '#1090CB',
          },
          {
            label: 'Paid Assets',
            data: [15, 25, 20, 35, 30, 45],
            backgroundColor: '#D9D9D9',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return (
    <Paper
      className="py-4 px-2"
      sx={{
        height: '325px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <canvas ref={chartRef} />
    </Paper>
  );
};

export default LineBarComboChart;
