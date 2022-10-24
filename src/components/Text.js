import React from 'react'
import Typography from '@mui/material/Typography';

const Text = React.forwardRef((props, ref) => (
  <Typography variant="body1" {...props} ref={ref} />
))

export default Text;
