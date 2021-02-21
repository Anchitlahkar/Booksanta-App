import * as React from 'react';
import { Header } from 'react-native-elements';

export const MyHeader = (props) => {
  return (
    <Header
      centerComponent={{
        text: props.title,
        style: { color: 'black', fontSize: 20, fontWeight: 'bold' },
      }}
      backgroundColor="#6f4e37"
    />
  );
};
