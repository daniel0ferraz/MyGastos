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

  // const Itens = [
  //   {
  //     id: 1,
  //     icon: <Icon.ShoppingBagOpen size={32} />,
  //     name: "Compras"
  //   }, {
  //     id: 2,
  //     icon: <Icon.ShoppingBagOpen size={32} />,
  //     name: "Cartões"
  //   }, {
  //     id: 3,
  //     icon: "",
  //     name: "..."
  //   },
  //   {
  //     id: 4,
  //     icon: "",
  //     name: "..."
  //   }

  // ]

  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.BoxIcons
          onPress={() => navigation.navigate('RegisterNewExpense')}>
          <Icon.Wallet size={32} />
        </Styled.BoxIcons>
        <Styled.Label>Carteira</Styled.Label>
      </Styled.Content>

      <Styled.Content>
        <Styled.BoxIcons onPress={() => navigation.navigate('Resume')}>
          <Icon.ChartLineUp size={32} />
        </Styled.BoxIcons>
        <Styled.Label>Resumo</Styled.Label>
      </Styled.Content>
    </Styled.Container>
  );
}
