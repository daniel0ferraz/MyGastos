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
import BottomSheet from '@gorhom/bottom-sheet';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {useTheme} from 'styled-components/native';
const {width, height} = Dimensions.get('window');

export function Profile() {
  const THEME = useTheme();
  const navigation = useNavigation();
  const user = firebase.auth().currentUser;

  const [userInfo, setUserInfo] = useState({
    name: user?.displayName || '',
    avatar: '',
  });
  const [isUpdate, setIsUpdate] = useState(false);

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image.path);
      setUserInfo({
        ...userInfo,
        avatar: image.path,
      });
      console.log(image);
    });
  };

  const updateProfileUser = async () => {
    setIsUpdate(true);
    try {
      await firebase.auth().currentUser?.updateProfile({
        displayName: userInfo.name,
        photoURL: userInfo.avatar,
      });

      await firebase.utils.reload();

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

  const uploadToFirebase = async () => {
    const reference = storage().ref(`profile/${userInfo.name}`);
    const {avatar} = userInfo;

    const pathToFile = `${avatar}`;

    await reference.putFile(pathToFile);

    const task = reference.putFile(pathToFile);

    task.on('state_changed', taskSnapshot => {
      Toast.show({
        text1: 'updload',
        visibilityTime: 5000,
        text2: `${taskSnapshot.bytesTransferred} transferido de ${taskSnapshot.totalBytes}`,
        position: 'bottom',
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
  };

  const updateProfileUser2 = async () => {
    try {
      // storage get reference download
      const reference = storage().ref(`profile/${userInfo.name}`);
      const {avatar} = userInfo;

      const task = reference.putFile(avatar);
      console.log('task', task);
      task.on('state_changed', taskSnapshot => {
        Toast.show({
          text1: 'updload',
          visibilityTime: 5000,
          text2: `${taskSnapshot.bytesTransferred} transferido de ${taskSnapshot.totalBytes}`,
          position: 'bottom',
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

      const ref = firebase
        .storage()
        .ref(`profile/${userInfo.name}`)
        .getDownloadURL()
        .then(url => {
          console.log('urlBaixadoa', url);
        });

      /*  await firebase.auth().currentUser?.updateProfile({
        displayName: userInfo.name,
        photoURL: userInfo.avatar,
      });*/
      // reload
      await firebase.utils.reload();
    } catch (error) {
      console.log('catch', error);
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
          onPress={updateProfileUser2}>
          Atualizar
        </Button>
      </BtnSpace>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={[3, height - 620]}
        backgroundStyle={{backgroundColor: THEME.colors.light}}
        handleIndicatorStyle={{backgroundColor: THEME.colors.gray600}}>
        <View style={styles.contentContainer}>
          <View style={styles.contentContent}>
            <IconPhoto>
              <Icon.Camera size={29} color={THEME.colors.light} />
            </IconPhoto>
            <IconPhoto>
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
