import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { auth } from '../config/firebaseConfig'; // Make sure this points to your Firebase config file

interface SignUpFormInputs {
  email: string;
  password: string;
  displayName: string;
}

export default function SignUp() {
  const [isSigningUpUser, setIsSigningUpUser] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>();

  const onSubmit = async (data: SignUpFormInputs) => {
    const { email, password, displayName } = data;
    setIsSigningUpUser(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });
      console.log(userCredential.user); // Handle successful signup, e.g., redirecting to the dashboard
    } catch (error) {
      console.error(error);
    }
    setIsSigningUpUser(false);
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
            Sign Up
          </Typography>
          <Typography
            color={'GrayText'}
            component='p'
            variant='body1'
            sx={{ my: 2, maxWidth: 600, textAlign: 'center' }}
          >
            Get started by creating your account. Please enter a valid email
            address, create a username, and set a secure password below.
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1, maxWidth: 600 }}
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
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email format',
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              label='Password'
              type='password'
              id='password'
              autoComplete='new-password'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
            />

            <TextField
              margin='normal'
              required
              fullWidth
              label='Display Name'
              id='displayName'
              autoComplete='displayName'
              {...register('displayName', {
                required: 'Display Name is required',
              })}
              error={!!errors.displayName}
              helperText={errors.displayName ? errors.displayName.message : ''}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={isSigningUpUser}
              endIcon={
                isSigningUpUser ? (
                  <CircularProgress color='inherit' size={20} />
                ) : null
              }
            >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link component={RouterLink} to='/sign-in' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
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
