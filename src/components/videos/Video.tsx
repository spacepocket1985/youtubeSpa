import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { VideoItem } from '../../service/YouTubeApi';

export const Video: React.FC<{ videoItem: VideoItem }> = ({ videoItem }) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt="video img"
            src={videoItem.snippet.thumbnails.medium?.url}
            variant="square"
            sx={{ width: 120, height: 90, mr: 0.5, border: 'solid 2px #1976d2' }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={videoItem.snippet.title}
          secondary={
            <>
              <Typography
                component="h6"
                variant="subtitle2"
                sx={{ color: 'text.primary', display: 'inline' }}
              >
                {videoItem.snippet.description}
              </Typography>
              <Typography
                component="h6"
                variant="subtitle1"
                sx={{ color: 'text.primary', display: 'inline' }}
              >
                {videoItem.snippet.channelTitle}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};
