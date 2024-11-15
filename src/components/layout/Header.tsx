import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../routes/routePaths';
import { removeToken } from '../../utils/localStorageActions';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogOutBtn = (): void => {
    removeToken();
    navigate(RoutePaths.SignInPage);
  };

  const handleSearchBtn = (): void => navigate(RoutePaths.MainPage);
  const handleFavoritesBtn = (): void => navigate(RoutePaths.Favorites);
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Button color="inherit" onClick={handleSearchBtn}>
              Search
            </Button>
            <Button color="inherit" onClick={handleFavoritesBtn}>
              Favorites
            </Button>
          </Box>
          <Box>
            <IconButton color="inherit" size="small" onClick={handleLogOutBtn}>
              <LogoutIcon />
              <Typography sx={{ paddingLeft: '5px' }}>log out</Typography>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
