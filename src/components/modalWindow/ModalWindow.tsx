import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

const defaultTop = '30%';

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

const styleCloseBtn = {
  position: 'absolute' as const,
  top: '-15px',
  right: '-15px',
};

type ModalWindowPropsType = {
  children: (handleClose?: () => void) => React.ReactNode;
};

export const ModalWindow: React.FC<ModalWindowPropsType> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Button
          aria-label="close"
          onClick={handleClose}
          variant="contained"
          size="small"
          sx={styleCloseBtn}
        >
          Close
        </Button>
        {children(handleClose)}
      </Box>
    </Modal>
  );
};
