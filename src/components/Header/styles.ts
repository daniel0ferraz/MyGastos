import styled, {css} from 'styled-components/native';
import {Dimensions} from 'react-native';
import {ms} from 'react-native-size-matters';
import {MotiView} from 'moti';

export const Header = styled.View`
  ${({theme}) => css`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `}
`;

export const BoxContent = styled(MotiView)`
  flex-direction: row;
  align-items: center;
`;

export const BoxInfo = styled.View`
  padding-left: 12px;
`;

export const InfoText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.sizes[16]}px;
    color: ${theme.colors.white};
    font-family: ${theme.fonts.Lexend400};
  `}
`;

export const InfoPage = styled.Text`
  ${({theme}) => css`
    font-size: ${ms(16)}px;
    color: ${theme.colors.light};
    font-family: ${theme.fonts.Lexend700};
    padding-top: 5px;
  `}
`;

export const BoxIcon = styled.TouchableOpacity`
  ${({theme}) => css`
    align-items: center;
    justify-content: center;

    width: ${ms(50)}px;
    height: ${ms(50)}px;
    border-radius: ${ms(12)}px;
    background: ${theme.colors.gray2};
  `}
`;

export const BtnLoggout = styled.TouchableOpacity`
  ${({theme}) => css`
    align-items: center;
    justify-content: center;

    height: ${ms(60)}px;
  `}
`;

export const Skerlaton = styled.View`
  ${({theme}) => css`
    width: ${ms(90)}px;
    height: ${ms(10)}px;
    background: ${theme.colors.gray2};
    border-radius: ${ms(12)}px;
    margin-bottom: ${ms(8)}px;
  `}
`;
