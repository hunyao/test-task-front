import React from 'react';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import CustomTooltip from './CustomTooltip'
import Text from './Text'
import Link from '@mui/material/Link';
import PhoneNumber from './PhoneNumber'
import Card from '@mui/material/Card';
import './MemberCards.sass'

const MemberCards = (props) => {
  const {
    photo,
    phone,
    name,
    email,
    position
  } = props;

  return (
    <Grid
      item
      component={Card}
      sx={{
        flex: {
          desktop: 'calc((100% - 32px) / 3)',
          laptop: 'calc((100% - 16px) / 2)',
          tablet: '100%',
          mobile: '100%',
        },
        maxWidth: {
          desktop: 'calc((100% - 32px) / 3)',
          laptop: 'calc((100% - 16px) / 2)',
          tablet: '100%',
          mobile: '100%',
        },
      }}
      className="member-cards"
    >
      <CardContent>
        <Box>
          <Avatar src={photo} />
        </Box>
        <Box>
          <Text
            align="center"
            ellipsis
          >
            {name}
          </Text>
        </Box>
        <Box>
          <Text
            align="center"
            ellipsis>
            {position}
          </Text>
          <CustomTooltip title={email}>
            <Link href={"mailto:" + email}>
              <Text
                align="center"
                ellipsis
              >
                {email}
              </Text>
            </Link>
          </CustomTooltip>
          <CustomTooltip title={phone}>
            <Link href={"tel:" + phone}>
              <PhoneNumber
                align="center"
                phone={phone}
                ellipsis
              >
                {phone}
              </PhoneNumber>
            </Link>
          </CustomTooltip>
        </Box>
      </CardContent>
    </Grid>
  )
}

export default MemberCards;
