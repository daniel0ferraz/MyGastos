import React, {useEffect, useState} from 'react';

import {
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import InputCustom from '../../components/InputCustom';
import * as Icon from 'phosphor-react-native';
import {
  BoxProfile,
  BtnSpace,
  Container,
  ContentPhoto,
  Goback,
  IconPhoto,
} from './styles';

import {firebase, FirebaseAuthTypes} from '@react-native-firebase/auth';
import Button from '../../components/Button';
//import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

export default function Profile() {
  const navigation = useNavigation();
  const user = firebase.auth().currentUser as FirebaseAuthTypes.UserInfo;

  const [userInfo, setUserInfo] = useState({
    name: user.displayName || '',
    avatar: '',
  });
  const [isUpdate, setIsUpdate] = useState(false);

  const choosePhotoFromLibrary = () => {};

  const updateProfileUser = async () => {
    setIsUpdate(true);
    try {
      await firebase.auth().currentUser?.updateProfile({
        displayName: userInfo.name,
        photoURL: userInfo.avatar,
      });

      Toast.show({
        text1: 'Dados atualizados com sucesso!',
        visibilityTime: 5000,
        type: 'success',
        position: 'bottom',
      });
    } catch (error) {
      Toast.show({
        text1: 'algo deu errado, tente novamente!',
        visibilityTime: 5000,
        type: 'error',
        position: 'bottom',
      });
    } finally {
      setIsUpdate(false);
    }
  };

  return (
    <Container>
      <Toast />

      <Goback onPress={() => navigation.goBack()}>
        <Icon.ArrowLeft size={32} />
      </Goback>

      <ContentPhoto>
        <BoxProfile>
          <Image
            source={{uri: userInfo.avatar ? userInfo.avatar : user?.photoURL}}
            style={{height: 130, width: 130, borderRadius: 15}}
            resizeMode="contain"
          />
        </BoxProfile>
        <IconPhoto onPress={choosePhotoFromLibrary}>
          <Icon.Camera size={29} color={'#ffff'} />
        </IconPhoto>
      </ContentPhoto>

      <InputCustom
        value={userInfo.name}
        keyboardType="default"
        Icon={<Icon.User />}
        placeholder="Nome"
        onChangeText={text => {
          setUserInfo({...userInfo, name: text});
        }}
      />

      <InputCustom
        value={user.email}
        Icon={<Icon.EnvelopeSimple />}
        placeholder="E-mail"
        editable={false}
        onChangeText={text => {}}
      />

      <BtnSpace>
        <Button
          style={{
            backgroundColor: '#323238',
          }}
          size="Large"
          isLoading={isUpdate}
          onPress={updateProfileUser}>
          Atualizar
        </Button>
      </BtnSpace>
    </Container>
  );
}
