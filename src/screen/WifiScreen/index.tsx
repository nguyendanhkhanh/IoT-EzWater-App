import { CommonActions, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import HeaderMain from '../../component/HeaderMain'
import { mainStyle } from '../mainStyle'
import { styles } from './WifiScreen.style'
import Smartconfig from 'react-native-smartconfig';

const WifiScreen = () => {

  const [wifiName, setWifiName] = useState("")
  const [wifiPassword, setWifiPassword] = useState("")

  const startConfig = () => {
    Smartconfig.start({
      type: 'esptouch', //or airkiss, now doesn't not effect
      ssid: wifiName,
      bssid: 'filter-device', //"" if not need to filter (don't use null)
      password: wifiPassword,
      timeout: 50000 //now doesn't not effect
    }).then(function(results: any){
      //Array of device success do smartconfig
      console.log(results);
    }).catch(function(error: any) {
     
    });
    Smartconfig.stop(); //interrupt task
  }

  const config = () => {
    setTimeout(startConfig(), 10000)
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMain
        title="Cấu hình Wifi"
      />
      <View style={styles.contentContainer}>
        <View>
          <Text>Tên Wifi:</Text>
          <TextInput placeholder="Nhập tên Wifi"
            value={wifiName}
            onChangeText={(value) => setWifiName(value)} />
        </View>
        <View>
          <Text>Mật khẩu Wifi:</Text>
          <TextInput placeholder="Nhập mật khẩu Wifi"
            value={wifiPassword}
            onChangeText={(value) => setWifiPassword(value)} />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => config()}
        style={[mainStyle.buttonContainer, styles.buttonSend]}>
        <Text style={mainStyle.buttonTitle}>Cấu hình</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default WifiScreen