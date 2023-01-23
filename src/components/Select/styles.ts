import styled, {css} from 'styled-components/native';

export const Label = styled.Text`
  ${({theme}) => css`
    font-size: 16px;
    font-family: ${theme.fonts.Lexend700};
    color: ${theme.colors.gray};
    line-height: 24px;
    margin-bottom: 4px;
  `}
`;
