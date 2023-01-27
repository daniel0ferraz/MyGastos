import React, {useCallback, useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
//Icon
import * as Icon from 'phosphor-react-native';
//Components
import ListHistoric from '../../components/Historic/ListHistoric/Index';
import IconsNav from '../../components/IconsNav';
import {ITransactionsCard} from '../../@types/TransactionsCard';
import {User} from '../../@types/User';
// services
import firestore from '@react-native-firebase/firestore';
//Navigation
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
//Styles
import * as Styled from './styles';
import {useTheme} from 'styled-components/native';
import {formatToBRL} from 'brazilian-values';
import Loading from '../../components/Loading';

import auth, {firebase, FirebaseAuthTypes} from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';

export default function Dashboard() {
  const [extrato, setExtrato] = useState<ITransactionsCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState<User>({} as User);

  const THEME = useTheme();

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

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

  const handleSingOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    const subscriber = firestore()
      .collection('transationCardBackup')
      .orderBy('created_at', 'desc')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ITransactionsCard[];

        setExtrato(data);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

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

  console.log(loading);

  return (
    <View style={{backgroundColor: THEME.colors.white, height: '100%'}}>
      <Styled.Container>
        <Styled.Header>
          <Styled.BoxContent>
            <Styled.BoxIcon
              onPress={() =>
                navigation.navigate('Profile', {credentials: credentials})
              }>
              <FastImage
                source={{
                  uri: credentials.photo,
                  priority: FastImage.priority.high,
                }}
                style={{height: 60, width: 60, borderRadius: 12}}
                resizeMode={FastImage.resizeMode.contain}
              />
            </Styled.BoxIcon>
            <Styled.BoxInfo>
              <Styled.InfoText>Olá,</Styled.InfoText>
              <Styled.InfoPage>
                {credentials?.name
                  ? `${credentials.name}`
                  : 'Atualize seus dados'}
              </Styled.InfoPage>
            </Styled.BoxInfo>
          </Styled.BoxContent>

          <Styled.BtnLoggout onPress={() => handleSingOut()}>
            <Icon.SignOut size={25} color={THEME.colors.white} />
          </Styled.BtnLoggout>
        </Styled.Header>

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
          <Styled.TitleHistoric>Movimentações</Styled.TitleHistoric>
          {/*  <Styled.FilterIcon onPress={() => {}}>
            <Icon.Funnel size={32} color={THEME.colors.gray} />
          </Styled.FilterIcon> */}
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
    </View>
  );
}
