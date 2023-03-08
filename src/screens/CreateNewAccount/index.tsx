import React, {useState, useRef} from 'react';

import * as Icon from 'phosphor-react-native';
import Button from '../../components/Button';
import Toast from 'react-native-toast-message';
import InputCustom from '../../components/InputCustom';
import auth from '@react-native-firebase/auth';
import {
  BoxTitle,
  BtnSpace,
  Container,
  Form,
  InputSpace,
  Title,
  IconPhoto,
  ContentPhoto,
  BoxProfile,
} from './styles';

import BottomSheet from '@gorhom/bottom-sheet';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {VerifyErroCode} from '../../utils/errorCodes';
import {Image, Platform, StyleSheet} from 'react-native';

import {useTheme} from 'styled-components/native';
import {View, Dimensions} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import firestore, {firebase} from '@react-native-firebase/firestore';

import storage from '@react-native-firebase/storage';
import {User} from '../../@types/User';
import { saveImage } from '../../services/uploadPhoto';
const {width, height} = Dimensions.get('window');

export function CreateNewAccount() {
  const THEME = useTheme();

  const [newUser, setNewUser] = useState({
    photo: '',
    avatar: 'https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      height: height,
      width: height,
      cropping: true,
    }).then(image => {
      setNewUser({
        ...newUser,
        photo: image.path,
      });
      bottomSheetRef.current?.close();
    });
  };

  const choosePhotoFromCamera = () => {
    ImagePicker.openCamera({
      height: height,
      width: height,
      cropping: true,
    }).then(image => {
      setNewUser({
        ...newUser,
        photo: image.path,
      });
      bottomSheetRef.current?.close();
    });
  };


  
  const createAccount = async () => {
    setLoading(true);

    const ref = storage().ref(`profile/${newUser.email}`);
    const path = newUser.photo;
  
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
      } else if (newUser.photo === '') {
        Toast.show({
          text1: 'Selecione uma foto',
          position: 'bottom',
          type: 'error',
        });
        return;
      }

      await ref.putFile(path, {
        cacheControl: 'no-store', 
      });

      const url = await ref.getDownloadURL();

      if (url) {
        const newAccount = await auth().createUserWithEmailAndPassword(
          newUser.email,
          newUser.password,
        );

        const collectionReference = firebase
          .firestore()
          .collection('users')
          .doc(`${newAccount.user.uid}`);

        await collectionReference.set({
          id: newAccount.user.uid,
          photo: url,
          name: newUser.name,
          email: newUser.email,
        });

      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Erro ao criar conta',
        });
        return;
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

  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <Container
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}>
      <BoxTitle>
        <Title>Registro</Title>
      </BoxTitle>

      <Form>
        <Toast />

        <ContentPhoto>
          <BoxProfile>
            <Image
              source={{uri: newUser.photo ? newUser.photo : newUser.avatar}}
              style={{height: 130, width: 130, borderRadius: 15}}
              resizeMode="contain"
            />
          </BoxProfile>
          <IconPhoto
            activeOpacity={0.9}
            onPress={() => {
              bottomSheetRef.current?.expand();
            }}>
            <Icon.Camera size={29} color={'#ffff'} />
          </IconPhoto>
        </ContentPhoto>

        <InputCustom
          value={newUser.name}
          keyboardType="default"
          Icon={<Icon.User />}
          placeholder="Nome"
          onChangeText={text => {
            setNewUser({...newUser, name: text});
          }}
          autoCorrect={false}
        />

        <InputCustom
          placeholder="Email"
          value={newUser.email}
          onChangeText={text => {
            setNewUser({...newUser, email: text});
          }}
          Icon={<Icon.EnvelopeSimple size={28} />}
          keyboardType="email-address"
          autoCorrect={false}
        />

        <InputCustom
          placeholder="Senha"
          value={newUser.password}
          onChangeText={text => {
            setNewUser({...newUser, password: text});
          }}
          Icon={<Icon.Key size={28} />}
          autoCapitalize="none"
          secureTextEntry
          iconSec={true}
          autoCorrect={false}
          keyboardType="visible-password"
        />

        <InputCustom
          placeholder="Confirmar Senha"
          value={newUser.confirmPassword}
          onChangeText={text => {
            setNewUser({...newUser, confirmPassword: text});
          }}
          Icon={<Icon.Key size={28} />}
          keyboardType="visible-password"
          secureTextEntry
          iconSec={true}
        />
      </Form>

      <BtnSpace>
        <Button
          size="Large"
          style={{backgroundColor: '#323238'}}
         
          onPress={createAccount}
          isLoading={loading}>
          Cadastrar
        </Button>
      </BtnSpace>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={[3, height - 620]}
        backgroundStyle={{backgroundColor: THEME.colors.gray}}
        handleIndicatorStyle={{backgroundColor: THEME.colors.white}}>
        <View style={styles.contentContainer}>
          <View style={styles.contentContent}>
            <IconPhoto onPress={choosePhotoFromCamera}>
              <Icon.Camera size={29} color={THEME.colors.light} />
            </IconPhoto>
            <IconPhoto onPress={choosePhotoFromLibrary}>
              <Icon.Image size={29} color={THEME.colors.light} />
            </IconPhoto>
            <IconPhoto onPress={() => bottomSheetRef.current?.close()}>
              <Icon.XCircle size={29} color={THEME.colors.light} />
            </IconPhoto>
          </View>
        </View>
      </BottomSheet>
    </Container>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
  },
});

export default gestureHandlerRootHOC(CreateNewAccount);
