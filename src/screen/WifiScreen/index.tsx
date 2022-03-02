import { CommonActions, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import HeaderMain from '../../component/HeaderMain'
import { styles } from './WifiScreen.style'


const WifiScreen = () => {

  const [wifiName, setWifiName] = useState("")
  const [wifiPassword, setWifiPassword] = useState("")

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMain
        title="Cấu hình Wifi"
      />
      <View>
        <View>
          <Text></Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default WifiScreen