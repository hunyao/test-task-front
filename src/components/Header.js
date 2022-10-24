import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CustomButton from '../components/CustomButton'
import logo from '../assets/Logo.svg'

const Header = () => {
  return (
    <Box component="header">
      <Grid container sx={{
        '& > *': {
          margin: '5px !important',
        }
        }}>
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
