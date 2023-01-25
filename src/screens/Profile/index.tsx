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

import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Button';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import {firebase, FirebaseAuthTypes} from '@react-native-firebase/auth';

import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';

import BottomSheet from '@gorhom/bottom-sheet';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {useTheme} from 'styled-components/native';
const {width, height} = Dimensions.get('window');

export function Profile() {
  const THEME = useTheme();
  const navigation = useNavigation();
  const user = firebase.auth().currentUser as FirebaseAuthTypes.User;

  const [userInfo, setUserInfo] = useState({
    name: user?.displayName || '',
    avatar: user?.photoURL || '',
    photoCapitured: '',
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      setUserInfo({
        ...userInfo,
        avatar: image.path,
      });
      bottomSheetRef.current?.close();
    });
  };

  const choosePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      console.log(image);
      setUserInfo({
        ...userInfo,
        avatar: image.path,
      });
      bottomSheetRef.current?.close();
    });
  };

  const updateProfileUser = async () => {
    setIsUpdate(true);
    setTransferred(0);

    const {avatar} = userInfo;
    const task = storage().ref(`profile/${userInfo?.name}`).putFile(avatar);
    const dowload = storage()
      .ref(`profile/${userInfo?.name}`)
      .getDownloadURL()
      .then(url => {
        console.log('url', url);
        if (url) {
          setUserInfo({
            ...userInfo,
            photoCapitured: url,
          });

          user?.updateProfile({
            displayName: userInfo.name,
            photoURL: userInfo.photoCapitured,
          });

          user.reload();
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

  const bottomSheetRef = useRef<BottomSheet>(null);

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
        <IconPhoto
          activeOpacity={0.9}
          onPress={() => {
            bottomSheetRef.current?.expand();
          }}>
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
        value={user?.email}
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
