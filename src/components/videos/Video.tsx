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
            src={videoItem.snippet.thumbnails.default.url}
          />
        </ListItemAvatar>
        <ListItemText
          primary={videoItem.snippet.title}
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: 'text.primary', display: 'inline' }}
              >
                Ali Connors
              </Typography>
              {videoItem.snippet.description}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};
