import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import * as Icon from "phosphor-react-native";

import * as Styled from './styles'
import SelectDropdown  from 'react-native-select-dropdown';
import SelectDropdownProps  from 'react-native-select-dropdown';


type Props =  SelectDropdownProps & {
  options?: any[];
  refSelect: React.RefObject<SelectDropdown>
  placeholder?: string;

};

const { width } = Dimensions.get('window');


export default function Select({ options, placeholder, refSelect, ...rest }: Props) {


  return (
    <>
      <SelectDropdown
        ref={refSelect}
        data={options}
        {...rest}
        defaultButtonText={placeholder}
        
        buttonStyle={styles.dropdown1BtnStyle}
        buttonTextStyle={styles.dropdown1BtnTxtStyle}
        renderDropdownIcon={isOpened => {
          return isOpened ? <Icon.CaretUp size={18} /> : <Icon.CaretDown size={18} />
        }}
        dropdownIconPosition={'right'}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}
      />
    </>
  );
}
const styles = StyleSheet.create({


  // select 2
  dropdown1BtnStyle: {
    width: width / 2.2,
    height: 48,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    marginBottom: 10
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },

  dropdown1DropdownStyle: {
    backgroundColor: '#EFEFEF', borderRadius: 12,
  },
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'center' },

});