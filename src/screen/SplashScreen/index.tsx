import { CommonActions, useNavigation } from '@react-navigation/native'
import React, { ReactElement } from 'react'
import { StatusBar, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { color } from '../../assets/color'
import { RootState } from '../../redux/reducer'
import { styles } from './SplashScreen.style'

interface Props {

}

export default function SplashScreen(props: Props): ReactElement {
  const { email } = useSelector((state: RootState) => state.auth)
  const navigation = useNavigation()
  if (email) {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'AppStack',
      }))
  }
  else {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'AuthStack',
      }))
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={color.blue}
        hidden={false} />
      <Image source={require('../../assets/icon/EzWater.png')} style={styles.logo} />
    </SafeAreaView>
  )
}
