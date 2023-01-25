import React, {useCallback, useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
//Icon
import * as Icon from 'phosphor-react-native';
//Components
import ListHistoric from '../../components/Historic/ListHistoric/Index';
import IconsNav from '../../components/IconsNav';
import {ITransactionsCard} from '../../@types/TransactionsCard';
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
import Error from '../../components/Error';
import auth, {firebase, FirebaseAuthTypes} from '@react-native-firebase/auth';

export default function Dashboard() {
  const [extrato, setExtrato] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<FirebaseAuthTypes.User | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

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
    const subscriber = firestore()
      .collection('transationCardBackup')
      .orderBy('created_at', 'desc')
      .onSnapshot(querySnapshot => {
        const data: any = [];
        setRefreshing(true);

        querySnapshot.forEach(documentSnapshot => {
          data.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });

        setExtrato(data);
        setLoading(false);
        setRefreshing(false);
      });

    const stateUser = firebase.auth().onUserChanged(user => {
      if (user) {
        setUserInfo(user);
      }
    });

    return () => {
      stateUser();
      subscriber();
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Styled.Container>
        <Styled.Header>
          <Styled.BoxContent>
            <Styled.BoxIcon onPress={() => navigation.navigate('Profile')}>
              {userInfo?.photoURL ? (
                <>
                  <Image
                    source={{uri: userInfo.photoURL}}
                    style={{height: 60, width: 60, borderRadius: 8}}
                    resizeMode="contain"
                  />
                </>
              ) : (
                <Icon.User size={32} color={THEME.colors.gray} />
              )}
            </Styled.BoxIcon>
            <Styled.BoxInfo>
              <Styled.InfoText>Olá,</Styled.InfoText>
              <Styled.InfoPage>
                {userInfo?.displayName
                  ? `${userInfo.displayName}`
                  : 'Atualize seus dados'}
              </Styled.InfoPage>
            </Styled.BoxInfo>
          </Styled.BoxContent>

          <Styled.BtnLoggout onPress={() => handleSingOut()}>
            <Icon.SignOut size={32} color={THEME.colors.gray} />
          </Styled.BtnLoggout>
        </Styled.Header>

        <Styled.SectionCards>
          <Styled.BoxExpense>
            <Styled.ExpenseIcon>
              <Styled.ExpenseInfo>Entradas</Styled.ExpenseInfo>
              <Icon.CurrencyCircleDollar size={32} color={THEME.colors.green} />
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
        </Styled.SectionCards>

        <View style={{marginTop: 20}}>
          <Styled.ExpenseInfo>
            Saldo: {formatToBRL(valorTotal - valorDespesas)}
          </Styled.ExpenseInfo>
        </View>

        <Styled.SectionMenu>
          <IconsNav />
        </Styled.SectionMenu>
      </Styled.Container>

      <Styled.SectionHistoric>
        <Styled.HeaderHistoric>
          <Styled.TitleHistoric>Movimentações</Styled.TitleHistoric>
          <Styled.FilterIcon onPress={() => {}}>
            <Icon.Funnel size={32} color={THEME.colors.gray} />
          </Styled.FilterIcon>
        </Styled.HeaderHistoric>

        <Styled.Content>
          <>
            {error && (
              <Error
                message={'Ops! algo deu errado :('}
                icon={<Icon.WarningCircle size={52} color={THEME.colors.red} />}
              />
            )}
            <ListHistoric
              data={extrato}
              atualizar={refreshing}
              onAtualizar={() => console.log('oii')}
            />
            {loading && <Loading />}
          </>
        </Styled.Content>
      </Styled.SectionHistoric>
    </SafeAreaView>
  );
}
