import {ms} from 'react-native-size-matters';
import styled, {css} from 'styled-components/native';

export const Container = styled.View`

`;

export const FilterIcon = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const DateFilter = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.sizes[12]}px;
    color: ${theme.colors.dark};
    font-family: ${theme.fonts.Lexend500};
  `}
`;

export const ContentItens = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  //margin-top: 15px;
 // padding-bottom: 5px;
 padding: 10px;

`;

export const Button = styled.TouchableOpacity`
  ${({theme}) => css`
  margin-right: 10px;
  padding: 6px
  border-radius: ${ms(9)}px;
  border: 1px
  `}
`;

export const ButtonText = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.white};
    font-size: ${ms(12)}px;
    font-family: ${theme.fonts.Lexend500};
  `}
`;
