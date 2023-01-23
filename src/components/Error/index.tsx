import React, { useState } from 'react';

import {
  Text,
  View
} from 'react-native';

interface PropsErro {
  message: string;
  icon?: any; 
}


import * as Styled from './style';

export default function Error({ message, icon }: PropsErro) {

  const [hideModal, setHideModal] = useState(true);

  setTimeout(() => {
    setHideModal(true);
  }, 3000)
  

  return (
    <Styled.Container>
      <Styled.BoxIcon>
      { icon && icon} 
      </Styled.BoxIcon>
      <Styled.Title>{ message}</Styled.Title>
    </Styled.Container>
  );
}