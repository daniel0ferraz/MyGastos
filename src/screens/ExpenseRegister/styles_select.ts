import {Dimensions, StyleSheet} from 'react-native';

import theme from '../../styles/theme';

export const styles = StyleSheet.create({
  // select1
  dropdown1BtnStyle: {
    width: '47%',
    height: 60,
    backgroundColor: theme.colors.light,
    borderRadius: 8,
  },
  // select2
  dropdown2BtnStyle: {
    width: '100%',
    height: 60,
    backgroundColor: theme.colors.light,
    borderRadius: 8,
  },

  dropdown1BtnTxtStyle: {
    color: theme.colors.gray,
    textAlign: 'left',
    fontSize: 16,
    fontFamily: theme.fonts.Lexend500,
  },

  dropdown1DropdownStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
  },
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {
    color: theme.colors.gray,
    textAlign: 'center',
    fontFamily: theme.fonts.Lexend400,
  },
});
