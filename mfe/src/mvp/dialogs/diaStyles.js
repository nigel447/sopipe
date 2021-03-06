import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';


export const BasicDialog = styled(Dialog)(({ theme }) => ({
 
    '& .MuDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));