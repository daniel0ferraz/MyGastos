import React from 'react';

import {View} from 'react-native';
import {User} from '../../@types/User';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';
import {firebase} from '@react-native-firebase/auth';
import {useTheme} from 'styled-components/native';
import * as Icon from 'phosphor-react-native';
import {MotiText, MotiView} from 'moti';
import * as Styled from './styles';

type Props = {
  userInfo: User;
};

export default function Header({userInfo}: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const THEME = useTheme();

  console.log('userInfo');

  const handleSingOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Styled.Header>
      <Styled.BoxContent
        from={{
          translateY: -150,
          opacity: 0,
        }}
        animate={{
          translateY: 0,
          opacity: 1,
        }}
        transition={{
          type: 'spring',
        }}>
        <Styled.BoxIcon
          onPress={() =>
            navigation.navigate('Profile', {credentials: userInfo})
          }>
          <FastImage
            source={{
              uri: userInfo?.photo,
              priority: FastImage.priority.high,
            }}
            style={{height: 60, width: 60, borderRadius: 12}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Styled.BoxIcon>
        <Styled.BoxInfo>
          {userInfo?.name ? (
            <>
              <Styled.InfoText>Olá,</Styled.InfoText>
              <Styled.InfoPage>{userInfo?.name}</Styled.InfoPage>
            </>
          ) : (
            <>
              <Styled.Skerlaton
                style={{
                  width: 40,
                }}
              />
              <Styled.Skerlaton />
            </>
          )}
        </Styled.BoxInfo>
      </Styled.BoxContent>

      <MotiView
        from={{
          translateY: -150,
          opacity: 0,
        }}
        animate={{
          translateY: 0,
          opacity: 1,
        }}
        transition={{
          type: 'spring',
        }}>
        <Styled.BtnLoggout onPress={() => handleSingOut()}>
          <Icon.SignOut size={25} color={THEME.colors.white} />
        </Styled.BtnLoggout>
      </MotiView>
    </Styled.Header>
  );
}
