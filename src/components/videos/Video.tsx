import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { VideoItem } from '../../service/YouTubeApi';
import { ViewMode } from './ListViewMode';
import { Box, Link } from '@mui/material'; // Импортируйте Link
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
    alignItems: 'flex-start', // Выравнивание по верхнему краю
    marginBottom: '16px', // Отступ между элементами списка
  };

  const viewMode = useAppSelector((state) => state.app.view);
  const itemStyle = viewMode === ViewMode.Grid ? gridStyle : listStyle;

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
    <ListItem alignItems="flex-start" sx={itemStyle}>
      <Link
        href={`https://www.youtube.com/watch?v=${videoItem.id.videoId}`}
        underline="none"
        target="_blank"
      >
        <Box
          component="img"
          sx={imgStyle}
          alt="video thumbnail"
          src={videoItem.snippet.thumbnails.medium?.url}
        />
      </Link>

      <Box sx={{ flexGrow: 1 }}>
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
              <Typography
                component="span"
                variant="subtitle2"
                sx={{
                  color: 'white',
                  backgroundColor: 'primary.main',
                  padding: 0.5,
                  borderRadius: 2,
                }}
              >
                {videoItem.snippet.channelTitle}
              </Typography>
            </>
          }
        />
      </Box>
    </ListItem>
  );
};
