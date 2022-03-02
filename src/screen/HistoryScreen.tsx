import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { useSelector } from 'react-redux'
import { statistic } from '../api/statistic'
import { color } from '../assets/color'
import { fontSize, widthDevice } from '../assets/size'
import { WATER_OFF, WATER_ON } from '../assets/source/icon'
import HeaderHome from '../component/HeaderMain'
import { TREE_STATUS } from '../constant/environment'
import { RelayData } from '../model/MqttData'
import { RelayHistory } from '../model/RelayHistory'
import { RootState } from '../redux/reducer'
import usePagingInfo from '../ultil/usePagingInfo'

interface RelayHistoryInfo {
  relay_id: string,
  pump_number: number,
  water_amount: number,
  history: RelayHistory[]
}

const initRelay1: RelayHistoryInfo = {
  relay_id: "1",
  pump_number: 0,
  water_amount: 0,
  history: []
}
const initRelay2: RelayHistoryInfo = {
  relay_id: "2",
  pump_number: 0,
  water_amount: 0,
  history: []
}
const initRelay3: RelayHistoryInfo = {
  relay_id: "3",
  pump_number: 0,
  water_amount: 0,
  history: []
}
const initRelay4: RelayHistoryInfo = {
  relay_id: "4",
  pump_number: 0,
  water_amount: 0,
  history: []
}
const initRelayHistoryInfo = [
  initRelay1,
  initRelay2,
  initRelay3,
  initRelay4
]

