import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Badge from '@mui/material/Badge';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../routes/routePaths';
import { removeToken } from '../../utils/localStorageActions';
import { useAppSelector } from '../../hooks/storeHooks';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const favoriteCount = useAppSelector(
    (state) => state.videoList.favorites.length
  );

  const handleLogOutBtn = (): void => {
    removeToken();
    navigate(RoutePaths.SignInPage);
  };

  const handleSearchBtn = (): void => navigate(RoutePaths.MainPage);
  const handleFavoritesBtn = (): void => navigate(RoutePaths.Favorites);
  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingX: { xs: 1, sm: 4, md: 16 },
          }}
        >
          <Box>
            <Button color="inherit" onClick={handleSearchBtn}>
              Search
            </Button>

            <Badge badgeContent={favoriteCount} color="secondary" showZero>
              <Button color="inherit" onClick={handleFavoritesBtn}>
                Favorites
              </Button>
            </Badge>
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
