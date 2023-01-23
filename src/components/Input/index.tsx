import React from 'react';

import {
  TextInputProps,
  View,
  Text
} from 'react-native';

import { maskDate, maskCurrency } from "../../utils/mask";

import * as Styled from './styles';

type Props = TextInputProps & {
  label?: string;
  mask?: "currency" | "date";
  inputMaskChange?: any;
  sizeInput?: any;
}

export default function Input({ label, mask, inputMaskChange, sizeInput,  ...rest }: Props) {
  
  function handleChange(text: string) {
    if (mask === "currency") {
      const value = maskCurrency(text);
      inputMaskChange(value);
    }

    if (mask === "date") {
      const value = maskDate(text);
      inputMaskChange(value);
    }
  
  }

  return (
    <Styled.Container>
      <Styled.Label>{label}</Styled.Label>
      <Styled.InputText
        placeholderTextColor={'#2c2c2c'}
        sizeInput={sizeInput}
        onChangeText={(text) => handleChange(text)}
        {...rest}
      />
    </Styled.Container>
  );
}