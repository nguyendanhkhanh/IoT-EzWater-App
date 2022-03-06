import { CommonActions, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getMacAddressByUserEmail, registerDevice } from '../../api/register'
import { color } from '../../assets/color'
import { WATER_ON } from '../../assets/source/icon'
import Header from '../../component/Header'
import { MacAddressResponse } from '../../model/Register'
import { RelayHistory } from '../../model/RelayHistory'
import { setCurrentDevice } from '../../redux/action/device'
import { Device, DeviceList, saveDevices } from '../../redux/action/listDevices'
import { RootState } from '../../redux/reducer'
import { RelayHistoryInfo } from '../HistoryScreen'
import { mainStyle } from '../mainStyle'
import { styles } from './DetailHistoryScreen.style'

const DetailHistoryScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { params }: any = useRoute()
  console.log('keytest', params.history);

  const listRelayInfo = useSelector((state: RootState) => state.relay)
  const listDevicesRedux = useSelector((state: RootState) => state.listDevices)
  const listDevices: DeviceList = JSON.parse(JSON.stringify(listDevicesRedux))
  const [listDevice, setListDevice] = useState<DeviceList>(listDevices)

  useEffect(() => {
  }, [])

  const _renderEmptyDevice = () => {
    return (
      <View>
        <Text>Bạn chưa bơm lần nào</Text>
      </View>
    )
  }
  const _renderItem = (item: RelayHistory, index: number) => {
    const relayInfo = listRelayInfo.find(relay => relay.relay_id === item.relay_id)
    return (
      <View style={styles.device}>
        <Image
          source={WATER_ON}
          style={styles.deviceImage}
        />
        <View style={styles.deviceItemContainer}>
          <Text style={styles.deviceName}>{relayInfo ? relayInfo.relay_name : `Van ${index + 1}`}</Text>
          <View style={styles.deviceSoil}>
            <Image source={require('../../assets/icon/soil.png')}
              style={styles.deviceIcon}
            />
            <Text style={styles.deviceName}>{`Thời gian bơm: `}</Text>
            <Text style={styles.deviceContent}>{` ${item.water_time} giây`}</Text>
          </View>
          <View style={styles.deviceSoil}>
            <Image source={require('../../assets/icon/water-drop.png')}
              style={styles.deviceIconBig}
            />
            <Text style={styles.deviceName}>{`Lượng nước: `}</Text>
            <Text style={styles.deviceContent}>{` ${item.water_amount} ml`}</Text>
          </View>
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Lịch sử tưới"
      />
      <View style={{ flex: 1, width: '90%' }}>
        <FlatList
          data={params.history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => _renderItem(item, index)}
        />
      </View>
    </SafeAreaView>
  )
}

export default DetailHistoryScreen