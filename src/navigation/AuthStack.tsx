import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import AuthScreen from '../screen/AuthScreen';
import DeviceScreen from '../screen/DeviceScreen';
import RegisterScreen from '../screen/RegisterScreen';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  const _renderItemScreen = (name: string, component: any) => (
    <Stack.Screen
      name={name}
      key={name}
      component={component}
    />
  );

  return (
      <Stack.Navigator  
        screenOptions={{gestureEnabled: false, headerShown: false}}>
        {_renderItemScreen('AuthScreen', AuthScreen)}
        {_renderItemScreen('RegisterScreen', RegisterScreen)}
        {_renderItemScreen('DeviceScreen', DeviceScreen)}

      </Stack.Navigator>
  )
}

export default AuthStack