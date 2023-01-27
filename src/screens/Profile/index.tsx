import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {
  Dimensions,
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

import {useNavigation, useRoute} from '@react-navigation/native';
import Button from '../../components/Button';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import {firebase, FirebaseAuthTypes} from '@react-native-firebase/auth';

import storage from '@react-native-firebase/storage';

import BottomSheet from '@gorhom/bottom-sheet';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {useTheme} from 'styled-components/native';
import {User} from '../../@types/User';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('window');

export function Profile() {
  const THEME = useTheme();

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const routes = useRoute<any>();
  const dataUser = routes.params.credentials as User;

  const [userInfo, setUserInfo] = useState({
    photo: dataUser?.photo || '',
    name: dataUser?.name || '',
    email: dataUser?.email || '',
    phone: dataUser?.phone || '',
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      height: height,
      width: height,
      cropping: true,
    }).then(image => {
      setUserInfo({
        ...userInfo,
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
      console.log(image);
      setUserInfo({
        ...userInfo,
        photo: image.path,
      });
      bottomSheetRef.current?.close();
    });
  };

  const updateProfileUser = async () => {
    setIsUpdate(true);
    setTransferred(0);

    const task = storage()
      .ref(`profile/${userInfo?.name}`)
      .putFile(userInfo?.photo);
    const dowload = storage()
      .ref(`profile/${userInfo?.name}`)
      .getDownloadURL()
      .then(url => {
        console.log('url', url);
        if (url) {
          setUserInfo({
            ...userInfo,
            photo: url,
          });
        }
      });

    task.on('state_changed', taskSnapshot => {
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );

      Toast.show({
        text1: `${transferred}% Carregado`,
        visibilityTime: 5000,
        position: 'bottom',
        type: 'success',
      });
    });
    task.then(() => {
      Toast.show({
        text1: 'Imagem carregada com sucesso!',
        visibilityTime: 5000,
        type: 'success',
        position: 'bottom',
      });
    });

    try {
      await task;
      await dowload;

      Toast.show({
        text1: 'Foto de perfil atualizada com sucesso!',
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
      setTransferred(0);
    }
  };

  const updateAccount = async () => {
    const {photo} = userInfo;
    setIsUpdate(true);

    if (userInfo.name === '' || userInfo.photo === '') {
      Toast.show({
        text1: 'Nome ou foto não pode ser vazia!',
        visibilityTime: 5000,
        type: 'error',
        position: 'bottom',
      });
      return;
    }

    const ref = firebase.storage().ref(`profile/${dataUser.name}`);
    const path = photo;
    const task = ref.putFile(path, {
      cacheControl: 'no-store', // disable caching
    });

    const dowload = storage()
      .ref(`${dataUser.name}`)
      .getDownloadURL()
      .then(url => {
        console.log('url--->', url);
        if (url) {
          setUserInfo({
            ...userInfo,
            photo: url,
          });
        }
      })
      .catch(error => {
        console.log('error>>', error);
      });

    try {
      await task;
      const url = await ref.getDownloadURL();

      if (url) {
        const collectionReference = firebase
          .firestore()
          .collection('users')
          .doc(`${dataUser.id}`);

        await collectionReference.update({
          photo: url,
          name: userInfo.name,
        });

        firebase
          .auth()
          ?.currentUser?.reload()
          .then(() => {
            Toast.show({
              text1: 'Foto de perfil atualizada com sucesso!',
              visibilityTime: 5000,
              type: 'success',
              position: 'bottom',
            });

            setUserInfo({
              photo: '',
              name: '',
              email: '',
              phone: '',
            });

            navigation.replace('Dashboard');
          });
      }
    } catch (error: any) {
      const errorCode = error.code;
      console.log(errorCode);
      Toast.show({
        text1: 'VerifyErroCode(errorCode)',
        position: 'bottom',
        type: 'error',
        visibilityTime: 5000,
      });
    } finally {
      setIsUpdate(false);
    }
  };

  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <Container>
      <Toast />
      <Goback onPress={() => navigation.goBack()}>
        <Icon.ArrowLeft size={32} />
      </Goback>
      <ContentPhoto>
        <BoxProfile>
          <FastImage
            source={{
              uri: userInfo.photo,
              priority: FastImage.priority.high,
            }}
            style={{height: 130, width: 130, borderRadius: 12}}
            resizeMode={FastImage.resizeMode.contain}
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
        autoCorrect={false}
        value={userInfo.name}
        keyboardType="default"
        Icon={<Icon.User />}
        placeholder="Nome"
        onChangeText={text => {
          setUserInfo({...userInfo, name: text});
        }}
        textContentType="name"
      />
      <InputCustom
        value={dataUser.email}
        Icon={<Icon.EnvelopeSimple />}
        placeholder="E-mail"
        editable={false}
        onChangeText={text => {}}
        keyboardType="email-address"
        autoCorrect={false}
      />
      <InputCustom
        value={userInfo?.phone}
        Icon={<Icon.Phone />}
        placeholder="Telefone"
        type="cel-phone"
        mask="(99) 9999-9999"
        onChangeText={text => {
          setUserInfo({...userInfo, phone: text});
        }}
        keyboardType="email-address"
        autoCorrect={false}
        textContentType="telephoneNumber"
      />

      <BtnSpace>
        <Button
          style={{
            backgroundColor: '#323238',
          }}
          size="Large"
          isLoading={isUpdate}
          onPress={() => updateAccount()}>
          Atualizar
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

export default gestureHandlerRootHOC(Profile);
