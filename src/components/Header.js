import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CustomButton from '../components/CustomButton'
import logo from '../assets/Logo.svg'
import './Header.sass'

const Header = () => {
  return (
    <Box
      component="header"
      className="app-header"
    >
      <Grid
        className="app-header-container"
        container
      >
        <Grid
          item
          mr="auto"
          flex="1"
        >
          <Box
            component="img"
            src={logo}
          />
        </Grid>
        <CustomButton>Users</CustomButton>
        <CustomButton>Sign up</CustomButton>
      </Grid>
    </Box>
  )
}

export default Header;
