import { Box, TextField, Button, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchemaSignUp } from '../../utils/validationSchema';
import { User } from '../../service/SwaggerApi';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../routes/routePaths';
import { Spinner } from '../spinner/Spinner';
import { Snack, SnackColor, SnackVariant } from '../snack/Snack';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { registerUser } from '../../store/slices/authSlice';
import PasswordInput from './PasswordInput';
import { useEffect } from 'react';
import { clearError } from '../../store/slices/appSlice';

const Gender = ['male', 'female'];

type FormInputsType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  age: number;
};

export const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInputsType>({
    resolver: yupResolver(validationSchemaSignUp),
    mode: 'onChange',
  });

  const { loading: isLoading, error: isError } = useAppSelector(
    (state) => state.app
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit: SubmitHandler<FormInputsType> = async (data) => {
    const userData: User = {
      username: data.name,
      email: data.email,
      password: data.password,
      gender: data.gender,
      age: data.age,
    };
    const registrationResult = await dispatch(registerUser(userData));
    if (registrationResult.meta.requestStatus === 'fulfilled') {
      navigate(RoutePaths.SignInPage);
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
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        required
        label="Name"
        type="text"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
        size="small"
      />

      <TextField
        label="Email"
        type="email"
        {...register('email')}
        autoComplete=""
        error={!!errors.email}
        helperText={errors.email?.message}
        size="small"
      />
      <Box sx={{ display: 'flex', gap: 1, maxWidth: '22.5rem' }}>
        <TextField
          select
          label="Gender"
          defaultValue={Gender[0]}
          slotProps={{
            select: {
              native: true,
            },
          }}
          {...register('gender')}
          error={!!errors.gender}
          helperText={errors.gender?.message}
          size="small"
        >
          {Gender.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </TextField>

        <TextField
          label="age"
          type="number"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          {...register('age')}
          error={!!errors.age}
          helperText={errors.age?.message}
          size="small"
        />
      </Box>

      <PasswordInput
        label="Password"
        name="password"
        error={errors.password?.message}
        register={register}
      />
      <PasswordInput
        label="Confirm password"
        name="confirmPassword"
        error={errors.confirmPassword?.message}
        register={register}
      />

      <Button type="submit" variant="contained" disabled={!isValid}>
        Submit
      </Button>
      <Typography sx={{ textAlign: 'center' }}>
        Already have an account? <Link to={RoutePaths.SignInPage}>Login.</Link>
      </Typography>
    </Box>
  );

  const spinnerOrContent = isLoading ? <Spinner /> : content;

  return (
    <>
      {spinnerOrContent}

      {isError && (
        <Snack color={SnackColor.Danger} variant={SnackVariant.Solid}>
          {isError}
        </Snack>
      )}
    </>
  );
};
