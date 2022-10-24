import React from 'react';
import Text from '../components/Text';

const PhoneNumber = React.forwardRef((props, ref) => {
  const {
    phone,
    ...rest
  } = props;
  const first = phone.substring(0, 3);
  const second = phone.substring(3, 6);
  const third = phone.substring(6, 9);
  const fourth = phone.substring(9, 11);
  const fifth = phone.substring(11, 13);

  return <Text {...rest} ref={ref}>{first} ({second}) {third} {fourth} {fifth}</Text>
})

export default PhoneNumber;
