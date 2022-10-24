import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import './CustomTooltip.sass';

const CustomTooltip = ({ ...props }) => (
  <Tooltip {...props} arrow classes={{popper: 'custom-tooltip'}} />
)

export default CustomTooltip;
