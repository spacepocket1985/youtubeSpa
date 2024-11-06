import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useAppSelector } from '../../hooks/storeHooks';

export const VideoInformer: React.FC = () => {
  const { query, pageInfo } = useAppSelector((state) => state.videoList);

  return (
    <Grid container gap={1}>
      <Typography variant="subtitle1" component="h6">
        {`Video on demand: "${query}".`}
      </Typography>
      <Typography variant="subtitle1" component="h6" sx={{ color: 'gray' }}>
        {`Total results: ${pageInfo.totalResults}`}
      </Typography>
    </Grid>
  );
};
