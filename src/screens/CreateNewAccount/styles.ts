import {ms} from 'react-native-size-matters';
import styled, {css} from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  ${({theme}) => css`
    flex: 1;
    background: ${theme.colors.gray600};
    padding: 12px;
  `}
`;

export const BoxTitle = styled.View`
  ${({theme}) => css`
    justify-content: center;
    align-items: center;
    margin-top: ${ms(20)}px;
  `}
`;

export const Title = styled.Text`
  ${({theme}) => css`
    font-size: ${ms(35)}px;
    font-family: ${theme.fonts.Lexend600};
    color: ${theme.colors.white};
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

export const ContentPhoto = styled.View`
  justify-content: center;
  align-items: center;
`;


export const BoxProfile = styled.View`
  ${({theme}) => css`
    width: ${ms(120)}px;
    height: ${ms(120)}px;
    border-radius: ${ms(12)}px;
    justify-content: center;
    align-items: center;
    background: ${theme.colors.light};
    margin-top: ${ms(10)}px;
  `}
`;

export const IconPhoto = styled.TouchableOpacity`
  ${({theme}) => css`
    position: relative;
    width: ${ms(35)}px;
    height: ${ms(35)}px;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: ${theme.colors.gray2};
    bottom: ${ms(10)}px;
  `}
`;
