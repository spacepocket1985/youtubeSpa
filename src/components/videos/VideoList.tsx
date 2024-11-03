import List from '@mui/material/List';
import { useAppSelector } from '../../hooks/storeHooks';
import { Video } from './Video';
import { Spinner } from '../spinner/Spinner';

export const VideoList: React.FC = () => {
  const { loading, videos } = useAppSelector((state) => state.videoList);

  const content = videos.map((item) => (
    <Video key={item.id.videoId} videoItem={item} />
  ));

  const contentOrSpinner = loading ? <Spinner /> : content;

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {contentOrSpinner}
    </List>
  );
};
