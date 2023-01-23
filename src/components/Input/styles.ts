import styled, {css} from 'styled-components/native';
import {TextInput, Dimensions} from 'react-native';

const inputWD = 60 + '%';

type Props = {
  sizeInput?: any;
};

export const Container = styled.View`
  /* flex: 1; */
  width: 100%;
  /* background: green; */
`;

export const Label = styled.Text`
  ${({theme}) => css`
    font-size: 16px;
    font-family: ${theme.fonts.Lexend700};
    color: ${theme.colors.gray};
    line-height: 24px;
    margin-bottom: 4px;
  `}
`;

export const InputText = styled(TextInput)<Props>`
  ${({theme, sizeInput}) => css`
    width: ${sizeInput ? sizeInput : '180px'};
    height: 60px;
    color: ${theme.colors.gray};
    background: ${theme.colors.light};
    border-radius: 8px;
    font-size: 16px;
    font-family: ${theme.fonts.Lexend500};

    padding: 0 16px;
    margin-bottom: 10px;
  `}
`;
