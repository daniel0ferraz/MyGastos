import styled, {css} from 'styled-components/native';
import {ms} from 'react-native-size-matters';

export const BoxError = styled.View`
  align-items: center;
  justify-content: center;
`;

export const ErrorData = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.gray2};
    font-size: 18px;
    font-family: ${theme.fonts.Lexend400};
  `}
`;
