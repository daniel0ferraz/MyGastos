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
  BoxTitle,
  BtnSpace,
  Container,
  ContentPhoto,
  Goback,
  IconPhoto,
  TitleIcon,
  TitleModal,
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
import {VerifyErroCode} from '../../utils/errorCodes';
import {saveImage} from '../../services/uploadPhoto';

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
    newCapiture: '',
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
        newCapiture: image.path,
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
      setUserInfo({
        ...userInfo,
        photo: image.path,
        newCapiture: image.path,
      });
      bottomSheetRef.current?.close();
    });
  };

  const updateUserCredentiais = async (newPhoto: string) => {
    const collectionReference = firebase
      .firestore()
      .collection('users')
      .doc(`${dataUser.id}`);

    try {
      await collectionReference.update({
        photo: newPhoto,
        name: userInfo.name,
        phone: userInfo.phone,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao atualizar',
        text2: 'Tente novamente mais tarde',
      });
    }
  };

  const updateAccount = async () => {
    const {newCapiture} = userInfo;
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

    try {
      const res = await saveImage(newCapiture, dataUser.email);

      if (!res) {
        updateUserCredentiais(userInfo.photo);
      } else {
        updateUserCredentiais(res);
      }

      Toast.show({
        text1: 'Perfil atualizado com sucesso!',
        visibilityTime: 5000,
        type: 'success',
        position: 'bottom',
        onPress: () => {
          navigation.replace('Dashboard');
        },
      });
    } catch (error: any) {
      const errorCode = error.code;

      Toast.show({
        text1: `${VerifyErroCode(errorCode)}`,
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
          <BoxTitle>
            <TitleModal>Atualizar Foto</TitleModal>
          </BoxTitle>
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
