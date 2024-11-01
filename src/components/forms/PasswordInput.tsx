import { useState } from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type PasswordInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
};

const PasswordInput = <T extends FieldValues>({
  label,
  name,
  error,
  register,
}: PasswordInputProps<T>): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl variant="outlined" size="small">
      <InputLabel htmlFor={`outlined-adornment-${name}`}>{label}</InputLabel>
      <OutlinedInput
        label={label}
        id={`outlined-adornment-${name}`}
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        {...register(name)}
        error={!!error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};

export default PasswordInput;
