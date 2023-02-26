import { Dialog } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, onClose, children }: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      container={() => document.getElementById('__next')}
      fullWidth
    >
      {children}
    </Dialog>
  );
}
