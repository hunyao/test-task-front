import React from 'react';
import Box from '@mui/material/Box';
import CustomButton from '../components/CustomButton'
import Heading from '../components/Heading'
import Text from '../components/Text'
import './TopMessage.sass'

const TopMessage = () => {
  return (
    <Box
      className="top-message-component"
    >
      <Box px={12} py={18}>
        <Heading
          mb={5}
          align="center"
        >
          Test assignment for front-end developer
        </Heading>
        <Text
          align="center"
        >
          What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
        </Text>
        <Box align="center" mt={5}>
          <CustomButton>Sign Up</CustomButton>
        </Box>
      </Box>
    </Box>
  )
}

export default TopMessage;
