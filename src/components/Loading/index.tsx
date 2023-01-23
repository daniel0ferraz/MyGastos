import { useTheme } from 'styled-components/native';
import React from 'react';

import {
  ActivityIndicator,
  View
} from 'react-native';



export default function Loading() {
  
  const THEME = useTheme();
  return (
    <View style={{flex: 1}}>
      <ActivityIndicator size="large" color={THEME.colors.blue}/> 
    </View>
  );
}