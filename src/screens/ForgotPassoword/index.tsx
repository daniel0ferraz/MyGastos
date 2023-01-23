import React, {useState} from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import InputCustom from '../../components/InputCustom';
import Button from '../../components/Button';
import * as Icon from 'phosphor-react-native';
import {firebase} from '@react-native-firebase/firestore';
import {
  BoxTitle,
  BtnSpace,
  Container,
  Form,
  InputSpace,
  Title,
} from '../CreateNewAccount/styles';
import { Text, TouchableOpacity, View } from 'react-native';
import { VerifyErroCode } from '../../utils/errorCodes';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { Goback } from './styles';



export default function ForgotPassoword() {

  const navigation = useNavigation();
  const THEME = useTheme();

  const [resetPassword, setResetPassword] = useState({
    email: '',
  });
 const [sending, setSending] = useState(false);

  const recovePassword = async () => {
    setSending(true);
    try {
      if (resetPassword.email == ''){
        Toast.show({
          text1: 'Insira o endereço de e-mail',
          position: 'bottom',
          type: 'error',
        });
        return;
      }
    await firebase
        .auth()
      .sendPasswordResetEmail(resetPassword.email)
      
      Toast.show({
        text1: 'E-mail enviado!',
        text2: 'Verifique sua caixa de entrada.',
        visibilityTime: 5000,
        position: 'bottom',
        type: 'success',
      });

      setResetPassword({
        email: '',
      });
     
    } catch (error: any) {
         const errorCode = error.code;
         Toast.show({
           text1: VerifyErroCode(errorCode),
           position: 'bottom',
           type: 'error',
         });

    
    } finally {
      setSending(false);
    }
  };

  return (
    <Container>
      <Toast />

      <Goback
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon.ArrowLeft size={28} color={THEME.colors.light} />
      </Goback>

      <BoxTitle>
        <Title>Senha</Title>
      </BoxTitle>

      <Form>
        <InputSpace>
          <InputCustom
            placeholder="Digite seu email"
            value={resetPassword.email}
            onChangeText={text => {
              setResetPassword({...resetPassword, email: text});
            }}
            Icon={<Icon.EnvelopeSimple size={28} />}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            blurOnSubmit={false}
          />
        </InputSpace>
      </Form>

      <BtnSpace>
        <Button
          size="Large"
          style={{backgroundColor: '#323238'}}
          isLoading={sending}
          onPress={() => {
            recovePassword();
          }}>
          Enviar
        </Button>
      </BtnSpace>
    </Container>
  );
}
