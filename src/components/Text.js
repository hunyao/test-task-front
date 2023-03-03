import React from 'react'
import Typography from '@mui/material/Typography';
import './Text.sass'

const Text = React.forwardRef((props, ref) => {
  const {
    ellipsis = false,
    className = "",
    ...rest
  } = props;

  let customClassName = " custom-text";
  if (ellipsis) {
    customClassName += " ellpsis"
  }

  return <Typography
    variant="body1"
    ref={ref}
    {...rest}
    className={className + customClassName}
  />
})

export default Text;
