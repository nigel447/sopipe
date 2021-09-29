import { createTheme } from '@mui/material/styles';
import { withStyles } from '@mui/styles';
import Container from '@mui/material/Container';

  export const SlotContainer = withStyles({
    root: {
      backgroundColor: 'transparent',
      position:'relative',
      top:`8vh`,
      width:`90%`,
      height:`90vh`,
      display:'flex',
      flexDirection: `row`,
      justifyContent:`flex-end`,
      alignItems:`flex-start`,
    },
  
  })(Container);

  export const WelcomeSlotContainer = withStyles({
    root: {
      backgroundColor: 'transparent',
      position:'relative',
      top:`6vh`,
      width:`90%`,
      height:`90vh`,
      display:'flex',
      flexDirection: `row`,
      justifyContent:`flex-start`,
      alignItems:`flex-start`,
      margin: 0,
    },
  
  })(Container);

  export const SocialContainer = withStyles({
    root: {
      backgroundColor: 'transparent',
      top:`8vh`,
      width:`20%`,
      height:`90vh`,
      display:'flex',
      flexDirection: `column`,
      justifyContent:`flex-start`,
      alignItems:`flex-start`,

    },
  
  })(Container);


  export const FormGridInnerContainer = withStyles({
    root: {
      backgroundColor: 'transparent',
      top:`8vh`,
      width:`80%`,
      height:`90vh`,
      display:'flex',
      flexDirection: `column`,
      justifyContent:`flex-start`,
      alignItems:`flex-start`,
    },
  
  })(Container);

export const LoginTyTheme = createTheme();

LoginTyTheme.typography.h7 = {
  fontSize: '0.6rem',
  '@media (min-width:600px)': {
    fontSize: '0.8rem',
  },
  [LoginTyTheme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
};

LoginTyTheme.typography.h6 = {
  fontSize: '0.8rem',
  '@media (min-width:600px)': {
    fontSize: '1rem',
  },
  [LoginTyTheme.breakpoints.up('md')]: {
    fontSize: '1.2rem',
  },
};

LoginTyTheme.typography.h5 = {
  fontSize: '1rem',
  '@media (min-width:600px)': {
    fontSize: '1.4rem',
  },
  [LoginTyTheme.breakpoints.up('md')]: {
    fontSize: '1.6rem',
  },
};

LoginTyTheme.typography.h4 = {
  fontSize: '1.4rem',
  '@media (min-width:600px)': {
    fontSize: '1.6rem',
  },
  [LoginTyTheme.breakpoints.up('md')]: {
    fontSize: '1.8rem',
  },
};


export const GridStyles = {
  width: '80%',
  margin: '5% 0 0 25%',
}

export const GridRowStyles = {
  marginTop: '2vh',

}

export const GridHeader = {
  marginLeft: '1%',

}

export const DebugStyles = {
  border: '2px solid black'
}

export const DebugStyles1 = {
  border: '2px solid red'
}













