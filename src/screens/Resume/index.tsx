import React, {useCallback, useEffect, useRef, useState} from 'react';

import {Text, View} from 'react-native';

import firestore, {firebase} from '@react-native-firebase/firestore';
import {colorCard} from '../../utils/Icons';
import {VictoryPie} from 'victory-native';
import {ITransactionsCard} from '../../@types/TransactionsCard';

import {addMonths, subMonths, format, endOfMonth, startOfMonth} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import {useFocusEffect} from '@react-navigation/native';
import {
  Month,
  MonthSelect,
  MonthSelectButton,
  Content,
  SectionHistoric,
  HeaderHistoric,
  TitleHistoric,
} from './style';
import * as Icon from 'phosphor-react-native';
import ListHistoric from '../../components/Historic/ListHistoric/Index';
import Loading from '../../components/Loading';
import {Filter} from '../../components/Filter';

export default function Resume() {
  const [extrato, setExtrato] = useState<ITransactionsCard[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState<string | 'Todos'>('Todos');

  function handleChangeDate(action: 'next' | 'prev') {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  let primeiroDay = format(
    startOfMonth(selectedDate),
    "dd/MM/yyyy'",
  ).toString();
  let ultimoDiaMes = format(endOfMonth(selectedDate), "dd/MM/yyyy'").toString();
  console.log(primeiroDay, ultimoDiaMes);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      let subscriber = firestore()
        .collection('transationCardBackup')
        .orderBy('created_at', 'desc')
        .limit(20)

        .onSnapshot(querySnapshot => {
          const data = querySnapshot.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          }) as ITransactionsCard[];

          if (filter === 'Todos') {
            setExtrato(data);
          } else {
            setExtrato(data.filter(item => item.category === filter));
          }

          setIsLoading(false);
        });

      return () => subscriber();
    }, [filter]),
  );

  console.log('filter', filter);
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

      <MonthSelect>
        <MonthSelectButton onPress={() => handleChangeDate('prev')}>
          <Icon.ArrowLeft />
        </MonthSelectButton>

        <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>

        <MonthSelectButton onPress={() => handleChangeDate('next')}>
          <Icon.ArrowRight />
        </MonthSelectButton>
      </MonthSelect>

      <SectionHistoric>
        <HeaderHistoric>
          <Filter setFiltro={setFilter} selectedCategory={filter} />
        </HeaderHistoric>

        <Content>
          {isLoading === true ? (
            <View
              style={{
                marginTop: 120,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Loading />
            </View>
          ) : (
            <ListHistoric data={extrato} />
          )}
        </Content>
      </SectionHistoric>
    </View>
  );
}
