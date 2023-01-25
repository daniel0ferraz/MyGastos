import styled, {css} from 'styled-components/native';
import {TextInputMask} from 'react-native-masked-text';

type propsContainer = {
  width: any;
};

export const Container = styled.View<propsContainer>`
  ${({theme, width}) => css`
    width: ${width ? width : '100%'};
    height: 60px;
    margin-top: 14px;
    padding: 8px;
    background-color: ${theme.colors.light};
    border-radius: 8px;
    flex-direction: row;
    align-items: center;
  `}
`;

export const TextInput = styled.TextInput`
  ${({theme}) => css`
    width: 100%;
    margin-left: 8px;
    font-family: ${theme.fonts.Lexend500};
    font-size: 16px;
    color: ${theme.colors.gray};
  `}
`;

export const MaskTextInput = styled(TextInputMask)`
  ${({theme}) => css`
    width: 100%;
    margin-left: 8px;
    font-family: ${theme.fonts.Lexend500};
    font-size: 16px;
    color: ${theme.colors.gray};
  `}
`;

export const IconButton = styled.TouchableOpacity`
  margin-right: 10px;
  position: absolute;
  right: 10px;
  top: 17px;
`;
