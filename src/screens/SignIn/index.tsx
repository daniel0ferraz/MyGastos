import React, {useEffect, useState} from 'react';

import {Text, View, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import * as Icon from 'phosphor-react-native';
import InputCustom from '../../components/InputCustom';
import {
  BoxLogo,
  BoxNewAccount,
  BtnSpace,
  Container,
  Form,
  InputSpace,
  TitleLink,
} from './styles';
import Button from '../../components/Button';
import {useTheme} from 'styled-components/native';
import Toast from 'react-native-toast-message';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {VerifyErroCode} from '../../utils/errorCodes';

export default function SignIn() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const THEME = useTheme();

  const [dataUser, setdataUser] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const singIn = async () => {
    setLoading(true);
    try {
      if (dataUser.email === '' || dataUser.password === '') {
        Toast.show({
          text1: 'Preencha todos os campos!',
          position: 'bottom',
          type: 'error',
        });
        return;
      }
      const user = await auth().signInWithEmailAndPassword(
        dataUser.email,
        dataUser.password,
      );

      if (user) {
        setdataUser({
          email: '',
          password: '',
        });

        Toast.show({
          text1: 'Sucesso!',
          position: 'bottom',
          type: 'success',
        });
      }
    } catch (error: any) {
      const errorCode = error.code;
      Toast.show({
        text1: VerifyErroCode(errorCode),
        position: 'bottom',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Toast />

      <BoxLogo>
        <Image
          source={require('../../assets/logo/carteira.png')}
          style={{
            width: 115,
            height: 130,
            resizeMode: 'contain',
          }}
        />
      </BoxLogo>

      <Form>
        <InputSpace>
          <InputCustom
            placeholder="Digite seu email"
            value={dataUser.email}
            onChangeText={(text: any) => {
              setdataUser({...dataUser, email: text});
            }}
            Icon={<Icon.EnvelopeSimple size={28} />}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            blurOnSubmit={false}
          />
        </InputSpace>

        <InputCustom
          placeholder="Senha"
          value={dataUser.password}
          onChangeText={(text: any) =>
            setdataUser({...dataUser, password: text})
          }
          Icon={<Icon.Key size={28} />}
          keyboardType="default"
          secureTextEntry
          iconSec={true}
        />
      </Form>

      <BtnSpace>
        <Button
          size="Large"
          style={{backgroundColor: '#323238'}}
          isLoading={loading}
          disabled={!dataUser.email || !dataUser.password}
          onPress={() => singIn()}>
          Entrar
        </Button>

        <BoxNewAccount>
          <TitleLink
            onPress={() => {
              navigation.navigate('CreateNewAccount');
            }}>
            Cadastre-se
          </TitleLink>
          <TitleLink
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}>
            Esqueci minha senha
          </TitleLink>
        </BoxNewAccount>
      </BtnSpace>
    </Container>
  );
}
