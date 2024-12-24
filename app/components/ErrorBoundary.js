'use client'

import React from 'react';
import { Typography, Button, Box, Paper } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Oops! Something went wrong.</Typography>
            <Typography variant="body1" paragraph>
              {this.state.error && this.state.error.toString()}
            </Typography>
            {this.state.errorInfo && (
              <Typography variant="body2" component="pre" sx={{ textAlign: 'left', overflowX: 'auto' }}>
                {this.state.errorInfo.componentStack}
              </Typography>
            )}
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => window.location.reload()}
              sx={{ mt: 2 }}
            >
              Reload Page
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

