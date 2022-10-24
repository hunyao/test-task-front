const validator = {
  required: (value, key) => {
    if ([
      undefined,
      null,
      ""
    ].includes(value)
      || (typeof value === 'object' && value instanceof File === false)
    ) {
      return [
        false,
        `This ${key} field is required`
      ]
    } else {
      return [ true, null ]
    }
  },
  lengthCheckForString: (value, key, arg) => {
    const { min, max } = arg
    if (typeof value !== "string") {
      return [ false ];
    }
    if (value.length < min) {
      return [
        false,
        `The ${key} must be at least ${min} characters.`
      ]
    }
    if (value.length > max) {
      return [
        false,
        `The ${key} must be less than or equal to ${max} characters.`
      ]
    }
    return [ true, null ]
  },
  patternCheck: (value, key, arg) => {
    const { pattern } = arg;
    if (!value.match(pattern)) {
      return [
        false,
        `The ${key} must be a valid`
      ]
    }
    return [ true, null ]
  },
  fileTypeCheck: (value, key, arg) => {
    const { fileType } = arg;
    if (value instanceof File === false) {
      return [ false ];
    }
    if (value.type !== fileType) {
      return [
        false,
        `This ${key} must be the type ${fileType}`
      ]
    }
    return [ true, null ]
  },
  fileSizeCheck: (value, key, arg) => {
    const { max } = arg;
    if (value instanceof File === false) {
      return [ false ];
    }
    if (value.size > max) {
      return [
        false,
        `This ${key} may not be greater than ${max} bytes`
      ]
    }
    return [ true, null ]
  }
}

const useValidation = (values) => {
  return (rules) => {
    let err = false;
    return [
      Object.fromEntries(
        Object
        .entries(rules)
        .map(([ key, rules ]) => {
          return [
            key, rules.map(rule => {
              const { type, ...arg } = rule;
              const [ isValid, errorMessage ] = validator[type](values[key], key, arg);
              if (!isValid) {
                err = true;
              }
              return errorMessage
            })
            .filter(rule => rule !== null)
          ]
        })
        .filter(([ key, rules ]) => rules.length > 0)
      ),
      err
    ]
  }
}

export default useValidation
