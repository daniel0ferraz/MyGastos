import {ms} from 'react-native-size-matters';
import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.View`
  align-items: center;
  justify-content: center;
`;

export const BoxIcons = styled.TouchableOpacity`
  ${({theme}) => css`
    width: ${ms(60)}px;
    height: ${ms(60)}px;
    background: ${theme.colors.white};
    align-items: center;
    justify-content: center;
    border-radius: 15px;
  `}
`;

export const Label = styled.Text`
  ${({theme}) => css`
    font-size: 15px;
    padding-top: 11px;
    font-family: ${theme.fonts.Lexend700};
    color: ${theme.colors.dark};
  `}
`;
