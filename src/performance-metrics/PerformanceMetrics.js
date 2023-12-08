import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, CircularProgress, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function PerformanceMetrics() {
  const [selectedModel, setSelectedModel] = useState('Alexnet');
  const [modelData, setModelData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/model-history?modelname=${selectedModel}`);
        const data = await response.json();
        setModelData(data);
      } catch (error) {
        console.error('Error fetching model data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedModel]);

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const chartData = {
    labels: modelData ? Array.from({ length: modelData.accuracy.length }, (_, i) => i + 1) : [],
    datasets: [
      {
        label: 'Accuracy',
        data: modelData ? modelData.accuracy : [],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Validation Accuracy',
        data: modelData ? modelData.val_accuracy : [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
      // Include loss and validation loss if needed
    ],
  };

  return (
    <Box p={3}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3 }}>
       
      </Typography>
      <FormControl fullWidth sx={{ maxWidth: 300, marginBottom: 2 }}>
        <InputLabel id="model-select-label">Model</InputLabel>
        <Select
        labelId="model-select-label"
        id="model-select"
        value={selectedModel}
        label="Model"
        onChange={handleModelChange}
        >
        <MenuItem value="Alexnet">Alexnet</MenuItem>
        <MenuItem value="VGGNet16">VGGNet16</MenuItem>
        <MenuItem value="Hybrid">Hybrid</MenuItem>
        </Select>
        </FormControl>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 3 }}>
          <Grid item xs={12}>
            <Line data={chartData} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default PerformanceMetrics;
