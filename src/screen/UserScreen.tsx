import { CommonActions, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { useDispatch, useSelector } from 'react-redux'
import { color } from '../assets/color'
import { fontSize, widthDevice } from '../assets/size'
import HeaderHome from '../component/HeaderMain'
import { logout } from '../redux/action/auth'
import { setCurrentDevice } from '../redux/action/device'
import { RootState } from '../redux/reducer'
import { mainStyle } from './mainStyle'

const UserScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { email } = useSelector((state: RootState) => state.auth)
  const { macAddress } = useSelector((state: RootState) => state.device)
  const listDevices = useSelector((state: RootState) => state.listDevices)
  const listDeviceString = listDevices.map(item => {
    return {
      label: item.nameDevice,
      value: item.macAddress
    }
  })
  const [name, setName] = useState('Người dùng')
  const [phone, setPhone] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
  }, [])

  const onPressLogout = () => {
    dispatch(logout())
    navigation.dispatch(
      CommonActions.navigate({
        name: 'AuthStack',
      }))
  }

  const onSelectDevice = (e: any) => {
    console.log("keytest", e);
    dispatch(setCurrentDevice({ macAddress: e.value, nameDevice: e.label }))
    navigation.dispatch(
      CommonActions.navigate({
        name: 'HomeScreen',
      })
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderHome title="Thông tin tài khoản" />
      <View style={styles.mainContainer}>
        <View style={styles.user}>
          <Image source={require('../assets/icon/user-photo.png')} style={styles.iconUser} />
          <View style={styles.contentContainer}>
            <View style={styles.lineContainer}>
              <Text style={styles.contentTitle}>Tên</Text>
              <Text style={styles.content}>{name}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.contentTitle}>Số điện thoại</Text>
              <Text style={styles.content}>{phone}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.contentTitle}>Email</Text>
              <Text style={styles.content}>{email}</Text>
            </View>
          </View>
        </View>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity onPress={() => navigation.dispatch(
            CommonActions.navigate({
              name: 'DeviceScreen',
              params: { previousScreen: 'RegisterScreen', userEmail: email }
            })
          )}>
            <Text style={styles.device}>{"Danh sách hệ thống"}</Text>
          </TouchableOpacity>
          <Text style={styles.device}>{"Chuyển hệ thống"}</Text>
          <DropDownPicker
            open={open}
            value={macAddress}
            items={listDeviceString}
            setOpen={setOpen}
            multiple={false}
            setValue={(e) => console.log(e)}
            onSelectItem={(value) => onSelectDevice(value)}
            itemKey='value'
            style={styles.dropdown}
            placeholder="Chuyển hệ thống"
            placeholderStyle={styles.placeholder}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.dispatch(
        CommonActions.navigate({
          name: 'ChangePassword',
        })
      )}>
        <Text style={styles.password}>Đổi mật khẩu</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPressLogout()}
        style={[mainStyle.buttonContainer, styles.buttonSend]}>
        <Text style={mainStyle.buttonTitle}>Đăng xuất</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: color.background
  },
  mainContainer: {
    flex: 1,
  },
  user: {
    flexDirection: 'row',
    width: widthDevice * 80 / 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 35

  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  lineContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: 15
  },
  contentTitle: {
    fontWeight: 'bold',
    fontSize: fontSize.contentSmall
  },
  content: {
    fontSize: fontSize.contentSmall
  },
  buttonSend: {
    marginBottom: 20,
    marginHorizontal: 20,
    width: '80%'
  },
  password: {
    color: color.blueStrong,
    fontSize: fontSize.content,
    marginBottom: 20,
    textDecorationLine: 'underline'
  },
  iconUser: {
    width: 60,
    height: 60
  },
  placeholder: {
    color: color.blueStrong,
    fontSize: fontSize.contentSmall,
    fontWeight: 'bold'
  },
  dropdown: {
    width: widthDevice * 80 / 100,
    borderColor: color.blue,
  },
  dropdownContainer: {
    marginTop: 20
  },
  device: {
    marginBottom: 10,
    color: color.blueStrong,
    fontSize: fontSize.contentSmall,
    fontWeight: 'bold'
  }
});

export default UserScreen