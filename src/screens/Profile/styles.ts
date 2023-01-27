import {ms} from 'react-native-size-matters';
import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  ${({theme}) => css`
    flex: 1;
    padding: ${ms(12)}px;
    background: ${theme.colors.white};
  `}
`;

export const Goback = styled.TouchableOpacity`
  ${({theme}) => css`
    margin-top: ${ms(10)}px;
  `}
`;

export const ContentPhoto = styled.View`
  justify-content: center;
  align-items: center;
`;

export const BoxProfile = styled.View`
  ${({theme}) => css`
    width: ${ms(130)}px;
    height: ${ms(130)}px;
    border-radius: ${ms(12)}px;
    justify-content: center;
    align-items: center;
    background: ${theme.colors.gray600};
    margin-top: ${ms(10)}px;
  `}
`;

export const IconPhoto = styled.TouchableOpacity`
  ${({theme}) => css`
    position: relative;
    width: ${ms(35)}px;
    height: ${ms(35)}px;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: ${theme.colors.gray2};
    bottom: ${ms(10)}px;
  `}
`;

export const BtnSpace = styled.View`
  padding-top: ${ms(20)}px;
`;
