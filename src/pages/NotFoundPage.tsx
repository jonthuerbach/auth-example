import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container
      component='main'
      maxWidth='md'
      sx={{
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant='h1' component='h2' gutterBottom>
        404
      </Typography>
      <Typography variant='h5' component='h3' gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant='body1' gutterBottom>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
      <Box mt={4}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate('/')}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
