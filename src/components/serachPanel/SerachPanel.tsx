import { Box, Button, OutlinedInput, InputAdornment } from '@mui/material';

import { useCallback, useState } from 'react';
import {
  fetchYouTubeVideos,
  setSearchQuery,
} from '../../store/slices/videoSlice';
import { useAppDispatch } from '../../hooks/storeHooks';

import { ModalWindow } from '../modalWindow/ModalWindow';
import { FavoriteForm } from '../forms/FavoriteForm';

export const SerachPanel: React.FC = () => {
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState('');
  const [showFavoritesIcon, setShowFavoritesIcon] = useState(false);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.currentTarget.value;
    setQuery(searchTerm);
  };

  const onSubmitSearch = useCallback(async () => {
    const videos = await dispatch(fetchYouTubeVideos({ query }));
    if (videos.meta.requestStatus === 'fulfilled') {
      setShowFavoritesIcon(true);
      dispatch(setSearchQuery(query));
    }
  }, [dispatch, query]);

  return (
    <>
      <Box display={'flex'} sx={{ gap: 0.5 }}>
        <OutlinedInput
          value={query}
          onChange={onChangeSearch}
          size={'small'}
          sx={{ flexGrow: 1 }}
          endAdornment={
            <InputAdornment position="end">
              <>
                {showFavoritesIcon && (
                  <ModalWindow iconType="favorite">
                    {(handleClose) => (
                      <FavoriteForm handleClose={handleClose} />
                    )}
                  </ModalWindow>
                )}
              </>
            </InputAdornment>
          }
        />
        <Button
          onClick={onSubmitSearch}
          variant="contained"
          disabled={!query.length}
        >
          Search
        </Button>
      </Box>
    </>
  );
};
