import React from 'react';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import './UploadButton.sass'

const UploadButton = (props) => {
  const {
    error = false,
    color = "primary",
    helperText = "",
    onChange = () => {},
    required = false,
    name,
    placeholder = ""
  } = props;

  const [ fileName, setFileName ] = React.useState("");
  const fileChanged = (event) => {
    const {
      files
    } = event.target;
    const [ file ] = files;
    if (!file) {
      setFileName("")
      onChange(event, null);
      return;
    }

    const {
      name
    } = file;
    setFileName(name)
    onChange(event, file)
  }

  const getClassNames = React.useCallback((classNames) => {
    if (error) {
      return classNames + " Mui-error"
    } else {
      return classNames
    }
  }, [
    error
  ])

  const inputAdornment = (
    <InputAdornment
      position="start"
      className="upload-button-adornment"
    >
      <Button
        color={color}
        variant="outlined"
        component="label"
      >
        Upload
        <input
          hidden
          accept="image/jpeg"
          type="file"
          onChange={fileChanged}
          required={required}
          name={name}
        />
      </Button>
    </InputAdornment>
  )

  return (
    <FormControl
      required={required}
      fullWidth
      variant="outlined"
      color={color}
      className={getClassNames('upload-button')}
      error={error}
    >
      <Input
        readOnly
        color={color}
        placeholder={placeholder}
        name={name}
        startAdornment={inputAdornment}
        inputProps={{
          className: getClassNames('upload-button-input')
        }}
        value={fileName}
        disableUnderline
      />
      <FormHelperText error={error}>
        {helperText}
      </FormHelperText>
    </FormControl>
  )
}

export default UploadButton;
