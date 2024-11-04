import Stack from '@mui/joy/Stack';

import Snackbar from '@mui/joy/Snackbar';
import React from 'react';

export enum SnackColor {
  Primary = 'primary',
  Neutral = 'neutral',
  Danger = 'danger',
  Success = 'success',
  Warning = 'warning',
}

export enum SnackVariant {
  Outlined = 'outlined',
  Plain = 'plain',
  Soft = 'soft',
  Solid = 'solid',
}

export const Snack: React.FC<{
  color: SnackColor;
  variant: SnackVariant;
  children: React.ReactNode;
}> = ({ color, variant, children }) => {
  const [open, setOpen] = React.useState(true);

  return (
    <Stack spacing={2} sx={{ alignItems: 'center' }}>
      <Snackbar
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        variant={variant}
        color={color}
        onClose={(_, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen(false);
        }}
      >
        {children}
      </Snackbar>
    </Stack>
  );
};
