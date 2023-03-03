import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Heading from '../components/Heading'
import CustomButton from '../components/CustomButton'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import MemberCards from '../components/MemberCards';
import FormHelperText from '@mui/material/FormHelperText';

let endpoint = process.env.REACT_APP_API_ENDPOINT + '/users?count=6'
const Members = (props) => {
  const {
    reload = false
  } = props;
  const firstRef = React.useRef(true);
  const [ members, setMembers ] = React.useState([]);
  const [ disabledShow, setDisabledShow ] = React.useState(false);
  const [ loading, setLoading ] = React.useState(true);
  const [ errorMsg, setErrorMsg ] = React.useState('');

  const loadMore = React.useCallback(() => {
    setLoading(true)
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
      .catch(error => {
        setErrorMsg('SYSTEM ERROR: It could not get the list of users')
        setDisabledShow(true);
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
      <FormHelperText
        sx={{textAlign: 'center'}}
        error
      >
        {errorMsg}
      </FormHelperText>
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
