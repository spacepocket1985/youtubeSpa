import IconButton from '@mui/material/IconButton';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { setViewMode } from '../../store/slices/appSlice';
import { selectViewMode } from '../../store/selectors/appSelectors';

export enum ViewMode {
  List = 'list',
  Grid = 'grid',
}

export const ListViewMode: React.FC = () => {
  const dispatch = useAppDispatch();
  const viewMode = useAppSelector(selectViewMode);

  return (
    <Box>
      <IconButton
        onClick={() => {
          dispatch(setViewMode(ViewMode.List));
        }}
      >
        <ViewListIcon
          color={viewMode === ViewMode.List ? 'primary' : 'disabled'}
        />
      </IconButton>
      <IconButton
        onClick={() => {
          dispatch(setViewMode(ViewMode.Grid));
        }}
      >
        <ViewModuleIcon
          color={viewMode === ViewMode.Grid ? 'primary' : 'disabled'}
        />
      </IconButton>
    </Box>
  );
};
