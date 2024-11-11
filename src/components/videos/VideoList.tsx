import List from '@mui/material/List';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/storeHooks';
import { Video } from './Video';
import { Spinner } from '../spinner/Spinner';
import { Snack, SnackColor, SnackVariant } from '../snack/Snack';
import { VideoInformer } from './VideoInformer';
import { ListMode, ListViewMode } from './ListViewMode';
import { Box } from '@mui/material';

export const VideoList: React.FC = () => {
  const { videos } = useAppSelector((state) => state.videoList);
  const { loading, error } = useAppSelector((state) => state.app);

  const [viewMode, setViewMode] = useState<ListMode>(ListMode.List);

  const renderVideos = (viewMode: ListMode) =>
    videos.map((item) => (
      <Video key={item.id.videoId} videoItem={item} viewMode={viewMode} />
    ));

  const contentOrSpinner = loading ? (
    <Spinner />
  ) : (
    <List
      sx={{
        width: '100%',
        maxWidth: 800,
        bgcolor: 'background.paper',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '5px',
        padding: '0',
      }}
    >
      {renderVideos(viewMode)}
    </List>
  );

  return (
    <>
      {videos.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <VideoInformer />
          <ListViewMode onChangeViewMode={setViewMode} />
        </Box>
      )}
      {contentOrSpinner}
      {error && (
        <Snack color={SnackColor.Danger} variant={SnackVariant.Solid}>
          {error}
        </Snack>
      )}
    </>
  );
};
