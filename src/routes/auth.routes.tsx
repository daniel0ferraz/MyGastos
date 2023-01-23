import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/SignIn';
import CreateNewAccount from '../screens/CreateNewAccount';
import ForgotPassoword from '../screens/ForgotPassoword/index';

const {Screen, Navigator} = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="SignIn" component={SignIn} />
      <Screen name="CreateNewAccount" component={CreateNewAccount} />
      <Screen name="ForgotPassword" component={ForgotPassoword} />
    </Navigator>
  );
}
