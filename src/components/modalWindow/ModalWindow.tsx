import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton, Typography } from '@mui/material';

const defaultTop = '35%';

const style = {
  position: 'absolute' as const,
  top: defaultTop,
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '4px solid #1976d2',
  boxShadow: 24,
  p: 4,
};

type ModalWindowPropsType = {
  children: (handleClose: () => void) => React.ReactNode;
  iconType: 'edit' | 'favorite';
  iconLabel?: string;
};

export const ModalWindow: React.FC<ModalWindowPropsType> = ({
  children,
  iconType,
  iconLabel,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => setOpen((prevOpen) => !prevOpen);

  const renderIcon = () => {
    switch (iconType) {
      case 'edit':
        return <EditIcon />;
      case 'favorite':
        return <FavoriteBorderIcon />;
      default:
        return null;
    }
  };

  return (
    <>
      <IconButton
        aria-label="edit"
        onClick={handleToggle}
        style={{
          color: '#1976d2',
          marginRight: '5px',
        }}
      >
        {renderIcon()}
        <Typography variant="subtitle2" component="span">
          {iconLabel}
        </Typography>
      </IconButton>
      <Modal open={open} onClose={handleToggle}>
        <Box sx={style}>{children(handleToggle)}</Box>
      </Modal>
    </>
  );
};
