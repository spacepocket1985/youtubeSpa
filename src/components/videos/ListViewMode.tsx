import IconButton from '@mui/material/IconButton';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { Box } from '@mui/material';

export enum ListMode {
  List = 'list',
  Grid = 'grid',
}

type ListViewModeProps = {
  onChangeViewMode: (mode: ListMode) => void;
};

export const ListViewMode: React.FC<ListViewModeProps> = ({
  onChangeViewMode,
}) => {
  return (
    <Box>
      <IconButton
        onClick={() => {
          onChangeViewMode(ListMode.List);
        }}
      >
        <ViewListIcon color="primary" />
      </IconButton>
      <IconButton
        onClick={() => {
          onChangeViewMode(ListMode.Grid);
        }}
      >
        <ViewModuleIcon color="primary" />
      </IconButton>
    </Box>
  );
};
