import React, {useCallback, useEffect, useRef, useState} from 'react';

import {Text, TouchableOpacity, View, ScrollView} from 'react-native';

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
  BoxIconLegend,
  BoxTextLegend,
  LegendValue,
  BoxLegend,
  BoxGroup,
  BoxError,

  TextInfo,
} from './style';
import * as Icon from 'phosphor-react-native';
import {useTheme} from 'styled-components/native';
import {API} from '../../config';
import {formatToBRL} from 'brazilian-values';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ErrorData} from '../../components/Historic/ListHistoric/styles';
import { converteData } from '../../utils/dateConvert';

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
        .get()
        .then(snapshot => {
          const data = snapshot.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          }) as ITransactionsCard[];


          let dataInicial = converteData(primeiroDay);
          let dataFinal = converteData(ultimoDiaMes);

          let objetosFiltrados = data.filter(result => {
            return (
              converteData(result.date) >= dataInicial &&
              converteData(result.date) <= dataFinal
            );
          });

          setExtrato(objetosFiltrados);
          setIsLoading(false);
        });
    }, [selectedDate]),
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
    'cardId',
    'value',
  );

  return (
    <Container>
      <Header>
        <BoxTitle>
          <BoxIcon>
            <Icon.ChartPieSlice size={30} />
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

          <Month>
            {format(selectedDate, 'MMMM - yyyy', {
              locale: ptBR,
            })}
          </Month>

          <MonthSelectButton onPress={() => handleChangeDate('next')}>
            <Icon.CaretRight size={30} color={THEME.colors.gray600} />
          </MonthSelectButton>
        </MonthSelect>

        <Content>
          <View>
            <VictoryPie
              data={dataForPieChart}
              x="cardId"
              y="value"
              height={220}
              animate={{
                easing: 'bounce',
              }}
              colorScale={dataForPieChart.map((item: any) =>
                colorCard({
                  cardId: item.cardId,
                }),
              )}
              padAngle={({datum}) => datum.y}
              innerRadius={100}
              cornerRadius={4}
              style={{
                labels: {
                  display: 'none',
                },
              }}
            />
          </View>

          <BoxError>
            {dataForPieChart.length === 0 ? (
              <>
                <Icon.ChartPieSlice size={35} color={THEME.colors.gray2} />
                <ErrorData>Nenhum registro encontrado.</ErrorData>
              </>
            ) : null}
          </BoxError>

          {dataForPieChart.length > 0 ? (
            <>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInfo>Cartões mais usados</TextInfo>
              </View>
            </>
          ) : null}
          <ContentLegend>
            {dataForPieChart.map((item: any, index: any) => (
              <>
                <BoxGroup key={item.cardId}>
                  <BoxIconLegend>
                    <BoxLegend
                      style={{
                        backgroundColor: colorCard({
                          cardId: item.cardId,
                        }),
                      }}
                    />

                    <Legend>{item.cardId}</Legend>
                  </BoxIconLegend>

                  <BoxTextLegend>
                    <LegendValue>{formatToBRL(item.value)}</LegendValue>
                  </BoxTextLegend>
                </BoxGroup>
              </>
            ))}
          </ContentLegend>
        </Content>
      </SectionHistoric>
    </Container>
  );
}
