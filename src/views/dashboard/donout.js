import React, {useEffect, useRef} from 'react';
import Chart from 'chart.js';
import {Paper} from '@mui/material';

const DoughnutChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const myChartRef = chartRef.current.getContext('2d');

        new Chart(myChartRef, {
            type: 'doughnut',
            data: {
                labels: ['Available Assets', 'Assigned Assets'],
                datasets: [
                    {
                        data: [12, 19],
                        backgroundColor: ['#1090CB', '#D9D9D9']
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }, []);

    return (
        <Paper
            className="py-4 px-2"
            sx={{
                height: '325px',
                padding: '10px',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <canvas ref={chartRef} />
        </Paper>
    );
};

export default DoughnutChart;
