import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#ffff72',
      main: '#f4e041',
      dark: '#c8b900',
      contrastText: '#000',
    },
    secondary: {
      light: '#6ec6ff',
      main: '#00bdd3',
      dark: '#0069c0',
      contrastText: '#000',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      mobile: 0,
      tablet: 360,
      laptop: 768,
      desktop: 1024,
    }
  },
  typography: {
    fontFamily: 'Nunito'
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '40px',
          lineHeight: '40px'
        },
        body1: {
          fontSize: '16px',
          lineHeight: '26px'
        }
      }
    }
  }
});

export default theme
