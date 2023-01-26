import React, {useEffect, useRef, useState} from 'react';

import {Text, View} from 'react-native';
import {Animated} from 'react-native';
import Button from '../../components/Button';
import firestore from '@react-native-firebase/firestore';
import {colorCard} from '../../utils/Icons';

const dataTest = [
  {
    cardId: 1,
    category: 'Boletos/Faturas mensais',
    value: 73.76,
  },
  {
    cardId: 2,
    category: 'Roupas',
    value: 93.76,
  },
  {
    cardId: 3,
    category: 'Supermercado',
    value: 73.76,
  },
  {
    cardId: 4,
    category: 'Bebidas',
    value: 73.76,
  },
  {
    cardId: 5,
    category: 'Alimentação',
    value: 73.76,
  },
  {
    cardId: 6,
    category: 'Saúde',
    value: 73.76,
  },
  {
    cardId: 7,
    category: 'Viagens',
    value: 73.76,
  },
  {
    cardId: 8,
    category: 'Estética',
    value: 73.76,
  },
];

export default function Resume() {
  const [dataCard, setDataCard] = useState([]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View>
        <Text>Percentual de gastos</Text>
      </View>

      <View></View>
    </View>
  );
}
