import { CommonActions, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getMacAddressByUserEmail, registerDevice } from '../../api/register'
import { color } from '../../assets/color'
import Header from '../../component/Header'
import { MacAddressResponse } from '../../model/Register'
import { setCurrentDevice } from '../../redux/action/device'
import { Device, DeviceList, saveDevices } from '../../redux/action/listDevices'
import { RootState } from '../../redux/reducer'
import { mainStyle } from '../mainStyle'
import { styles } from './DeviceScreen.style'

const DeviceScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { params }: any = useRoute()
  console.log('keytest', params);
  
  const auth = useSelector((state: RootState) => state.auth)
  const listDevicesRedux = useSelector((state: RootState) => state.listDevices)
  const listDevices: DeviceList = JSON.parse(JSON.stringify(listDevicesRedux))
  const [listDevice, setListDevice] = useState<DeviceList>(listDevices)

  useEffect(() => {
    getMacAddress(params.userEmail)
  }, [])

  const getMacAddress = async (userName: string) => {
    const res: any = await getMacAddressByUserEmail(userName)
    console.log('keytest', res);
    const newListDevices = res.data.map((item: MacAddressResponse) => {
      return {
        macAddress: item.mac_address,
        nameDevice: item.mac_address_name ? item.mac_address_name : `Địa chỉ MAC: ${item.mac_address}`,
        id: item.id
      }
    })
    dispatch(saveDevices(newListDevices))
    dispatch(setCurrentDevice(newListDevices[0]))
    setListDevice(newListDevices)
  }

  const onPressAddDevice = () => {
    const newListDevices: DeviceList = JSON.parse(JSON.stringify(listDevice))
    newListDevices.push({ macAddress: '', nameDevice: '', id: '' })
    setListDevice(newListDevices)
  }

  const _renderEmptyDevice = () => {
    return (
      <View>
        <Text>Bạn chưa có thiết bị nào</Text>
      </View>
    )
  }

  const saveListDevices = async () => {
    if (listDevice.length < 1) return
    const params = {
      user_email: auth.email ? auth.email : '',
      devices: listDevice.map(item => ({
        mac_address: item.macAddress,
        mac_address_name: item.nameDevice,
        id: item.id
      }))
    }
    const res: any = await registerDevice(params)
    const newListDevices: DeviceList = res.data.map((item: MacAddressResponse) => ({
      macAddress: item.mac_address,
      nameDevice: item.mac_address_name ? item.mac_address_name : `Địa chỉ MAC: ${item.mac_address}`,
      id: item.id
    }))
    dispatch(saveDevices(newListDevices))
    dispatch(setCurrentDevice(newListDevices[0]))
    Alert.alert("Success", "Save list devices success")
    navigation.dispatch(
      CommonActions.navigate({
        name: 'AppStack',
      }))
  }

  const onChangeName = (value: string, index: number) => {
    const newListDevices: DeviceList = JSON.parse(JSON.stringify(listDevice))
    newListDevices[index].nameDevice = value
    setListDevice(newListDevices)
  }
  const onChangeMacAddress = (value: string, index: number) => {
    const newListDevices: DeviceList = JSON.parse(JSON.stringify(listDevice))
    newListDevices[index].macAddress = value
    setListDevice(newListDevices)
  }
  const _renderItem = (item: Device, index: number) => {
    return (
      <View style={styles.itemContainer}>
        <TextInput
          value={item.nameDevice}
          onChangeText={(value) => onChangeName(value, index)}
          placeholder="Tên gợi nhớ..."
          placeholderTextColor={color.blueStrong}
          style={{ fontWeight: 'bold' }}
        />
        <TextInput
          style={styles.inputMacAddress}
          value={item.macAddress}
          onChangeText={(value) => onChangeMacAddress(value, index)}
          placeholder="Địa chỉ MAC"
        />
      </View>
    )
  }
  const _renderListDevice = () => {
    return (
      <FlatList
        data={listDevice}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => _renderItem(item, index)}
      />
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Danh sách thiết bị"
        disableGoBack={params && params.previousScreen === "RegisterScreen"}
      />
      <View style={styles.mainContainer}>
        <View style={styles.buttonAddContainer}>
          <TouchableOpacity
            onPress={() => onPressAddDevice()}
            style={styles.buttonAdd}>
            <Text style={styles.buttonAddTitle}>Thêm thiết bị +</Text>
          </TouchableOpacity>
        </View>
        {listDevice.length > 0 ? _renderListDevice() : _renderEmptyDevice()}
      </View>
      <TouchableOpacity
        onPress={() => saveListDevices()}
        style={[mainStyle.buttonContainer, styles.buttonAdd]}>
        <Text style={mainStyle.buttonTitle}>Xong</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default DeviceScreen