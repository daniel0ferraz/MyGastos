import {RFValue} from 'react-native-responsive-fontsize';
import {ms} from 'react-native-size-matters';
import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  ${({theme}) => css`
    flex: 1;
    width: 100%;
    background-color: ${theme.colors.white};
    padding: 12px;
  `}
`;

export const Header = styled.View`
  ${({theme}) => css`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: ${theme.sizes[22]}px;
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
    font-size: ${ms(22)}px;
    font-family: ${theme.fonts.Lexend700};
    color: ${theme.colors.gray};
    padding-left: 13px;
  `}
`;

export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding: 12px;
`;

export const MonthSelectButton = styled.TouchableOpacity``;

export const MonthSelectIcon = styled.View`
  width: ${RFValue(32)}px;
  height: ${RFValue(32)}px;
`;

export const Month = styled.Text`
  font-family: ${({theme}) => theme.fonts.Lexend500};
  font-size: ${RFValue(18)}px;
  color: ${({theme}) => theme.colors.gray600};
  text-transform: uppercase;
`;

export const TextInfo = styled.Text`
  font-family: ${({theme}) => theme.fonts.Lexend500};
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.gray600};
`;

export const SectionHistoric = styled.View`
  ${({theme}) => css`
    width: 100%;
    //padding: ${ms(10)}px;
    margin-top: ${ms(10)}px;
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
    background-color: ${theme.colors.white};
  `}
`;

export const ContentLegend = styled.View`
  ${({theme}) => css`
    width: 100%;

    background-color: ${theme.colors.white};
    margin-top: ${ms(5)}px;
    padding: 18px;
    border-radius: 12px;
  `}
`;

export const BoxGroup = styled.View`
  ${({theme}) => css`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  `}
`;

export const BoxIconLegend = styled.View`
  ${({theme}) => css`
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `}
`;

export const BoxLegend = styled.View`
  ${({theme}) => css`
    width: ${ms(14)}px;
    height: ${ms(14)}px;
    border-radius: ${ms(3)}px;
    flex-direction: row;
  `}
`;

export const BoxTextLegend = styled.View`
  ${({theme}) => css``}
`;

export const Legend = styled.Text`
  ${({theme}) => css`
    font-size: ${ms(13)}px;
    color: ${theme.colors.gray600};

    font-family: ${theme.fonts.Lexend500};
    padding-left: 5px;
  `}
`;

export const LegendValue = styled.Text`
  ${({theme}) => css`
    font-size: ${ms(12)}px;
    color: ${theme.colors.gray2};

    font-family: ${theme.fonts.Lexend500};
  `}
`;

export const BoxError = styled.View`
  ${({theme}) => css`
    // flex: 1;
    margin-top: -${ms(10)}px;
    align-items: center;
    justify-content: center;

    padding: 10px;
    border-radius: 12px;
  `}
`;
