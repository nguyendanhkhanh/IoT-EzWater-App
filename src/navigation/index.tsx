import React from 'react'
import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import SplashScreen from '../screen/SplashScreen';

const AppContainer = () => {
  const Stack = createNativeStackNavigator();

  const _renderItemScreen = (name: string, component: any) => (
    <Stack.Screen
      name={name}
      key={name}
      component={component}
    />
  );

  const navigationRef: any = React.createRef();

  function navigate(name: any, params?: any) {
    navigationRef.current?.navigate(name, params);
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator  
        screenOptions={{gestureEnabled: false, headerShown: false}}>
        {_renderItemScreen('SplashScreen', SplashScreen)}
        {_renderItemScreen('AuthStack', AuthStack)}
        {_renderItemScreen('AppStack', AppStack)}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppContainer