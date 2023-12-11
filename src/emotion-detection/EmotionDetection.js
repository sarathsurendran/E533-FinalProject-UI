import React, { useState } from 'react';
import { Box, Button, Typography, FormControl, InputLabel, Select, MenuItem, CircularProgress, Grid, TextField } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import config from '../config';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function EmotionDetection() {
  const [selectedModel, setSelectedModel] = useState('vgg16');
  const [file, setFile] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };
  const url=`${config.apiUrl}`;
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: '#fff', // Light color for text
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Lighter grid lines
        },
      },
      y: {
        ticks: {
          color: '#fff', // Light color for text
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Lighter grid lines
        },
      },
    },
    plugins: {
        legend: {
          display:false
        },
        position: 'bottom',
        color: '#fff'
        }
    };


  const handlePredict = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('modelname',selectedModel)

    setIsLoading(true);
    try {
      const response = await fetch(url+`/predict`, {
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
             
              <MenuItem value="vgg16">VGGNet16</MenuItem>
              <MenuItem value="vgg19">VGGNet19</MenuItem>
              <MenuItem value="resnet18">ResNet18</MenuItem>
              <MenuItem value="hybrid1">Hybrid - Shallow</MenuItem>
              <MenuItem value="hybrid2">Hybrid - Deep</MenuItem>
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
            Upload
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="left" marginLeft={22} marginTop={2} >
        <Button variant="contained" onClick={handlePredict} marginTop={4} sx={{ width: 100 }}>Predict</Button>
      </Box>
      {isLoading ? (
        <CircularProgress marginTop={3} />
      ) : (
        predictions && (
          <Grid container spacing={2} marginTop={6} justifyContent="center">
            <Grid item xs={8}>
              <Bar data={chartData} options={chartOptions} />
            </Grid>
          </Grid>
        )
      )}
    </Box>
  );
}

export default EmotionDetection;
