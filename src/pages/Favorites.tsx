import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { loadQueriesFromLocalStorage } from '../utils/localStorageActions';
import { PageWrapper } from '../components/pageWrapper/PageWrapper';
import { SortOrder } from '../service/YouTubeApi';
import { ModalWindow } from '../components/modalWindow/ModalWindow';
import { FavoriteForm } from '../components/forms/FavoriteForm';

export type FavoriteItemType = {
  query: string;
  name: string;
  sortBy: SortOrder;
  maxCount: number;
  id?: string;
};

export const Favorites: React.FC = () => {
  const [savedQueries, setSavedQueries] = useState<FavoriteItemType[]>([]);

  useEffect(() => {
    const storedQueries = loadQueriesFromLocalStorage();
    setSavedQueries(storedQueries);
  }, []);

  return (
    <PageWrapper title="Favorites queries">
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {savedQueries.map((query, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${query.name}`} />
            <ModalWindow iconType="edit">
              {(handleClose) => (
                <FavoriteForm
                  handleClose={handleClose}
                  item={query}
                />
              )}
            </ModalWindow>
          </ListItem>
        ))}
      </List>
    </PageWrapper>
  );
};
