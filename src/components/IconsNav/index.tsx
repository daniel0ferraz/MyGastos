import React from 'react';

import {Dimensions, FlatList, Text, View} from 'react-native';
//Icon
import * as Icon from 'phosphor-react-native';
//Styles
import * as Styled from './styles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
//Navigation
import {useNavigation} from '@react-navigation/native';
const {width} = Dimensions.get('window');

export default function IconsNav() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <Styled.Container
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,

        elevation: 15,
      }}>
      <Styled.Content>
        <Styled.BoxIcons
          onPress={() => navigation.navigate('RegisterNewExpense')}>
          <Icon.Wallet size={25} />
        </Styled.BoxIcons>
        <Styled.Label>Carteira</Styled.Label>
      </Styled.Content>

      <Styled.Content>
        <Styled.BoxIcons onPress={() => navigation.navigate('Resume')}>
          <Icon.ChartLineUp size={25} />
        </Styled.BoxIcons>
        <Styled.Label>Resumo</Styled.Label>
      </Styled.Content>
    </Styled.Container>
  );
}
