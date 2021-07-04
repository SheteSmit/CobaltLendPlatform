import {createMuiTheme} from '@material-ui/core';
import '../assets/fonts/Nunito-Regular.ttf'
import '../assets/fonts/Nunito-Bold.ttf'

export const theme = createMuiTheme({
  // Darker Cobalt theme
  palette: {
    primary: {
      main: '#070BCE',
      light: '#0001E4',
      dark:  '#000080',
      
    },
    secondary: {
      main: '#010440',
      light: '#020873',
    },
    background: {
      default: '#faf9fa',
      paper: '#fff',
      
    },
    common: {
      white: '#fff'
    },

  },
  typography: {
    fontFamily: [
      "Nunito","Roboto", "Helvetica", "Arial", 'sans-serif'
    ].join(','),
    h1: {
      fontFamily: 'Nunito',
      fontWeight: 400,
      fontStyle: 'normal',
      fontSize: '2.25rem'
    },
    h2: {
      fontWeight: 400,
      fontStyle: 'normal',
      fontSize: '2rem'
    },
    h3: {
      fontWeight: 400,
      fontStyle: 'normal',
      fontSize: '1.25rem',
    },
    h4: {
      fontWeight: 400,
      fontStyle: 'normal',
      fontSize: '1rem',
    },
    h5: {
      fontWeight: 400,
      fontStyle: 'normal',
      fontSize: '1rem'
    },
    h6: {
      fontWeight: 400,
      fontStyle: 'normal',
      fontSize: '1rem'
    },
    body1: {
      fontWeight: 400,
      fontStyle: 'normal',
      fontSize: '16px'
    },
    button: {
      fontWeight: 400,
      fontStyle: 'normal',
      fontSize: '16px'
    },
  },

  // Lighter Cobalt theme
  // palette: {
  //   primary: {
  //     main: '#044BD9',
  //     light: '#0476D9',
  //     dark:  '#0460D9',
  //     background: '#faf9fa'
  //   },
  //   secondary: {
  //     main: '#0367A6',
  //     light: '#04B2D9',
  //     background: '#edeff7'
  //   },

  // }
})