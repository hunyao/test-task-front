import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import RadioGroup from '@mui/material/RadioGroup';

const CustomRadio = (props) => {
  const {
    error = false,
    color = "primary",
    required = false,
    helperText = "",
    label = "",
    name,
    onChange = () => {},
    value,
    children
  } = props;

  return (
    <FormControl
      color={color}
      error={error}
      required={required}
      onChange={onChange}
      value={value}
    >
      <FormLabel>{label}</FormLabel>
      <RadioGroup name={name}>
        {children}
      </RadioGroup>
      <FormHelperText>
        {helperText}
      </FormHelperText>
    </FormControl>
  )
}

export default CustomRadio
