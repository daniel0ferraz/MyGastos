import React, {useState} from 'react';

import * as Icon from 'phosphor-react-native';
import Button from '../../components/Button';
import Toast from 'react-native-toast-message';
import InputCustom from '../../components/InputCustom';
import auth from '@react-native-firebase/auth';
import {BoxTitle, BtnSpace, Container, Form, InputSpace, Title} from './styles';
import { VerifyErroCode } from '../../utils/errorCodes';


export default function CreateNewAccount() {
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const createAccount = async () => {
    setLoading(true);
    try {
      if (
        newUser.email === '' ||
        newUser.password === '' ||
        newUser.confirmPassword === ''
      ) {
        Toast.show({
          text1: 'Preencha todos os campos!',
          position: 'bottom',
          type: 'error',
        });
        return;
      } else if (newUser.password !== newUser.confirmPassword) {
        Toast.show({
          text1: 'Senhas não conferem',
          position: 'bottom',
          type: 'error',
        });
        return;
      }

      const newAccount = await auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
      );

      if (newAccount) {
        setNewUser({
          email: '',
          password: '',
          confirmPassword: '',
        });
      }
    } catch (error: any) {
         const errorCode = error.code;
         Toast.show({
           text1: VerifyErroCode(errorCode),
           position: 'bottom',
           type: 'error',
           visibilityTime: 5000,
         });

    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Toast />

      <BoxTitle>
        <Title>Registro</Title>
      </BoxTitle>

      <Form>
        <InputSpace>
          <InputCustom
            placeholder="Email"
            value={newUser.email}
            onChangeText={text => {
              setNewUser({...newUser, email: text});
            }}
            Icon={<Icon.EnvelopeSimple size={28} />}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            blurOnSubmit={false}
          />
        </InputSpace>

        <InputSpace>
          <InputCustom
            placeholder="Senha"
            value={newUser.password}
            onChangeText={text => {
              setNewUser({...newUser, password: text});
            }}
            Icon={<Icon.Key size={28} />}
            keyboardType="default"
            autoCapitalize="none"
            secureTextEntry
            iconSec={true}
          />
        </InputSpace>

        <InputCustom
          placeholder="Confirmar Senha"
          value={newUser.confirmPassword}
          onChangeText={text => {
            setNewUser({...newUser, confirmPassword: text});
          }}
          Icon={<Icon.Key size={28} />}
          keyboardType="default"
          secureTextEntry
          iconSec={true}
        />
      </Form>

      <BtnSpace>
        <Button
          size="Large"
          style={{ backgroundColor: '#323238' }}
          disabled={!newUser.email ||!newUser.password || !newUser.confirmPassword}
          onPress={() => {
            createAccount();
          }}
          isLoading={loading}>
          Cadastrar
        </Button>
      </BtnSpace>
    </Container>
  );
}
