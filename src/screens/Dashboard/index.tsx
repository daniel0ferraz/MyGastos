import React, {useCallback, useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
//Icon
import * as Icon from 'phosphor-react-native';
//Components
import ListHistoric from '../../components/Historic/ListHistoric/Index';
import IconsNav from '../../components/IconsNav';
import Loading from '../../components/Loading';
import {Filter} from '../../components/Filter';
import Header from '../../components/Header';

//Navigation
import {useFocusEffect} from '@react-navigation/native';

// services and Types
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
import {ITransactionsCard} from '../../@types/TransactionsCard';
import {User} from '../../@types/User';

//Styles
import * as Styled from './styles';
import {useTheme} from 'styled-components/native';
import {formatToBRL, parseToNumber} from 'brazilian-values';
import {API} from '../../config';
import {addMonths, endOfMonth, format, startOfMonth, subMonths} from 'date-fns';
import {converteData} from '../../utils/dateConvert';
import {DateFilter, FilterIcon} from '../../components/Filter/styles';
import {ptBR} from 'date-fns/locale';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState<User>({} as User);
  const [extrato, setExtrato] = useState<ITransactionsCard[]>([]);
  const [filter, setFilter] = useState<string | 'Todo'>('Tudo');
  const [selectedDate, setSelectedDate] = useState(new Date());

  let primeiroDay = format(
    startOfMonth(selectedDate),
    "dd/MM/yyyy'",
  ).toString();

  let ultimoDiaMes = format(endOfMonth(selectedDate), "dd/MM/yyyy'").toString();

  const THEME = useTheme();

  const filterValorGastos = extrato?.filter(
    (data: ITransactionsCard) => data.type === 'Gastos',
  );
  const valorDespesas = filterValorGastos?.reduce(
    (soma, item: ITransactionsCard) => soma + Number(item?.value),
    0,
  );

  const filterValorEntradas = extrato?.filter(
    (data: ITransactionsCard) => data.type === 'Entrada',
  );
  const valorEntradas = filterValorEntradas?.reduce(
    (soma, item: ITransactionsCard) => soma + Number(item?.value),
    0,
  );

  let valorTotal = valorEntradas;

  function handleChangeDate(action: 'next' | 'prev') {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
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


          let extratoUsuario = data.filter(
            (data: ITransactionsCard) =>
              data.userId === firebase.auth().currentUser?.uid,
          );
          
          let dataInicial = converteData(primeiroDay);
          let dataFinal = converteData(ultimoDiaMes);

          let objetosFiltrados = extratoUsuario.filter(result => {
            return (
              converteData(result.date) >= dataInicial &&
              converteData(result.date) <= dataFinal
            );
          });

          if (filter === 'Tudo') {
            setExtrato(objetosFiltrados);
          } else {
            setExtrato(
              objetosFiltrados.filter(item => item.category === filter),
            );
          }
          setLoading(false);
        });

      return () => subscriber();
    }, [filter, selectedDate]),
  );

  useFocusEffect(
    useCallback(() => {
      firestore()
        .collection('users')
        .where('id', '==', firebase.auth().currentUser?.uid)
        .get()
        .then(querySnapshot => {
          const data: any = [];
          querySnapshot.forEach(documentSnapshot => {
            data.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          const user = data.find(
            (item: User) => item.id === firebase.auth().currentUser?.uid,
          );

          setCredentials(user);
        });
    }, []),
  );

  return (
    <SafeAreaView style={{backgroundColor: THEME.colors.white, height: '100%'}}>
      <Styled.Container>
        <Header userInfo={credentials} />

        <Styled.SectionCards>
          <Styled.SectionCardTotal>
            <Styled.TextInfo>Saldo</Styled.TextInfo>
            <Styled.TextTotal>
              {formatToBRL(valorTotal - valorDespesas)}
            </Styled.TextTotal>
          </Styled.SectionCardTotal>

          <Styled.RowCards>
            <Styled.BoxExpense>
              <Styled.ExpenseIcon>
                <Styled.ExpenseInfo>Entradas</Styled.ExpenseInfo>
                <Icon.CurrencyCircleDollar
                  size={32}
                  color={THEME.colors.green}
                />
              </Styled.ExpenseIcon>
              <Styled.ExpenseValue>
                {formatToBRL(valorEntradas || 0)}
              </Styled.ExpenseValue>
            </Styled.BoxExpense>

            <Styled.BoxExpense>
              <Styled.ExpenseIcon>
                <Styled.ExpenseInfo>Gastos</Styled.ExpenseInfo>
                <Icon.CurrencyCircleDollar size={32} color={THEME.colors.red} />
              </Styled.ExpenseIcon>
              <Styled.ExpenseValue>
                {formatToBRL(valorDespesas || 0)}
              </Styled.ExpenseValue>
            </Styled.BoxExpense>
          </Styled.RowCards>
        </Styled.SectionCards>
        <Styled.SectionMenu>
          <IconsNav />
            </Styled.SectionMenu>
          </Styled.Container>

      <Styled.SectionHistoric>
        <Styled.BoxInfoAndFilter>
          <Styled.ContainerHeader>
            <Styled.TitleHistoric>Movimentações</Styled.TitleHistoric>
          </Styled.ContainerHeader>

          <Styled.SectionFilterDate>
            <FilterIcon
              onPress={() => {
                handleChangeDate('prev');
              }}>
              <Icon.CaretLeft />
            </FilterIcon>

            <DateFilter>
              {format(selectedDate, " MMM 'de' yyyy'", {
                locale: ptBR,
              })}
            </DateFilter>

            <FilterIcon
              onPress={() => {
                handleChangeDate('next');
              }}>
              <Icon.CaretRight />
            </FilterIcon>
          </Styled.SectionFilterDate>
        </Styled.BoxInfoAndFilter>


        <Styled.BoxFilter>
          <Filter setFiltro={setFilter} selectedCategory={filter} />
        </Styled.BoxFilter>

        <Styled.Content>
          {loading === true ? (
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
        </Styled.Content>
      </Styled.SectionHistoric>
    </SafeAreaView>
  );
}
