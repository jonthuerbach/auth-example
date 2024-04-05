import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Users: React.FC = () => {
  return (
    <Container maxWidth='xl' sx={{ my: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 240,
            }}
          ></Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Users;
