import {Dimensions} from 'react-native';
import {ms} from 'react-native-size-matters';
import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  ${({theme}) => css`
    width: 100%
    height: ${Dimensions.get('window').height / 2.2}px;
    padding: ${ms(15)}px;
    background: ${theme.colors.gray600};
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  `}
`;

export const SectionCards = styled.View`
  flex-direction: column;
  padding-top: ${ms(2)}px;
`;

export const RowCards = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: ${ms(20)}px;
`;

export const SectionCardTotal = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: ${ms(20)}px;
`;

export const TextInfo = styled.Text`
  ${({theme}) => css`
    font-family: ${theme.fonts.Lexend500};
    font-size: ${ms(17)}px;
    color: ${theme.colors.white};
  `}
`;

export const TextTotal = styled.Text`
  ${({theme}) => css`
    font-family: ${theme.fonts.Lexend600};
    font-size: ${ms(26)}px;
    color: ${theme.colors.light};
  `}
`;

export const SectionMenu = styled.View`
  top: -${ms(5)}px;
  padding: ${ms(25)}px;
`;

export const BoxExpense = styled.View`
  ${({theme}) => css`
    background: ${theme.colors.white};
    width: ${ms(160)}px
    height: ${ms(95)}px;
    border-radius: 15px;
    padding: ${ms(15)}px;
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
    padding-top: ${ms(10)}px;
  `}
`;

export const TextInfoCards = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.gray};
    font-size: ${theme.sizes[18]}px;
    font-family: ${theme.fonts.Lexend900};
  `}
`;

export const SectionHistoric = styled.View`
  flex: 1;
  margin-top: ${ms(30)}px;
`;

export const BoxInfoAndFilter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${ms(10)}px;
  margin-top: ${ms(15)}px;
  margin-bottom: ${ms(8)}px;
`;

export const BoxFilter = styled.View`
  ${({theme}) => css`
    margin-bottom: ${ms(5)}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `}
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TitleHistoric = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.sizes[20]}px;
    color: ${theme.colors.dark};
    font-family: ${theme.fonts.Lexend500};
    padding-bottom: 5px;
  `}
`;

export const SectionFilterDate = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FilterIcon = styled.TouchableOpacity``;

export const Content = styled.View`
  ${({theme}) => css`
    flex: 1;
    background-color: ${theme.colors.white};
  `}
`;
