import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { VideoItem } from '../../service/YouTubeApi';
import { ViewMode } from './ListViewMode';
import { Box, Link } from '@mui/material';
import { useAppSelector } from '../../hooks/storeHooks';

export const Video: React.FC<{ videoItem: VideoItem }> = ({ videoItem }) => {
  const gridStyle = {
    display: 'flex',
    maxWidth: '30%',
    margin: 'none',
    flexWrap: 'wrap',
  };

  const listStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '16px',
    width: '100%',
    maxWidth: '100%',
    wordWrap: 'break-word',
  };

  const viewMode = useAppSelector((state) => state.app.view);
  const itemStyle = viewMode === ViewMode.Grid ? gridStyle : listStyle;

  const itemBaseStyle = {
    border: '1px solid lightgrey',
    borderRadius: '4px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    flexDirection: viewMode === ViewMode.Grid ? 'column' : 'row',
  };

  const imgStyle: React.CSSProperties =
    viewMode === ViewMode.Grid
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
          marginRight: '16px',
        };

  return (
    <Link
      href={`https://www.youtube.com/watch?v=${videoItem.id.videoId}`}
      underline="none"
      target="_blank"
      sx={itemStyle}
    >
      <ListItem alignItems="flex-start" sx={itemBaseStyle}>
        <Box
          component="img"
          sx={imgStyle}
          alt="video thumbnail"
          src={videoItem.snippet.thumbnails.medium?.url}
        />

        <Box sx={{ flexGrow: 1, mt: 1 }}>
          <ListItemText
            primary={videoItem.snippet.title}
            secondary={
              <>
                <Typography
                  component="span"
                  variant="subtitle2"
                  sx={{
                    color: 'text.primary',
                    display: 'block',
                    textAlign: 'justify',
                  }}
                >
                  {videoItem.snippet.description}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                  component={'p'}
                >
                  <Typography
                    component="span"
                    variant="subtitle2"
                    sx={{
                      color: 'white',
                      backgroundColor: 'primary.main',
                      padding: 0.6,
                      borderRadius: 2,
                      mr: 1,
                    }}
                  >
                    {videoItem.snippet.channelTitle}
                  </Typography>
                  <Typography
                    component="span"
                    variant="subtitle2"
                    sx={{
                      color: 'white',
                      backgroundColor: '#9c27b0',
                      padding: 0.6,
                      borderRadius: 2,
                    }}
                  >
                    {videoItem.statistics?.viewCount}
                  </Typography>
                </Box>
              </>
            }
          />
        </Box>
      </ListItem>
    </Link>
  );
};
