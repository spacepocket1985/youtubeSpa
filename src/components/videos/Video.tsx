import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { VideoItem } from '../../service/YouTubeApi';
import { ListMode } from './ListViewMode';
import { Box } from '@mui/material';

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

  const imgStyle: React.CSSProperties =
    viewMode === ListMode.Grid
      ? {
          width: '100%',
          height: '150px',
          objectFit: 'cover',
          marginBottom: '8px',
          borderRadius: '5px',
        }
      : {
          width: '120px',
          height: '90px',
          borderRadius: '5px',
          marginRight: '8px',
        };

  return (
    <ListItem alignItems="flex-start" sx={itemStyle}>
      <Box
        component="img"
        sx={imgStyle}
        alt="video thumbnail"
        src={videoItem.snippet.thumbnails.medium?.url}
      />
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
  );
};
