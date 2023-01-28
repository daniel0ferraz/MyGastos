import {RFValue} from 'react-native-responsive-fontsize';
import {ms} from 'react-native-size-matters';
import styled, {css} from 'styled-components/native';

export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-bottom: 10px;
`;

export const MonthSelectButton = styled.TouchableOpacity``;

export const MonthSelectIcon = styled.View`
  width: ${RFValue(24)}px;
  height: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-family: ${({theme}) => theme.fonts.Lexend500};
  font-size: ${RFValue(20)}px;
`;

export const SectionHistoric = styled.View`
  ${({theme}) => css`
    flex: 1;

    width: 100%;
    //padding: ${ms(10)}px;
    margin-top: ${ms(43)}px;
    background: ${theme.colors.white};
    border-radius: 12px;
  `}
`;

export const HeaderHistoric = styled.View`
  ${({theme}) => css`
    margin-top: ${ms(5)}px;
    margin-bottom: ${ms(5)}px;
    flex-direction: row;
    align-items: center;
    padding: ${ms(12)}px;
  `}
`;

export const TitleHistoric = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.sizes[20]}px;
    color: ${theme.colors.dark};
    font-family: ${theme.fonts.Lexend500};
  `}
`;

export const FilterIcon = styled.TouchableOpacity``;

export const Content = styled.View`
  ${({theme}) => css`
    flex: 1;
    background-color: ${theme.colors.white};
  `}
`;
