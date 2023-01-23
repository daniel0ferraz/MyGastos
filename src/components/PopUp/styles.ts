import {ms} from 'react-native-size-matters';
import styled, {css} from 'styled-components/native';

export const Wrapper = styled.View`
  ${({theme}) => css`
    flex: 1;

    position: relative;
    justify-content: center;
    align-items: center;
    padding: 2px;
  `}
`;

export const Container = styled.View`
  ${({theme}) => css`
    width: 100%;
    height: ${ms(205)}px;
    border-radius: 8px;
    background-color: ${theme.colors.white};
    align-items: center;
    justify-content: center;
  `}
`;

export const BoxIcon = styled.View`
  ${({theme}) => css`
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    width: 60px;
    height: 60px;
    background: ${theme.colors.green};
  `};
`;

export const Message = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.sizes[20]}px;
    font-weight: 700;
    color: ${theme.colors.gray};
    padding-top: 10px;
  `};
`;
