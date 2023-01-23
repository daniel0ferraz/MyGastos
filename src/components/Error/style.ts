import {ms} from 'react-native-size-matters';
import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const BoxIcon = styled.View`
  ${({theme}) => css`
    width: ${ms(60)};
    height: ${ms(60)};
    border-radius: ${ms(30)};
    align-items: center;
    justify-content: center;
    background: ${theme.colors.light};
    margin-bottom: ${theme.sizes[12]}px;
  `}
`;

export const Title = styled.Text`
  ${({theme}) => css`
    font-weight: 700;
    font-size: ${ms(19)}px;
    color: ${theme.colors.dark};
  `}
`;
