import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import './App.sass';
import Container from '@mui/material/Container';
import Header from './components/Header'
import TopMessage from './components/TopMessage'
import Members from './components/Members'
import RegisterForm from './components/RegisterForm'
import theme from './theme'

function App() {
  const [ reload, setReload ] = React.useState(false);
  const onSuccess = React.useCallback(() => {
    setReload(true);
  }, [
    setReload
  ])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container
          maxWidth="desktop"
        >
          <Header />
          <TopMessage />
          <Members
            reload={reload}
          />
          <RegisterForm
            onSuccess={onSuccess}
          />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
