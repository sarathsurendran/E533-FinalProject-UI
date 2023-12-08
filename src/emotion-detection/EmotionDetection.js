import React, { useState } from 'react';
import { Box, Button, Typography, FormControl, InputLabel, Select, MenuItem, CircularProgress, Grid, TextField } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function EmotionDetection() {
  const [selectedModel, setSelectedModel] = useState('Alexnet');
  const [file, setFile] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const options = {
    plugins: {
      legend: {
        display: false, // This will hide the legend completely
      },
    },
    // ... other options if any
  };

  const handlePredict = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('modelname',selectedModel)

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/predict`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setPredictions(data.prediction[0]);
    } catch (error) {
      console.error('Error making prediction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = {
    labels: ['Anger', 'Disgust', 'Fear', 'Happiness', 'Sadness', 'Surprise', 'Neutral'],
    datasets: [{
     label: 'Predictions',
      data: predictions || [],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF']
    }],
  };

  return (
    <Box p={3}>
   
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
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
        </Grid>
       
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            disabled
            value={file ? file.name : ''}
            label="Uploaded File"
          />
        </Grid>
        <Grid item maxWidth={150}>
          <Button
            variant="contained"
            component="label"
            fullWidth
          >
            Upload File
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="left" marginTop={2} marginLeft={14}>
        <Button variant="contained" onClick={handlePredict} sx={{ width: 100 }}>Predict</Button>
      </Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        predictions && (
          <Grid container spacing={2} marginTop={6} justifyContent="center">
            <Grid item xs={8}>
              <Bar data={chartData} options={options} />
            </Grid>
          </Grid>
        )
      )}
    </Box>
  );
}

export default EmotionDetection;
