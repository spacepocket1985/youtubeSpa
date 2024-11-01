import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import { validationSchemaSignIn } from '../../utils/validationSchema';
import { useAppSelector, useAppDispatch } from '../../hooks/storeHooks';
import { RoutePaths } from '../../routes/routePaths';
import { clearError, login } from '../../store/slices/authSlice';
import { Snack } from '../snack/Snack';
import { Spinner } from '../spinner/Spinner';

type SignInInputsType = {
  email: string;
  password: string;
};

export const SiginInForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<SignInInputsType>({
    resolver: yupResolver(validationSchemaSignIn),
    mode: 'onChange',
  });

  const { loading: isLoading, error: isError } = useAppSelector(
    (state) => state.auth
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit: SubmitHandler<SignInInputsType> = async (data) => {
    const loginResult = await dispatch(
      login({ email: data.email, password: data.password })
    );
    if (loginResult.meta.requestStatus === 'fulfilled') {
      navigate(RoutePaths.MainPage);
    }
  };

  const content = (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { width: '20rem' },
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        gap: 2,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label="Логин"
        type="email"
        autoComplete=""
        size="small"
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email')}
      />

      <FormControl variant="outlined" size="small">
        <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
        <OutlinedInput
          label="Пароль"
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          {...register('password')}
          error={!!errors.password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? 'hide the password' : 'display the password'
                }
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText>{errors.password?.message}</FormHelperText>
      </FormControl>

      <Button type="submit" variant="contained" disabled={!isValid}>
        Войти
      </Button>
      <Typography sx={{ textAlign: 'center' }}>
        У вас нет аккаунта? <Link to={RoutePaths.SignUpPage}>Регистрация.</Link>
      </Typography>
    </Box>
  );
  const spinnerOrContent = isLoading ? <Spinner /> : content;

  return (
    <>
      {spinnerOrContent}
      {isError && (
        <Snack color="danger" variant="solid">
          {isError}
        </Snack>
      )}
    </>
  );
};
