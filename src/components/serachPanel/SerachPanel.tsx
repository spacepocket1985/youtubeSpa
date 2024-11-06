import { Box, Button, TextField } from '@mui/material';
import { useCallback, useState } from 'react';
import {
  fetchYouTubeVideos,
  setSearchQuery,
} from '../../store/slices/videoSlice';
import { useAppDispatch } from '../../hooks/storeHooks';

export const SerachPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.currentTarget.value;
    setQuery(searchTerm);
  };

  const onSubmitSearch = useCallback((): void => {
    dispatch(fetchYouTubeVideos({ query }));
    dispatch(setSearchQuery(query));
  }, [dispatch, query]);

  return (
    <Box display={'flex'}>
      <TextField
        value={query}
        onChange={onChangeSearch}
        size={'small'}
        sx={{ flexGrow: 1 }}
      />
      <Button
        onClick={onSubmitSearch}
        variant="contained"
        disabled={!query.length}
      >
        Search
      </Button>
    </Box>
  );
};
