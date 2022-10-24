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
          desktop: '32%',
          laptop: '32%',
          tablet: '48%',
          mobile: '100%',
        },
        maxWidth: {
          desktop: '32%',
          laptop: '32%',
          tablet: '48%',
          mobile: '100%',
        }
      }}
    >
      <CardContent sx={{padding: '0 !important'}}>
        <Box m="20px">
          <Avatar
            src={photo}
            sx={{margin: '0 auto', height: 56, width: 56}}
          />
        </Box>
        <Box m="20px">
          <Text align="center">{name}</Text>
        </Box>
        <Box m="20px">
          <Text align="center">{position}</Text>
          <CustomTooltip title={email}>
            <Link href={"mailto:" + email} sx={{color: 'black'}}>
              <Text align="center">{email}</Text>
            </Link>
          </CustomTooltip>
          <CustomTooltip title={phone}>
            <Link href={"tel:" + phone} sx={{color: 'black'}}>
              <PhoneNumber
                align="center"
                phone={phone}
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
