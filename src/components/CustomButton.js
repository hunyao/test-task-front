import React from 'react'
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import './CustomButton.sass'

const CustomButton = (props) => (
  <LoadingButton
    variant="contained"
    color="primary"
    className="custom-button-component"
    {...props}
  />
)

export default CustomButton;
