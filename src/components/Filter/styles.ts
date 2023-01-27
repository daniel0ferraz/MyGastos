import {ms} from 'react-native-size-matters';
import styled, {css} from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const TitleHistoric = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.sizes[20]}px;
    color: ${theme.colors.dark};
    font-family: ${theme.fonts.Lexend500};
  `}
`;

export const FilterIcon = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const ContentItens = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 15px;
`;

export const Button = styled.TouchableOpacity`
  ${({theme}) => css`
    width: ${ms(100)}px;
    height: 30px;

    border-radius: ${ms(12)}px;

    justify-content: center;
    align-items: center;
    margin-right: 10px;
  `}
`;
export const ButtonText = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.white};
    font-size: ${ms(10)}px;
    word-wrap: break-word;

    font-family: ${theme.fonts.Lexend500};
  `}
`;
