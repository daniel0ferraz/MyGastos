import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorBase,
  Text,
  TouchableOpacityProps,
  View,
} from 'react-native';
import * as Styled from './styles';
import {useTheme} from 'styled-components/native';

export type PropsButton = TouchableOpacityProps & {
  children: React.ReactNode;
  size?: 'Small' | 'Medium' | 'Large';
  icon?: any;
  textColor?: 'White' | 'Bluetxt';
  isLoading?: boolean;
};

export default function Button({
  children,
  size = 'Medium',
  textColor = 'White',
  isLoading,
  icon,
  ...rest
}: PropsButton) {
  const THEME = useTheme();
  return (
    <>
      <Styled.Button disabled={isLoading} size={size} {...rest}>
        {isLoading ? (
          <ActivityIndicator color={THEME.colors.white} />
        ) : (
          <View>
            <Styled.TextButton textColor={textColor}>
              {children}
            </Styled.TextButton>
          </View>
        )}
      </Styled.Button>
    </>
  );
}
