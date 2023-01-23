import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackRoutes } from './stack.routes';
import { AuthRoutes } from './auth.routes';
import  { firebase, FirebaseAuthTypes }  from '@react-native-firebase/auth';
import { View } from 'react-native';
import Loading from '../components/Loading';

export function Routes() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const stateUser = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      if(initializing) {
        setInitializing(false);
      }
    })
    return () => stateUser();
  }, [])

  if(initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
        <Loading />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <StackRoutes /> : <AuthRoutes />} 
    </NavigationContainer>
  )
}