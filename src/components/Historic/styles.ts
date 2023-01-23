import styled, {css} from 'styled-components/native';
import {ms} from 'react-native-size-matters';

export const ContentItens = styled.TouchableOpacity`
  ${({theme}) => css`
    flex-direction: row;
    justify-content: space-between;
    background: ${theme.colors.white};
    border-bottom-color: ${theme.colors.light};
    border-bottom-width: 2px;
    width: 100%;
    height: ${ms(70)}px;
    padding: ${theme.sizes[9]}px;
  `}
`;

export const BoxInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BoxIcon = styled.View`
  ${({theme}) => css`
    align-items: center;
    justify-content: center;
    width: ${ms(50)}px;
    height: ${ms(50)}px;
    background: ${theme.colors.light};
    border-radius: ${ms(15)}px;
    margin-right: 8px;
  `}
`;

export const BoxText = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const Title = styled.Text`
  ${({theme}) => css`
    font-size: 15px;
    font-family: ${theme.fonts.Lexend500};
    color: ${theme.colors.dark};
    margin-bottom: 4px;
  `}
`;

export const Price = styled.Text`
  ${({theme}) => css`
    font-size: 14px;
    font-family: ${theme.fonts.Lexend400};
    color: ${theme.colors.gray};
  `}
`;

export const Date = styled.Text`
  ${({theme}) => css`
    font-size: 14px;
    font-family: ${theme.fonts.Lexend400};
    color: ${theme.colors.gray};
  `}
`;

export const Subtitle = styled.Text`
  ${({theme}) => css`
    font-size: 14px;
    font-family: ${theme.fonts.Lexend400};
    color: ${theme.colors.gray2};
  `}
`;

export const BoxCardAndDate = styled.View`
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;
