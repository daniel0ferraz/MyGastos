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
import {formatToBRL} from 'brazilian-values';
import {API} from '../../config';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState<User>({} as User);
  const [extrato, setExtrato] = useState<ITransactionsCard[]>([]);
  const [filter, setFilter] = useState<string | 'Todos'>('Todos');

  const THEME = useTheme();

  const filterValorGastos = extrato?.filter(
    (data: ITransactionsCard) => data.type === 'Gastos',
  );
  const valorDespesas = filterValorGastos?.reduce(
    (soma, item: ITransactionsCard) => soma + parseFloat(item.value),
    0,
  );

  const filterValorEntradas = extrato?.filter(
    (data: ITransactionsCard) => data.type === 'Entrada',
  );
  const valorEntradas = filterValorEntradas?.reduce(
    (soma, item: ITransactionsCard) => soma + parseFloat(item.value),
    0,
  );

  let valorTotal = valorEntradas;

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      let subscriber = firestore()
        .collection(`${API}`)
        .orderBy('created_at', 'desc')
        .limit(25)

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
          setLoading(false);
        });

      return () => subscriber();
    }, [filter]),
  );

  useEffect(() => {
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
  }, []);

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
        <Styled.HeaderHistoric>
          <Filter setFiltro={setFilter} selectedCategory={filter} />
        </Styled.HeaderHistoric>

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
