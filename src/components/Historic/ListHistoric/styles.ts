import styled, {css} from 'styled-components/native';
import {ms} from 'react-native-size-matters';
import {RFValue} from 'react-native-responsive-fontsize';

export const BoxError = styled.View`
  align-items: center;
  justify-content: center;
`;

export const ErrorData = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.gray2};
    font-size: ${RFValue(18)}px;
    font-family: ${theme.fonts.Lexend400};
  `}
`;

export const Separator = styled.View`
  width: 100%;
  height: 2px;
  background-color: ${({theme}) => theme.colors.light};
`;
