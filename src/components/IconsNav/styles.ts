import {Dimensions} from 'react-native';
import {ms} from 'react-native-size-matters';
import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  ${({theme}) => css`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    background-color: ${theme.colors.white};
    padding: ${ms(5)}px;
    border-radius: ${ms(12)}px;
    position: relative;
  `}
`;

export const Content = styled.View`
  align-items: center;
  justify-content: center;
`;

export const BoxIcons = styled.TouchableOpacity`
  ${({theme}) => css`
    width: ${ms(45)}px;
    height: ${ms(45)}px;
    background: ${theme.colors.white};
    align-items: center;
    justify-content: center;
    border-radius: ${ms(12)}px;
  `}
`;

export const Label = styled.Text`
  ${({theme}) => css`
    font-size: ${ms(15)}px;
    padding-top: 1px;
    font-family: ${theme.fonts.Lexend700};
    color: ${theme.colors.gray};
  `}
`;
