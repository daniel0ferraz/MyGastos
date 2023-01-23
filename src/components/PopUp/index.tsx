import React from 'react';
import {Text, View} from 'react-native';
//Icons

//Styled
import * as Styled from './styles';

type IPopUp = {
  type?: 'Success' | 'Alert' | 'Warning' | 'Error';
  message: string;
};

export default function PopUp({type, message}: IPopUp) {
  return (
    <Styled.Wrapper>
      <Styled.Container>
        <Styled.BoxIcon></Styled.BoxIcon>

        <Styled.Message>{message}</Styled.Message>
      </Styled.Container>
    </Styled.Wrapper>
  );
}
