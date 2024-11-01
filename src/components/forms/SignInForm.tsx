import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

import { validationSchemaSignIn } from '../../utils/validationSchema';
import { useAppSelector, useAppDispatch } from '../../hooks/storeHooks';
import { RoutePaths } from '../../routes/routePaths';
import { clearError, login } from '../../store/slices/authSlice';
import { Snack } from '../snack/Snack';
import { Spinner } from '../spinner/Spinner';
import PasswordInput from './PasswordInput';

type SignInInputsType = {
  email: string;
  password: string;
};

export const SignInForm: React.FC = () => {
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
        '& .MuiTextField-root': { width: '22.5rem' },
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        gap: 2,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label="Email"
        type="email"
        autoComplete=""
        size="small"
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email')}
      />
      <PasswordInput
        label="Password"
        name="password"
        error={errors.password?.message}
        register={register}
      />

      <Button type="submit" variant="contained" disabled={!isValid}>
        Войти
      </Button>
      <Typography sx={{ textAlign: 'center' }}>
        Dont have an account? <Link to={RoutePaths.SignUpPage}>Register.</Link>
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
