import styled, {css} from 'styled-components/native';

import {ms} from 'react-native-size-matters';
import {Dimensions} from 'react-native';

export const Container = styled.KeyboardAvoidingView`
  ${({theme}) => css`
    flex: 1;
    padding: ${theme.sizes[9]}px;
    background: ${theme.colors.white};
  `};
`;

export const Header = styled.View`
  ${({theme}) => css`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: ${ms(25)}px;
    margin-bottom: ${theme.sizes[20]}px;
  `}
`;

export const BoxTitle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const BoxIcon = styled.View`
  ${({theme}) => css`
    width: ${ms(50)}px;
    height: ${ms(50)}px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.light};
  `}
`;

export const TitleHeader = styled.Text`
  ${({theme}) => css`
    font-size: ${ms(20)}px;
    font-family: ${theme.fonts.Lexend700};
    color: ${theme.colors.gray};
    padding-left: 13px;
  `}
`;

export const ValueExpenser = styled.Text`
  ${({theme}) => css`
    font-family: ${theme.fonts.Lexend500};
    color: ${theme.colors.dark};
    padding-top: ${ms(20)}px;
    font-size: ${ms(25)}px;
  `}
`;

export const Form = styled.View`
  width: 100%;
`;

export const FormGroup = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${ms(16)}px;
`;

export const RowSelect = styled.View`
  ${({theme}) => css`
    margin-top: ${ms(10)}px;
  `}
`;

export const ButtonGroup = styled.View`
  margin-top: ${ms(40)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
