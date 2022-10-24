import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Heading from '../components/Heading'
import CustomButton from '../components/CustomButton'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import MemberCards from '../components/MemberCards';

let endpoint = process.env.REACT_APP_API_ENDPOINT + '/users?count=6'
const Members = (props) => {
  const {
    reload = false
  } = props;
  const firstRef = React.useRef(true);
  const [ members, setMembers ] = React.useState([]);
  const [ disabledShow, setDisabledShow ] = React.useState(false);
  const [ loading, setLoading ] = React.useState(true);

  const loadMore = React.useCallback(() => {
    setLoading(true)
    setDisabledShow(true);
    axios.get(endpoint)
      .then(({data}) => {
        endpoint = data.links.next_url;
        setMembers((prev) => {
          return [
            ...prev,
            ...data.users
          ]
        })
        setDisabledShow(data.links.next_url === null)
      })
      .finally(() => setLoading(false))
  }, [
    setMembers
  ])

  React.useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
      loadMore()
    }
  }, [
    loadMore
  ])

  React.useEffect(() => {
    if (reload) {
      endpoint = process.env.REACT_APP_API_ENDPOINT + '/users?count=6'
      setMembers([]);
      setDisabledShow(false);
      loadMore();
    }
  }, [
    reload,
    loadMore
  ])

  const Loading = (
    <Grid item sx={{width: '100%'}}>
      <Box align="center">
        <CircularProgress color="secondary" />
      </Box>
    </Grid>
  )

  return (
    <Box mt={5}>
      <Heading
        align="center"
        py={5}
      >
        Working with GET request
      </Heading>
      <Grid
        container
        sx={{
          paddingX: 2,
          gap: {
            desktop: 2,
            laptop: 2,
            tablet: 1,
            mobile: 1,
          }
        }}
      >
        {members.map((member, key) => (
          <MemberCards {...member} key={key} />
        ))}
        {loading && Loading}
      </Grid>
      <Box align="center" my={3}>
        <CustomButton
          onClick={loadMore}
          sx={{
            display: disabledShow ? 'none': ''
          }}
        >
          Show more
        </CustomButton>
      </Box>
    </Box>
  )
}

export default Members;
