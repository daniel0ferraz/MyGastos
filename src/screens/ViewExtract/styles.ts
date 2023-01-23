import {Dimensions} from 'react-native';
import {ms} from 'react-native-size-matters';
import styled, {css} from 'styled-components/native';

type Props = {
  typeExpense: string;
};

export const Container = styled.View`
  ${({theme}) => css`
    width: 100%;
    height: ${Dimensions.get('window').height}px;
    padding: ${theme.sizes[9]}px;
    background: ${theme.colors.white};
    padding: 20px 40px;
  `};
`;

export const BtnGoBack = styled.TouchableOpacity`
  ${({theme}) => css`
    align-items: flex-start;
    justify-content: center;
    padding-top: ${theme.sizes[18]}px;
    /* margin-bottom: ${theme.sizes[20]}px; */
  `}
`;

export const Header = styled.View`
  ${({theme}) => css`
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-top: ${theme.sizes[9]}px;
  `}
`;

export const BoxTitle = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 16px;
`;

export const BoxIcon = styled.View`
  ${({theme}) => css`
    width: ${ms(60)}px;
    height: ${ms(60)}px;
    border-radius: 12px;

    align-items: center;
    justify-content: center;

    background: ${theme.colors.light};
  `}
`;

export const TitleHeader = styled.Text<Props>`
  ${({theme, typeExpense}) => css`
    font-size: ${ms(22)}px;
    font-family: ${theme.fonts.Lexend500};
    color: ${typeExpense === 'Entrada' ? theme.colors.green : theme.colors.red};
  `}
`;

export const ValueExpenser = styled.Text`
  ${({theme}) => css`
    font-family: ${theme.fonts.Lexend500};
    color: ${theme.colors.dark};
    padding-top: ${ms(8)}px;
    font-size: ${ms(25)}px;
  `}
`;

export const Form = styled.View``;
export const FormField = styled.View``;

export const BoxLine = styled.View`
  ${({theme}) => css`
    margin-top: ${ms(48)}px;
  `}
`;

export const LegendExtract = styled.Text`
  ${({theme}) => css`
    font-family: ${theme.fonts.Lexend400};
    font-size: ${ms(14)}px;
    color: #4a4a49;
    padding-bottom: ${ms(10)}px;
  `}
`;

export const Line = styled.View`
  ${({theme}) => css`
    width: 100%;
    height: 0px;
    border: 1px solid #dbe2ea;
  `}
`;

export const Extract = styled.View``;

export const BoxDate = styled.View`
  padding-top: ${ms(15)}px;
`;

export const DateExtract = styled.Text`
  ${({theme}) => css`
    font-family: ${theme.fonts.Lexend400};
    font-size: ${ms(18)}px;
    color: ${theme.colors.dark};
  `}
`;

export const BoxRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${ms(22)}px;
`;

export const BoxRowCard = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${ms(5)}px;
`;

export const NameExtract = styled.Text`
  ${({theme}) => css`
    font-family: ${theme.fonts.Lexend300};
    font-size: ${ms(16)}px;
    color: ${theme.colors.gray};
    line-height: 35px;
  `}
`;

export const BoxValue = styled.View`
  align-items: flex-end;
  justify-content: center;
`;

export const ValueExtract = styled.Text`
  ${({theme}) => css`
    font-family: ${theme.fonts.Lexend400};
    font-size: ${ms(16)}px;
    color: ${theme.colors.gray};
    line-height: 35px;
  `}
`;

export const BoxInfoCard = styled.View`
  align-items: center;
`;

export const NameCard = styled.Text`
  ${({theme}) => css`
    font-size: ${ms(14)}px;
    font-family: ${theme.fonts.Lexend400};
    color: ${theme.colors.gray};
  `}
`;

export const SpaceLine = styled.View`
  padding-top: ${ms(20)}px;
`;

export const ButtonGroup = styled.View`
  margin-top: ${ms(40)}px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  ${({theme}) => css`
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: ${ms(170)}px;
    height: ${ms(49)}px;
    border-radius: 8px;
    /* background: ${theme.colors.blue}; */
  `}
`;

export const ButtonText = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.gray};
    font-size: ${ms(16)}px;
    font-family: ${theme.fonts.Lexend400};
  `}
`;
