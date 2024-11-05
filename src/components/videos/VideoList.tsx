import List from '@mui/material/List';

import { useAppSelector } from '../../hooks/storeHooks';
import { Video } from './Video';
import { Spinner } from '../spinner/Spinner';
import { Snack, SnackColor, SnackVariant } from '../snack/Snack';
import { VideoInformer } from './VideoInformer';

export const VideoList: React.FC = () => {
  const { videos } = useAppSelector((state) => state.videoList);
  const { loading, error } = useAppSelector((state) => state.app);

  const content = videos.map((item) => (
    <Video key={item.id.videoId} videoItem={item} />
  ));

  const contentOrSpinner = loading ? <Spinner /> : content;

  return (
    <>
      {videos.length > 0 && <VideoInformer />}
      <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
        {contentOrSpinner}
      </List>
      {error && (
        <Snack color={SnackColor.Danger} variant={SnackVariant.Solid}>
          {error}
        </Snack>
      )}
    </>
  );
};