const HistoryScreen = () => {
  const navigation = useNavigation()
  const listRelayInfo = useSelector((state: RootState) => state.relay)
  const device = useSelector((state: RootState) => state.device)
  const [dateFromPicker, setDateFromPicker] = useState(false)
  const [dateToPicker, setDateToPicker] = useState(false)
  const [timeFrom, setTimeFrom] = useState(moment().subtract(7, 'days').format())
  const [timeTo, setTimeTo] = useState(moment().format())
  const [relayHistory1, setRelayHistory1] = useState<RelayHistory[]>([])
  const [relayHistory2, setRelayHistory2] = useState<RelayHistory[]>([])
  const [relayHistory3, setRelayHistory3] = useState<RelayHistory[]>([])
  const [relayHistory4, setRelayHistory4] = useState<RelayHistory[]>([])
  const [listRelayHistoryInfo, setListRelayHistoryInfo] = useState<RelayHistoryInfo[]>(initRelayHistoryInfo)
  // const [relayData, setRelayData] = useState<>([])

  const { pagingInfo, setPageIndex, setFilter } = usePagingInfo({
    filter: [
      {
        key: 'Status',
        comparison: '',
        value: 'Approved'
      },
      {
        key: 'Status',
        comparison: '',
        value: 'Rejected'
      },
      {
        key: 'StartDate',
        comparison: '==',
        value: moment().subtract(7, 'days').calendar()
      },
      {
        key: 'EndDate',
        comparison: '!=',
        value: moment().format('MM/DD/YYYY')
      }
    ]
  });

  useEffect(() => {
    getStatistic()
  }, [])

  const getStatistic = async () => {
    const newListRelay = [...listRelayHistoryInfo]

    for (let i = 0; i < newListRelay.length; i++) {
      const param = {
        mac_address: 'mactest', //device.macAddress,
        relay_id: newListRelay[i].relay_id,
        time_from: timeFrom,
        time_to: timeTo
      }
      const res: any = await statistic(param)
      console.log('keytest', res);
      if (res.data != null) {
        newListRelay[i].history = res.data
      }
    }
    setListRelayHistoryInfo(newListRelay)
  }

  const _renderItem = (item: RelayHistoryInfo, index: number) => {
    const relayInfo = listRelayInfo.find(relay => relay.relay_id === item.relay_id)
    const waterAmountTotal = item.history.reduce(((acc, cur) => acc + cur.water_amount), 0)
    return (
      <View style={styles.device}>
        <Image
          source={WATER_ON}
          style={styles.deviceImage}
        />
        <View style={styles.deviceItemContainer}>
          <Text style={styles.deviceName}>{relayInfo ? relayInfo.relay_name : `Van ${index + 1}`}</Text>
          <View style={styles.deviceSoil}>
            <Image source={require('../assets/icon/soil.png')}
              style={styles.deviceIcon}
            />
            <Text style={styles.deviceName}>{`Đã bơm: `}</Text>
            <Text style={styles.deviceContent}>{` ${item.history.length} lần`}</Text>
          </View>
          <View style={styles.deviceSoil}>
            <Image source={require('../assets/icon/water-drop.png')}
              style={styles.deviceIconBig}
            />
            <Text style={styles.deviceName}>{`Lượng nước: `}</Text>
            <Text style={styles.deviceContent}>{` ${waterAmountTotal} ml`}</Text>
          </View>
        </View>
        <View style={styles.deviceRight}>
          <TouchableOpacity>
            <Text style={styles.more}>{`Chi tiết: `}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const _renderDatePicker = () => {
    return (
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={() => setDateFromPicker(true)}>
          <TextInput
            value={pagingInfo.filter ? pagingInfo.filter[2].value.toString() : ''}
            editable={false}
            style={styles.datePicker}
            textAlign="center"
          />
        </TouchableOpacity>
        <Text>_______</Text>
        <TouchableOpacity onPress={() => setDateToPicker(true)}>
          <TextInput
            value={pagingInfo.filter ? pagingInfo.filter[3].value.toString() : ''}
            editable={false}
            style={styles.datePicker}
            textAlign="center"
          />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderHome title="Lịch sử bơm nước" />
      {_renderDatePicker()}
      <DatePicker
        modal
        open={dateFromPicker}
        date={new Date()}
        onConfirm={(date) => {
          setFilter({
            key: 'StartDate',
            comparison: '==',
            value: moment(date).format('MM/DD/YYYY')
          });
          setTimeFrom(moment(date).format())
          setDateFromPicker(false)
        }}
        onCancel={() => {
          setDateFromPicker(false)
        }}
      />
      <DatePicker
        modal
        open={dateToPicker}
        date={new Date()}
        onConfirm={(date) => {
          setFilter({
            key: 'EndDate',
            comparison: '==',
            value: moment(date).format('MM/DD/YYYY')
          });
          setDateToPicker(false)
          setTimeTo(moment(date).format())
          console.log('keytest', moment(date).format('MM/DD/YYYY'));

        }}
        onCancel={() => {
          setDateToPicker(false)
        }}
      />
      <View style={styles.mainContainer}>
        <View style={styles.buttonConfirmView}>
          <TouchableOpacity style={styles.buttonConfirmContainer}
            onPress={() => getStatistic()}>
            <Text style={styles.buttonConfirmTitle}>Thống kê</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.mainTitle}>Danh sách thiết bị</Text>
        <View style={styles.devicesContainer}>
          <FlatList
            data={initRelayHistoryInfo}
            keyExtractor={item => item.relay_id}
            renderItem={({ item, index }) => _renderItem(item, index)}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  iconRemove: {
    tintColor: 'gray',
    width: 26,
    height: 26,
    marginRight: 5
  },
  itemContainer: {
    backgroundColor: 'white',
    flex: 1,
    marginHorizontal: '10%',
    marginTop: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.border,
    paddingHorizontal: 15,
    paddingVertical: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1
  },
  dateTime: {
    fontSize: fontSize.content,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5
  },
  line2Container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginTop: 10
  },
  line2Content: {
    fontSize: fontSize.contentSmall,
    marginLeft: 8
  },
  timeContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '10%',
    alignItems: 'center',
    marginTop: 20
  },
  datePicker: {
    color: 'black',
    backgroundColor: 'white',
    height: 40,
    borderColor: color.border,
    borderWidth: 1,
    width: widthDevice * 30 / 100,
    borderRadius: 3
  },
  mainTitle: {
    fontSize: fontSize.content,
    fontWeight: 'bold',
    marginTop: 20,
  },
  mainContainer: {
    alignItems: 'center',
  },
  devicesContainer: {
    paddingVertical: 10,
    marginHorizontal: '5%',
    borderRadius: 5,
    width: '90%',
  },
  device: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
  },
  deviceItemContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
    height: 65,
  },
  deviceInfo: {
    flexDirection: 'row',
  },
  deviceSoil: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1
  },
  deviceName: {
    fontSize: fontSize.content,
    fontWeight: 'bold',
  },
  deviceImage: {
    width: 60,
    height: 60,
  },
  deviceIcon: {
    width: 25,
    height: 25,
  },
  deviceIconBig: {
    width: 25,
    height: 15,
    resizeMode: 'contain'
  },
  deviceIconEdit: {
    width: 20,
    height: 20,
    tintColor: 'white'
  },
  deviceIconStatus: {
    width: 15,
    height: 15,
  },
  deviceContent: {
    fontSize: fontSize.contentSmall
  },
  deviceRight: {
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  buttonEdit: {
    backgroundColor: color.blueStrong,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  more: {
    color: color.blueStrong,
    fontStyle: 'italic'
  },
  buttonConfirmView: {
    width: '80%',
    alignItems: 'flex-end'
  },
  buttonConfirmContainer: {
    backgroundColor: color.blueStrong,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 5
  },
  buttonConfirmTitle: {
    fontSize: fontSize.contentSmall,
    color: 'white',
    fontWeight: 'bold'
  }
});

export default HistoryScreen