import { CommonActions, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { color } from '../assets/color'
import { fontSize, height, width } from '../assets/size'
import { loginSuccess } from '../redux/action/auth'
import auth from '@react-native-firebase/auth'
import { saveDevices } from '../redux/action/listDevices'
import { setCurrentDevice } from '../redux/action/device'
import { getMacAddressByUserEmail } from '../api/register'
import { MacAddressResponse } from '../model/Register'

const ERROR_MESSAGE = {
  emailValid: 'Email is invalid!',
}

const AuthScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('hacker0k98@gmail.com')
  const [pass, setPass] = useState('123321')
  const [errorMessage, setErrorMessage] = useState('')
  const [seePass, setSeePass] = useState(false)

  const loginByFirebase = async () => {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const err = userName === '' ? 'Input email' : (regexEmail.test(userName) ? '' : ERROR_MESSAGE.emailValid)
    if (err !== '') return Alert.alert("Error", err)
    try {
      const res: any = await auth().signInWithEmailAndPassword(userName, pass)
      const payload = {
        email: res.user._user.email
      }
      dispatch(loginSuccess(payload))
      await getMacAddress(userName)

      navigation.dispatch(
        CommonActions.navigate({
          name: 'AppStack',
        }))
    } catch (e) {
      Alert.alert("Error", "Username or Password is wrong!")
    }
  }

  const getMacAddress = async (userName: string) => {
    const res: any = await getMacAddressByUserEmail(userName)
    console.log('keytest', res);
    const listDevices = res.data.map((item: MacAddressResponse) => {
      return {
        macAddress: item.mac_address,
        nameDevice: item.mac_address_name ? item.mac_address_name : `Địa chỉ MAC: ${item.mac_address}`,
        id: item.id
      }
    })
    dispatch(saveDevices(listDevices))
    dispatch(setCurrentDevice(listDevices[0]))
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={color.blue}
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        hidden={false} />
      <Image source={require('../assets/icon/EzWater.png')} style={styles.logo} />
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
            <Image source={require('../assets/icon/eye.png')} style={styles.iconEye} />

          </TouchableOpacity>
        </View>

        <Text style={styles.errMess}>{errorMessage}</Text>
        <TouchableOpacity
          onPress={() => loginByFirebase()}
          style={styles.button}
        >
          <Text style={styles.buttonTitle}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.dispatch(
            CommonActions.navigate({
              name: 'RegisterScreen',
            }))}
        >
          <Text style={styles.register}>Đăng ký tài khoản</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: color.blue,
  },
  logo: {
    tintColor: 'black',
  },
  inputContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    backgroundColor: 'white',
    width: width.button,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 10
  },
  inputPass: {
    backgroundColor: 'white',
    width: width.button,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    height: height.button,
    width: width.button,
    backgroundColor: color.blueStrong,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 20
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  errMess: {
    fontSize: fontSize.tag,
    color: 'red'
  },
  iconEye: {
    width: 30,
    height: 30,
    tintColor: 'grey'
  },
  register: {
    marginTop: 10,
    fontSize: fontSize.contentSmall,
    color: color.blueStrong,
    textDecorationLine: 'underline'
  }
})

export default AuthScreen