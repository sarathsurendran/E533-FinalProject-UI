import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, AppBar, Toolbar, IconButton, Typography, Tabs, Tab, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale } from 'chart.js';
import EvaluateDataset  from './evaluate-dataset/EvaluateDataset';
import PerformanceMetrics from './performance-metrics/PerformanceMetrics';
import EmotionDetection from './emotion-detection/EmotionDetection';
// Register with chart
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

function MyTabs() {
  const [value, setValue] = useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const resetTab = () => {
    setValue(0); // Resets to the first tab
  };


  return (
    <Box sx={{ flexGrow: 1, maxWidth: '80%', margin: '0 auto' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="home" onClick={resetTab}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Emotion Detection
          </Typography>
        </Toolbar>
      </AppBar>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Evaluate Dataset" />
        <Tab label="Performance Metrics" />
        <Tab label= "Emotion Detection" />
      </Tabs>
      {value === 0 && <EvaluateDataset />}
      {value === 1 && <PerformanceMetrics />}
      {value === 2 && <EmotionDetection />}
      {/* Other tab contents */}
    </Box>
  );
}

export default MyTabs;
