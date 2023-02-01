import {StyleSheet} from 'react-native';
import {useTheme} from 'styled-components/native';

import theme from '../../styles/theme';
export const style = StyleSheet.create({
  input: {
    width: '47%',
    height: 60,
    padding: 8,
    marginTop: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.light,
    fontFamily: theme.fonts.Lexend500,
    color: theme.colors.gray,
    fontSize: 16,
  },
});
