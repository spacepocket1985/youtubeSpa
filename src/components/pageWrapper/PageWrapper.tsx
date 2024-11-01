import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

export const PageWrapper: React.FC<{
  children?: React.ReactNode;
  title?: string;
}> = ({ children, title }) => {
  return (
    <Grid
      container
      direction={'column'}
      spacing={2}
      size={4}
      sx={{
        m: 'auto',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 2,
        padding: 1,
      }}
    >
      <Typography
        variant="h4"
        component="h4"
        sx={{
          padding: 1,
          textAlign: 'center',
          bgcolor: '#1976d2',
          borderRadius: 2,
          color: '#fff',
          width: '22.5rem',
        }}
      >
        {title}
      </Typography>
      {children}
    </Grid>
  );
};
