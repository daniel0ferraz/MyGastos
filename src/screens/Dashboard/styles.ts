import {Dimensions} from 'react-native';
import {ms} from 'react-native-size-matters';
import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  ${({theme}) => css`
    width: 100%;
    padding: ${ms(15)}px;
    background: ${theme.colors.light};
  `}
`;

export const Header = styled.View`
  ${({theme}) => css`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `}
`;

export const BoxContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BoxInfo = styled.View`
  padding-left: 12px;
`;

export const InfoText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.sizes[16]}px;
    color: ${theme.colors.gray};
    font-family: ${theme.fonts.Lexend400};
  `}
`;

export const InfoPage = styled.Text`
  ${({theme}) => css`
    font-size: ${ms(16)}px;
    color: ${theme.colors.dark};
    font-family: ${theme.fonts.Lexend700};
    padding-top: 5px;
    font
  `}
`;

export const BoxIcon = styled.TouchableOpacity`
  ${({theme}) => css`
    align-items: center;
    justify-content: center;

    width: ${ms(60)}px;
    height: ${ms(60)}px;
    border-radius: ${ms(12)}px;
    background: ${theme.colors.white};
  `}
`;

export const BtnLoggout = styled.TouchableOpacity`
  ${({theme}) => css`
    align-items: center;
    justify-content: center;
    width: ${ms(60)}px;
    height: ${ms(60)}px;
  `}
`;

export const SectionCards = styled.View`
  ${({theme}) => css`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: ${ms(51)}px;
  `}
`;

export const BoxExpense = styled.View`
  ${({theme}) => css`
    background: ${theme.colors.white};
    width: ${ms(160)}px
    height: ${ms(95)}px;
    border-radius: 15px;
    padding: 15px;
  `}
`;

export const ExpenseIcon = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ExpenseInfo = styled.Text`
  ${({theme}) => css`
    font-family: ${theme.fonts.Lexend500};
    font-size: 18px;
    color: ${theme.colors.dark};
  `}
`;

export const ExpenseValue = styled.Text`
  ${({theme}) => css`
    font-family: ${theme.fonts.Lexend500};
    font-size: ${ms(20)}px;
    color: ${theme.colors.dark};
    /* margin-top: ${ms(15)}; */
    padding-top: 10px;
  `}
`;

export const SectionMenu = styled.View`
  ${({theme}) => css`
    padding-top: ${ms(48)}px;
    margin-bottom: ${ms(31)}px;
  `}
`;

export const TextInfoCards = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.gray};
    font-size: ${theme.sizes[18]}px;
    font-family: ${theme.fonts.Lexend900};
  `}
`;

export const ContainerCards = styled.View`
  ${({theme}) => css`
    width: 100%;
    align-items: flex-start;
    justify-content: flex-start;

    padding-top: ${theme.sizes[5]}px;
    padding-bottom: ${theme.sizes[5]}px;
    margin-bottom: 25px;
    margin-top: 10px;
  `}
`;

export const SectionHistoric = styled.View`
  ${({theme}) => css`
    flex: 1;
    width: 100%;
    background: ${theme.colors.white};
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding: ${theme.sizes[12]}px;
  `}
`;

export const HeaderHistoric = styled.View`
  ${({theme}) => css`
    margin-top: 8px;
    margin-bottom: 8px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${theme.sizes[12]}px;
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
  `}
`;
