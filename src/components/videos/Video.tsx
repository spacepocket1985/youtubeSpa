import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { VideoItem } from '../../service/YouTubeApi';
import { ListMode } from './ListViewMode';

export const Video: React.FC<{ videoItem: VideoItem; viewMode: ListMode }> = ({
  videoItem,
  viewMode,
}) => {
  const gridStyle = {
    maxWidth: '30%',
    flexDirection: 'column',
    margin: 'none',
  };
  const itemStyle = viewMode === ListMode.Grid ? gridStyle : null;
  return (
    <>
      <ListItem alignItems="flex-start" sx={itemStyle}>
        <ListItemAvatar>
          <Avatar
            alt="video img"
            src={videoItem.snippet.thumbnails.medium?.url}
            variant="square"
            sx={{
              width: 120,
              height: 90,
              mr: 0.5,
              borderRadius: '5px',
            }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={videoItem.snippet.title}
          secondary={
            <>
              <Typography
                component="span"
                variant="subtitle2"
                sx={{ color: 'text.primary', display: 'block' }}
              >
                {videoItem.snippet.description}
              </Typography>
              <Typography
                component="span"
                variant="subtitle1"
                sx={{ color: 'text.primary', display: 'block' }}
              >
                {videoItem.snippet.channelTitle}
              </Typography>
            </>
          }
        />
      </ListItem>
    </>
  );
};
