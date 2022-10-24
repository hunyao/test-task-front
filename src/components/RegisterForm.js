import React from 'react';
import Box from '@mui/material/Box';
import Heading from '../components/Heading'
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import CustomButton from '../components/CustomButton'
import CustomRadio from '../components/CustomRadio'
import UploadButton from '../components/UploadButton'
import useValidation from '../hooks/useValidation'
import successImage from '../assets/success-image.svg'
import axios from 'axios'

const endpointForPosition = process.env.REACT_APP_API_ENDPOINT + '/positions'
const endpointForUser = process.env.REACT_APP_API_ENDPOINT + '/users'
const endpointForToken = process.env.REACT_APP_API_ENDPOINT + '/token'
const RegisterForm = (props) => {
  const {
    onSuccess = () => {}
  } = props;
  const [ headingTitle, setHeadingTitle ] = React.useState("Working with POST request")
  const [ processing, setProcessing ] = React.useState(false);
  const [ disableSignUpButton, setDisableSignUpButton ] = React.useState(false);
  const [ positions, setPositions ] = React.useState([]);
  const [ errorFieldMessages, setErrorFieldMessages ] = React.useState({});
  const [ errorMessage, setErrorMessage ] = React.useState("");
  const [ token, setToken ] = React.useState("");
  const [ newMember, setNewMember ] = React.useState({
    name: "",
    email: "",
    phone: "",
    position_id: "",
    photo: {}
  });
  const [ success, setSuccess ] = React.useState(false);
  const validate = useValidation(newMember)

  React.useEffect(() => {
    loadPositions();
    getToken();
  }, [])

  React.useEffect(() => {
    if (success) {
      setHeadingTitle("User successfully registered")
    } else {
      setHeadingTitle("Working with POST request")
    }
  }, [
    success,
    setHeadingTitle
  ])

  const loadPositions = () => {
    axios
      .get(endpointForPosition)
      .then(({data}) => {
        setPositions(data.positions)
      })
      .catch(error => {
        const { response: { data, status } } = error;
        if (status === 404) {
          setErrorMessage(data.message)
        } else {
          setErrorMessage("SYSTEM ERROR: It could not get positions")
          setDisableSignUpButton(true);
        }
      })
  }
  const getToken = () => {
    axios
      .get(endpointForToken)
      .then(({data}) => {
        setToken(data.token)
      })
      .catch(error => {
        setErrorMessage("SYSTEM ERROR: It could not get a token")
        setDisableSignUpButton(true);
      })
  }

  const handleSubmit = React.useCallback((event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setErrorFieldMessages({})
    setErrorMessage("")
    const [ resultErrorObj, isError ] = validate({
      name: [
        { type: 'required' },
        {
          type: 'lengthCheckForString',
          min: 2,
          max: 60
        }
      ],
      email: [
        { type: 'required' },
        {
          type: 'lengthCheckForString',
          min: 2,
          max: 100
        },
        {
          type: 'patternCheck',
          pattern: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        }
      ],
      phone: [
        { type: 'required' },
        {
          type: 'patternCheck',
          pattern: /^[\+]{0,1}380([0-9]{9})$/
        }
      ],
      position_id: [
        { type: 'required' }
      ],
      photo: [
        { type: 'required' },
        {
          type: 'fileTypeCheck',
          fileType: 'image/jpeg'
        },
        {
          type: 'fileSizeCheck',
          max: 5*1024*1024
        }
      ]
    });

    if (isError) {
      setErrorFieldMessages(resultErrorObj);
      return;
    }

    setProcessing(true);
    axios
      .post(endpointForUser, formData, {
        headers: {
          token: token
        }
      })
      .then((res) => {
        onSuccess();
        setSuccess(true);
      })
      .catch(error => {
        const { response: { data, status } } = error;
        if ([ 400, 401, 409, 422 ].includes(status)) {
          setErrorMessage(data.message)
          if (status === 422) {
            setErrorFieldMessages(data.fails)
          }
        } else {
          setErrorMessage("SYSTEM ERROR: It has been faild to sign up")
          setDisableSignUpButton(true);
        }
      })
      .finally(() => setProcessing(false))
  }, [
    onSuccess,
    token,
    validate
  ])

  const setValue = (prop, value) => {
    setNewMember((prev) => {
      return {
        ...prev,
        [prop]: value
      }
    })
  }

  const HeadingNode = React.useMemo(() => {
    return <Heading
      align="center"
      py={5}
    >
      {headingTitle}
    </Heading>
  }, [
    headingTitle
  ])

  const ContentNode = React.useMemo(() => {
    if (success) {
      return <Box align="center">
        <Box component="img" src={successImage} />
      </Box>
    } else {
      return <Box px={32}>
        <form
          noValidate
          onSubmit={handleSubmit}
        >
          <Box align="center" m={5} mt={0}>
            <TextField
              fullWidth
              label="Your name"
              name="name"
              color="secondary"
              error={errorFieldMessages.name !== undefined}
              helperText={errorFieldMessages.name && errorFieldMessages.name[0]}
              value={newMember.name}
              onChange={({target: {value}}) => setValue("name", value)}
              inputProps={{
                minLength: 2,
                maxLength: 60
              }}
            />
          </Box>
          <Box align="center" m={5}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              color="secondary"
              error={errorFieldMessages.email !== undefined}
              helperText={errorFieldMessages.email && errorFieldMessages.email[0]}
              value={newMember.email}
              onChange={({target: {value}}) => setValue("email", value)}
              inputProps={{
                minLength: 2,
                maxLength: 100
              }}
            />
          </Box>
          <Box align="center" m={5}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              color="secondary"
              error={errorFieldMessages.phone !== undefined}
              helperText={errorFieldMessages.phone ? errorFieldMessages.phone[0] : "+38 (XXX) XXX - XX - XX"}
              value={newMember.phone}
              onChange={({target: {value}}) => setValue("phone", value)}
              inputProps={{
                maxLength: 13
              }}
            />
          </Box>
          <Box m={5}>
            <CustomRadio
              color="secondary"
              error={errorFieldMessages.position_id !== undefined}
              helperText={errorFieldMessages.position_id && errorFieldMessages.position_id[0]}
              label="Select your position"
              name="position_id"
              value={newMember.position_id}
              onChange={({target: {value}}) => setValue("position_id", value)}
            >
              {positions.map((position) => (
                <FormControlLabel
                  value={position.id}
                  control={<Radio color="secondary" />}
                  label={position.name}
                  key={position.id}
                />
              ))}
            </CustomRadio>
          </Box>
          <Box m={5}>
            <UploadButton
              error={errorFieldMessages.photo !== undefined}
              helperText={errorFieldMessages.photo && errorFieldMessages.photo[0]}
              color="secondary"
              onChange={(event, file) => setValue("photo", file)}
              name="photo"
              placeholder="Upload your photo"
            />
          </Box>
          <FormHelperText
            sx={{textAlign: 'center'}}
            error
          >
            {errorMessage}
          </FormHelperText>
          <Box align="center" my={3}>
            <CustomButton
              type="submit"
              loading={processing}
              disabled={disableSignUpButton}
            >
              Sign up
            </CustomButton>
          </Box>
        </form>
      </Box>
    }
  }, [
    errorFieldMessages,
    errorMessage,
    handleSubmit,
    newMember,
    positions,
    processing,
    success,
    disableSignUpButton
  ])

  return (
    <Box mt={5}>
      {HeadingNode}
      {ContentNode}
    </Box>
  )
}

export default RegisterForm;
