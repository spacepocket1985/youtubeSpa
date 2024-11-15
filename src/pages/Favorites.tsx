import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { FavoriteFormInputsType } from '../components/forms/FavoriteForm';
import { loadQueriesFromLocalStorage } from '../utils/localStorageActions';
import { PageWrapper } from '../components/pageWrapper/PageWrapper';

export type FavoriteItemType = FavoriteFormInputsType & {  
  id: string;  
};  

export const Favorites: React.FC = () => {
  const [savedQueries, setSavedQueries] = useState<FavoriteFormInputsType[]>(
    []
  );

  useEffect(() => {
    const storedQueries = loadQueriesFromLocalStorage();
    setSavedQueries(storedQueries);
  }, []);

  return (
    <PageWrapper title="Favorites queries">
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {savedQueries.map((query, index) => (
          <ListItem
            key={index}
            disableGutters
            secondaryAction={
              <IconButton aria-label="comment">
                <EditIcon color="primary" />
              </IconButton>
            }
          >
            <ListItemText primary={`${query.query}`} />
          </ListItem>
        ))}
      </List>
    </PageWrapper>
  );
};
