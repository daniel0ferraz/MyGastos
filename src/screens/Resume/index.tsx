import React, {useCallback, useEffect, useRef, useState} from 'react';

import {Text, View} from 'react-native';

import firestore, {firebase} from '@react-native-firebase/firestore';
import {colorCard, colorCategory} from '../../utils/Icons';
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

  const ultimoDiaMes = format(
    endOfMonth(selectedDate),
    "dd/MM/yyyy'",
  ).toString();

  console.log(primeiroDay, ultimoDiaMes);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      let subscriber = firestore()
        .collection('transationCardBackup')
        .orderBy('created_at', 'desc')

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

          /*   if (selectedDate) {
            setExtrato(
              data.filter(result => {
                return (
                  result.date >= primeiroDay && result.date <= ultimoDiaMes
                );
              }),
            );
          } */

          setIsLoading(false);
        });

      return () => subscriber();
    }, [filter]),
  );

  // Código inspirado em https://www.tutorialspoint.com/aggregate-records-in-javascript
  /**
   * Agrega e soma um array de objetos simples (não tem suporte a objetos aninhados)
   * @param {Object[]} array um array com os objetos a serem agregados
   * @param {string} idProp qual campo torna cada objeto do array uma "categoria"
   * @param {string} valueProp qual campo traz o valor numerico a ser somado
   */

  const aggregateOnSimpleObjectArray = (
    array: ITransactionsCard,
    idProp: string,
    valueProp: string,
  ) => {
    return array.reduce(
      (acc: {[x: string]: any}[], val: {[x: string]: any}) => {
        const index = acc.findIndex((obj: {[x: string]: any}) => {
          return obj[idProp] === val[idProp];
        });
        if (index !== -1) {
          acc[index][valueProp] += val[valueProp];
        } else {
          acc.push({
            [idProp]: val[idProp],
            [valueProp]: val[valueProp],
          });
        }
        return acc;
      },
      [],
    );
  };

  const dataForPieChart = aggregateOnSimpleObjectArray(
    extrato,
    'category',
    'value',
  );

  console.log(dataForPieChart);

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
          {/*  {isLoading === true ? (
            <View
              style={{
                marginTop: 120,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Loading />
            </View>
          ) : ( */}

          <VictoryPie
            data={dataForPieChart}
            x="category"
            y="value"
            animate={{
              easing: 'elasticOut',
            }}
            colorScale={dataForPieChart.map((item: any) =>
              colorCategory({category: item.category}),
            )}
            padAngle={({datum}) => datum.y}
            innerRadius={100}
            style={{
              labels: {
                fontSize: 5,
              },
            }}
          />

          {dataForPieChart.length === 0 ? (
            <>
              <Text>Nenhum registro encontrado</Text>
            </>
          ) : null}
        </Content>
      </SectionHistoric>
    </View>
  );
}
