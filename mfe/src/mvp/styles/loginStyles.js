import { withStyles } from '@mui/styles';
import { blue } from "@mui/material/colors";
import Button from '@mui/material/Button';

import * as COLORS from './colors'

export const StyledButton = withStyles({
  root: {
    backgroundColor: blue[500],
    fontSize: '24px',
    "&:hover": {
      backgroundColor: blue[100],
    }

  },
  label: {
    // color: COLORS.FUNKY_GREEN,
    paddingTop: '4px',
    color: 'white',
    "&:hover": {
      color: `${COLORS.FUNKY_GREEN}`,
    }
  }

})(Button);



