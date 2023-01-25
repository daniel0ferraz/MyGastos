import React, {ReactElement, useState} from 'react';
import {TextInputMask, TextInputMaskProps} from 'react-native-masked-text';
import {View} from 'react-native';

import * as Styled from './styles';
import * as Icone from 'phosphor-react-native';

type propsInput = TextInputMaskProps & {
  width?: string;
  Icon?: ReactElement | false;
  placeholder?: string;
  mask?: boolean;
  value?: string;
  options?: any;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  iconSec?: boolean;
};

export default function InputCustom({
  width,
  Icon,
  placeholder,
  mask,
  value,
  type,
  options,
  onChangeText,
  secureTextEntry,
  iconSec,
}: propsInput) {
  const [sec, setSec] = useState(secureTextEntry);

  return (
    <Styled.Container width={width}>
      {Icon && Icon}
      {mask ? (
        <Styled.MaskTextInput
          placeholderTextColor={'#2c2c2c'}
          value={value}
          type={type}
          options={options}
          onChangeText={text => onChangeText(text)}
          placeholder={placeholder}
        />
      ) : (
        <>
          <Styled.TextInput
            placeholderTextColor={'#2c2c2c'}
            value={value}
            onChangeText={text => onChangeText(text)}
            placeholder={placeholder}
            secureTextEntry={sec}
          />

          {iconSec ? (
            <Styled.IconButton onPress={() => setSec(!sec)}>
              {sec ? <Icone.EyeSlash size={28} /> : <Icone.Eye size={28} />}
            </Styled.IconButton>
          ) : null}
        </>
      )}
    </Styled.Container>
  );
}
