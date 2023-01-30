import React, {useCallback, useEffect, useRef, useState} from 'react';

import {Text, TouchableOpacity, View} from 'react-native';

import firestore, {firebase} from '@react-native-firebase/firestore';
import {colorCard, colorCategory} from '../../utils/Icons';
import {VictoryPie} from 'victory-native';
import {ITransactionsCard} from '../../@types/TransactionsCard';

import {addMonths, subMonths, format, endOfMonth, startOfMonth} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  Month,
  MonthSelect,
  MonthSelectButton,
  Content,
  SectionHistoric,
  HeaderHistoric,
  TitleHistoric,
  Container,
  Header,
  BoxTitle,
  BoxIcon,
  TitleHeader,
  Legend,
  ContentLegend,
  ContainerLegend,
  BoxLegend,
} from './style';
import * as Icon from 'phosphor-react-native';
import ListHistoric from '../../components/Historic/ListHistoric/Index';
import Loading from '../../components/Loading';
import {Filter} from '../../components/Filter';
import {useTheme} from 'styled-components/native';
import {API} from '../../config';
import {formatToBRL, formatToNumber} from 'brazilian-values';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Filter2 from '../../components/Filter2';

export default function Resume() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [extrato, setExtrato] = useState<ITransactionsCard[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const THEME = useTheme();

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

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      let subscriber = firestore()
        .collection(`${API}`)
        .orderBy('created_at', 'desc')

        .onSnapshot(querySnapshot => {
          const data = querySnapshot.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          }) as ITransactionsCard[];

          if (primeiroDay) {
            setExtrato(
              data.filter(result => {
                return (
                  result.date >= primeiroDay && result.date <= ultimoDiaMes
                );
              }),
            );
          }

          setIsLoading(false);
        });

      return () => subscriber();
    }, [primeiroDay]),
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

  return (
    <Container>
      <Header>
        <BoxTitle>
          <BoxIcon>
            <Icon.ChartLineUp size={30} />
          </BoxIcon>
          <TitleHeader>Resumo</TitleHeader>
        </BoxTitle>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon.ArrowLeft size={30} />
        </TouchableOpacity>
      </Header>
      <SectionHistoric>
        <MonthSelect>
          <MonthSelectButton onPress={() => handleChangeDate('prev')}>
            <Icon.CaretLeft size={30} color={THEME.colors.gray600} />
          </MonthSelectButton>

          <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>

          <MonthSelectButton onPress={() => handleChangeDate('next')}>
            <Icon.CaretRight size={30} color={THEME.colors.gray600} />
          </MonthSelectButton>
        </MonthSelect>

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
            <VictoryPie
              data={dataForPieChart}
              x="category"
              y="value"
              height={200}
              animate={{
                easing: 'elastic',
              }}
              colorScale={dataForPieChart.map((item: any) =>
                colorCategory({category: item.category}),
              )}
              padAngle={({datum}) => datum.y}
              innerRadius={100}
              cornerRadius={10}
              padding={26}
              style={{
                labels: {
                  display: 'none',
                },
              }}
            />
          )}

          <ContentLegend>
            {dataForPieChart.map((item: any) => (
              <>
                <ContainerLegend>
                  <BoxLegend
                    style={{
                      backgroundColor: colorCategory({
                        category: item.category,
                      }),
                    }}
                  />
                  <Legend>{item.category}</Legend>
                </ContainerLegend>
              </>
            ))}
          </ContentLegend>

          {dataForPieChart.length === 0 ? (
            <>
              <Text>Nenhum registro encontrado</Text>
            </>
          ) : null}
        </Content>
      </SectionHistoric>
    </Container>
  );
}
