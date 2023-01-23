import {TouchableOpacity} from 'react-native';
import styled, {css} from 'styled-components/native';
import {PropsButton} from '.';

type Props = Pick<PropsButton, 'size' | 'textColor'>;

const modifierButton = {
  // Size
  Small: () => css`
    width: 89px;
    height: 24px;
  `,
  Medium: () => css`
    width: 160px;
    height: 55px;
  `,

  Large: () => css`
    width: 100%;
    height: 55px;
  `,

  //

  // Text Color
  White: () => css`
    color: ${({theme}) => theme.colors.white};
  `,
  Bluetxt: () => css`
    color: ${({theme}) => theme.colors.blue};
  `,
};

export const Button = styled(TouchableOpacity)<Props>`
  ${({size}) => css`
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    ${!!size && modifierButton[size]()}
    background: red;
  `}
`;

export const TextButton = styled.Text<Props>`
  ${({theme, textColor}) => css`
    font-size: 14px;
    line-height: 24px;
    font-family: ${theme.fonts.Lexend500};
    ${!!textColor && modifierButton[textColor]};
  `}
`;
