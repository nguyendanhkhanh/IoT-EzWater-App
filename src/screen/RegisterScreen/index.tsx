import { CommonActions, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import auth from '@react-native-firebase/auth'
import { styles } from './RegisterScreen.style'
import { color } from '../../assets/color'
import messaging from '@react-native-firebase/messaging';
import { saveDeviceToken } from '../../api/register'
const ERROR_MESSAGE = {
  emailValid: 'Email is invalid!',
}

const RegisterScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('hacker0k98@gmail.com')
  const [pass, setPass] = useState('123321')
  const [passConfirm, setPassConfirm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [seePass, setSeePass] = useState(false)

  const registerFirebase = async () => {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let err = userName === '' ? 'Input email' : (regexEmail.test(userName) ? '' : ERROR_MESSAGE.emailValid)
    if (pass !== passConfirm) err = 'Password confirm is incorrect!'
    if (err !== '') return Alert.alert("Error", err)
    try {
      // const res: any = await auth().createUserWithEmailAndPassword(userName, pass)
      // Alert.alert('Đăng ký thành công', 'Vui lòng thêm thông tin thiết bị của bạn!')
      // get firebase push token
      const deviceToken = await messaging().getToken();
      console.log('token', deviceToken);
      // save device token
      const paramSaveDeviceToken = {
        email: userName,
        device_token: deviceToken
      }
      saveDeviceToken(paramSaveDeviceToken)

      navigation.dispatch(
        CommonActions.navigate({
          name: 'DeviceScreen',
          params: { previousScreen: 'RegisterScreen', userEmail: userName }
        })
      )

      // navigation.dispatch(CommonActions.navigate('AppStack', { screen: 'DeviceScreen', params: { previousScreen: 'RegisterScreen' } }))
    } catch (e) {
      Alert.alert("Error", e.code)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={color.blue}
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        hidden={false} />
      <Image source={require('../../assets/icon/EzWater.png')} style={styles.logo} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          value={userName}
          onChangeText={(value: string) => setUserName(value)}
        />
        <View style={styles.inputPass}>
          <TextInput
            secureTextEntry={seePass}
            placeholder="Mật khẩu"
            value={pass}
            onChangeText={(value: string) => setPass(value)}
            style={{ flex: 1 }}
          />
          <TouchableOpacity onPress={() => setSeePass(!seePass)}>
            <Image source={require('../../assets/icon/eye.png')} style={styles.iconEye} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputPass}>
          <TextInput
            secureTextEntry={seePass}
            placeholder="Xác nhận mật khẩu"
            value={passConfirm}
            onChangeText={(value: string) => setPassConfirm(value)}
            style={{ flex: 1 }}
          />
          <TouchableOpacity onPress={() => setSeePass(!seePass)}>
            <Image source={require('../../assets/icon/eye.png')} style={styles.iconEye} />
          </TouchableOpacity>
        </View>

        <Text style={styles.errMess}>{errorMessage}</Text>
        <TouchableOpacity
          onPress={() => registerFirebase()}
          style={styles.button}
        >
          <Text style={styles.buttonTitle}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen