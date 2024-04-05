/* eslint-disable @typescript-eslint/no-explicit-any */
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { sendPasswordResetEmail } from 'firebase/auth';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import Copyright from '../components/Copyright';
import { auth } from '../config/firebaseConfig';

interface FormInputs {
  email: string;
}

export default function ForgotPassword() {
  const [isSendingForgotPasswordEmail, setIsSendingForgotPasswordEmail] =
    React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    setIsSendingForgotPasswordEmail(true);
    const { email } = data;
    try {
      await sendPasswordResetEmail(auth, email);
      setIsSendingForgotPasswordEmail(false);
    } catch (error) {
      console.error(error);
      setIsSendingForgotPasswordEmail(false);
    }
    setIsSendingForgotPasswordEmail(false);
  };

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Forgot Password?
          </Typography>
          <Typography
            color={'GrayText'}
            component='p'
            variant='body1'
            sx={{ my: 2, maxWidth: 600, textAlign: 'center' }}
          >
            Enter the email address you used to create your account below, and
            we'll send you a link to reset your password.
          </Typography>

          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1, width: '100%', maxWidth: 600 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              autoComplete='email'
              autoFocus
              {...register('email', {
                required: 'A valid email address is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email format',
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              endIcon={
                isSendingForgotPasswordEmail && (
                  <CircularProgress color={'inherit'} size={20} />
                )
              }
              disabled={isSendingForgotPasswordEmail}
            >
              Reset my Password
            </Button>
            <Grid container justifyContent='center'>
              <Grid item>
                <Link component={RouterLink} to='/sign-in' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          // backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1579546929662-711aa81148cf)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Grid>
  );
}
