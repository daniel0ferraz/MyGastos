import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard';
import ExpenseRegister from '../screens/ExpenseRegister';
import ViewExtract from '../screens/ViewExtract';
import Profile from '../screens/Profile';
import Resume from '../screens/Resume';

const {Screen, Navigator} = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="RegisterNewExpense" component={ExpenseRegister} />
      <Screen name="ViewExtract" component={ViewExtract} />
      <Screen name="Profile" component={Profile} />
      <Screen name="Resume" component={Resume} />
    </Navigator>
  );
}
