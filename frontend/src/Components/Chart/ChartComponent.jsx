import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ timestamps, responseTimes }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const data = {
    labels: timestamps, // Use timestamps as x-axis labels
    datasets: [
      {
        label: 'Response Time (ms)',
        data: responseTimes, // Use response times as y-axis data
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        scales: {
          x: {
            type: 'category',
            labels: timestamps, // Use timestamps as x-axis labels
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [timestamps, responseTimes]);

  return (
    <div> 
      <canvas ref={canvasRef} width="400" height="200"></canvas>
    </div>
  );
};

export default LineChart;
