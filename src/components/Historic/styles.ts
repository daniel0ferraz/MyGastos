import styled, {css} from 'styled-components/native';
import {ms} from 'react-native-size-matters';
import {RFValue} from 'react-native-responsive-fontsize';

export const ContentItens = styled.TouchableOpacity`
  ${({theme}) => css`
    flex-direction: row;
    justify-content: space-between;
    background: ${theme.colors.white};

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
    width: ${RFValue(50)}px;
    height: ${RFValue(50)}px;
    background: ${theme.colors.light};
    border-radius: ${ms(12)}px;
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
    font-size: ${RFValue(15)}px;
    font-family: ${theme.fonts.Lexend500};
    color: ${theme.colors.dark};
    margin-bottom: ${RFValue(4)}px;
  `}
`;

export const Price = styled.Text`
  ${({theme}) => css`
    font-size: ${RFValue(14)}px;
    font-family: ${theme.fonts.Lexend400};
    color: ${theme.colors.gray};
  `}
`;

export const Date = styled.Text`
  ${({theme}) => css`
    font-size: ${RFValue(14)}px;
    font-family: ${theme.fonts.Lexend400};
    color: ${theme.colors.gray};
  `}
`;

export const Subtitle = styled.Text`
  ${({theme}) => css`
    font-size: ${RFValue(14)}px;
    font-family: ${theme.fonts.Lexend400};
    color: ${theme.colors.gray2};
  `}
`;

export const BoxCardAndDate = styled.View`
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;
