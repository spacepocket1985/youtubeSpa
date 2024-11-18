import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';

import { PageWrapper } from '../components/pageWrapper/PageWrapper';
import { SortOrder } from '../service/YouTubeApi';
import { ModalWindow } from '../components/modalWindow/ModalWindow';
import { FavoriteForm } from '../components/forms/FavoriteForm';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { IconButton, Paper } from '@mui/material';
import {
  favoriteItemDelete,
  fetchYouTubeVideos,
  setSearchQuery,
} from '../store/slices/videoSlice';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../routes/routePaths';

export type FavoriteItemType = {
  query: string;
  name: string;
  sortBy: SortOrder;
  maxCount: number;
  id?: string;
};

export const Favorites: React.FC = () => {
  const { favorites } = useAppSelector((state) => state.videoList);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFavoriteItemClick = (
    query: string,
    count: number,
    order: SortOrder
  ): void => {
    dispatch(fetchYouTubeVideos({ query, maxResults: String(count), order }));
    dispatch(setSearchQuery(query));
    navigate(RoutePaths.MainPage);
  };

  return (
    <PageWrapper title="Favorites queries">
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {favorites.map((query, index) => (
          <Paper elevation={2} sx={{ minWidth: 300, mb: 1 }} key={index}>
            <ListItem>
              <ListItemText
                primary={`${query.name}`}
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  handleFavoriteItemClick(
                    query.query,
                    query.maxCount,
                    query.sortBy
                  );
                }}
              />
              <ModalWindow iconType="edit">
                {(handleClose) => (
                  <FavoriteForm handleClose={handleClose} item={query} />
                )}
              </ModalWindow>
              <IconButton
                color="primary"
                size="small"
                onClick={() => {
                  dispatch(favoriteItemDelete(query.id!));
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          </Paper>
        ))}
      </List>
    </PageWrapper>
  );
};
