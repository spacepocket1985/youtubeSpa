import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';

import { PageWrapper } from '../components/pageWrapper/PageWrapper';
import { SortOrder } from '../service/YouTubeApi';
import { ModalWindow } from '../components/modalWindow/ModalWindow';
import { FavoriteForm } from '../components/forms/FavoriteForm';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { IconButton } from '@mui/material';
import { favoriteItemDelete } from '../store/slices/videoSlice';

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

  return (
    <PageWrapper title="Favorites queries">
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {favorites.map((query, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${query.name}`} />
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
        ))}
      </List>
    </PageWrapper>
  );
};
