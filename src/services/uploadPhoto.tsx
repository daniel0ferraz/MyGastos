import {firebase} from '@react-native-firebase/storage';
import {Alert} from 'react-native';

export const saveImage = async (image: string, nameImage: string) => {
  if (image === '' || nameImage === '') {
    return null;
  }

  const ref = firebase.storage().ref(`profile/${nameImage}`);
  const task = ref.putFile(image, {
    cacheControl: 'no-store',
  });

  try {
    const url = await ref.getDownloadURL();
    await task;

    return url;
  } catch (error) {
    Alert.alert('Ops, algo deu errado!, Tente novamente');
  }
};
