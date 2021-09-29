import React, { useState, useEffect, useContext } from 'react';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { BasicDialog } from './diaStyles'
import { LayoutContext, ACTIONS } from '../../contexts/layoutContext'
import {
  helpText,
  helpTitle,
  infoTitle,
  infoText,
  emailTitle,
  emailText
} from '../constants'
import { FamilyRestroomTwoTone } from '@mui/icons-material';

const BasicDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, minWidth: 'md' }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const debugDialogStyle = {
  position: 'absolute', top: '80px', left: '140px',
  minWidth: '300px',
  minHeight: '300px',
  zIndex: 1000,
  border: '2px solid gold'
}

export const BasicDialogView = (props) => {
  const [layOutState, layOutDispatch] = useContext(LayoutContext);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState([]);

  useEffect(() => {
    console.log(`BasicDialogView useEffect layOutState helpOpen is ${layOutState.input.dialogs}`)

    for (const k in layOutState.input.dialogs) {
      if (layOutState.input.dialogs[k]) {
        setOpen(true)
        switch (k) {
          case `helpOpen`:
            setTitle(helpTitle)
            setContent(helpText)
            break;
          case `infoOpen`:
            setTitle(infoTitle)
            setContent(infoText)
            break;
          case `emailOpen`:
            setTitle(emailTitle)
            setContent(emailText)
            break;
        }
      }
    }

  }, [layOutState.input.dialogs])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const layOutContent = () => {
    const layOutContents = content.map((x) => <Typography variant="h6" gutterBottom> {x}</Typography>)
    return (
      <>
        {layOutContents}
      </>
    )
  }

  const onCloseHelpDialog = () => {
    console.log("BasicDialogView onCloseHelpDialog send dispatch open = false")
    setOpen(false)
    for (const k in layOutState.input.dialogs) { 
      layOutDispatch({
        type: ACTIONS.OPEN_HELP,
        value: false,
      });
      layOutDispatch({
        type: ACTIONS.OPEN_INFO,
        value: false,
      });
      layOutDispatch({
        type: ACTIONS.OPEN_EMAIL,
        value: false,
      });

    }

  };
  return (
    <>
      <BasicDialog

        onClose={onCloseHelpDialog}
        open={open}
      >
        <BasicDialogTitle id="customized-dialog-title" onClose={onCloseHelpDialog}>
          {title}
        </BasicDialogTitle>
        <DialogContent dividers>
          {layOutContent()}
        </DialogContent>
      </BasicDialog>
    </>
  )
}