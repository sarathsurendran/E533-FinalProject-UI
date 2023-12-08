import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, Grid } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

function EvaluateDataset() {
  const [isLoading, setIsLoading] = useState(false);
  const [datasetStats, setDatasetStats] = useState(null);

    // Fetch dataset stats
useEffect(() => {
    const fetchData = async () => {
        setIsLoading(prev => ({ ...prev, datasetStats: true }));
        try {
        const response = await fetch('http://localhost:5000/dataset-stats');
        const data = await response.json();
        setDatasetStats(data);
        } catch (error) {
        console.error('Error fetching dataset stats:', error);
        } finally {
        setIsLoading(prev => ({ ...prev, datasetStats: false }));
        }
    };

    fetchData();
    }, []);


// Prepare chart data
const emotionLabels = ['Anger', 'Disgust', 'Fear', 'Happiness', 'Sadness', 'Surprise', 'Neutral'];
const chartOptions = {
responsive: true,
plugins: {
    legend: {
    position: 'top',
    }
}
};

const getChartData = (counts) => ({
labels: emotionLabels,
datasets: [{
    data: counts,
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF']
}]
});


const trainChartData = datasetStats ? getChartData(datasetStats.class_distribution_train.counts) : null;
const testChartData = datasetStats ? getChartData(datasetStats.class_distribution_test.counts) : null;
const trainSize = datasetStats ? datasetStats.train_size : 0; // Get the size of training data
const testSize = datasetStats ? datasetStats.test_size : 0; // Get the size of test data


  // Prepare chart data and options
  // ...

  return (
    <Box p={3}>
          <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3 }}>
            
          </Typography>
          {isLoading.datasetStats ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={8} md={4}>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>Training Data</Typography>
                {trainChartData && <Pie data={trainChartData} options={chartOptions} />}
                <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
                  Total Size: {trainSize}
                </Typography>
              </Grid>
              <Grid item xs={8} md={4}>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>Test Data</Typography>
                {testChartData && <Pie data={testChartData} options={chartOptions} />}
                <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
                  Total Size: {testSize}
                </Typography>
              </Grid>
            </Grid>
          )}
    </Box>
  );
}

export default EvaluateDataset;
