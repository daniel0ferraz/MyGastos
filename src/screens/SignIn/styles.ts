import {ms} from 'react-native-size-matters';
import styled, {css} from 'styled-components/native';
import {Button} from '../ViewExtract/styles';

export const Container = styled.View`
  ${({theme}) => css`
    flex: 1;
    background: ${theme.colors.gray600};
    padding: 12px;
  `}
`;

export const BoxLogo = styled.View`
  ${({theme}) => css`
    justify-content: center;
    align-items: center;
    margin-top: ${ms(20)}px;
  `}
`;

export const Form = styled.View`
  ${({theme}) => css`
    margin-top: 25px;
  `}
`;

export const InputSpace = styled.View`
  ${({theme}) => css`
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding-bottom: 15px;
  `}
`;

export const BtnSpace = styled.View`
  ${({theme}) => css`
    margin-top: 30px;
  `}
`;

export const BoxNewAccount = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 35px;
`;

export const TitleLink = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.white};
    font-size: 14px;
    font-family: ${theme.fonts.Lexend700};
  `}
`;
