import { CommonActions, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { color } from '../assets/color'
import { fontSize, widthDevice } from '../assets/size'
import { WATER_OFF, WATER_ON } from '../assets/source/icon'
import HeaderMain from '../component/HeaderMain'
import { TREE_STATUS } from '../constant/environment'
import { MQTT_Broker, MQTT_TOPIC_SUB } from '../constant/mqtt'
import { RelayData, Environment } from '../model/MqttData'
import { RootState } from '../redux/reducer'

const initEnv: Environment = {
  temperature: "0",
  humidity: "0"
}
export const initRelay: RelayData[] = [
  {
    relay_id: "1",
    status: "0",
    soil_humidity: "0"
  },
  {
    relay_id: "2",
    status: "0",
    soil_humidity: "0"
  },
  {
    relay_id: "3",
    status: "0",
    soil_humidity: "0"
  },
  {
    relay_id: "4",
    status: "0",
    soil_humidity: "0"
  }
]

const HomeScreen = () => {
  const client = new Paho.MQTT.Client(MQTT_Broker.HOST, MQTT_Broker.PORT, MQTT_Broker.CLIENT_NAME);
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { macAddress } = useSelector((state: RootState) => state.device)
  let topicSubRelayData = `${MQTT_TOPIC_SUB.RELAY_DATA}${macAddress}`
  let topicSubEnvironment = `${MQTT_TOPIC_SUB.ENV}${macAddress}`
  let topicSubNotification = `${MQTT_TOPIC_SUB.NOTIFICATION}${macAddress}`
  const [relayData, setRelayData] = useState<RelayData[]>(initRelay)
  const [environment, setEnvironment] = useState<Environment>(initEnv)

  useEffect(() => {
    topicSubRelayData = `${MQTT_TOPIC_SUB.RELAY_DATA}${macAddress}`
    topicSubEnvironment = `${MQTT_TOPIC_SUB.ENV}${macAddress}`
    topicSubNotification = `${MQTT_TOPIC_SUB.NOTIFICATION}${macAddress}`
    reconnect();
  }, [macAddress])

  var options = {
    useSSL: true,
    userName: MQTT_Broker.USER_NAME,
    password: MQTT_Broker.PASSWORD,
    onSuccess: onConnect,
    onFailure: onConnectionLost
  }


  function reconnect() {
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.connect(options);
    console.log("reconnect");
    
  }

  // connect the client

  function onConnect() {
    console.log("onConnect");
    client.subscribe(topicSubRelayData)
    console.log("Subscribe ", topicSubRelayData);
    client.subscribe(topicSubEnvironment)
    console.log("Subscribe ", topicSubEnvironment);
  }

  function onConnectionLost(responseObject: any) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
    reconnect();
  }

  function onMessageArrived(message: any) {
    console.log("onMessageArrived: " + message.topic + message.payloadString);
    switch (message.topic) {
      case topicSubRelayData: {
        setRelayData(JSON.parse(message.payloadString))
        break;
      }
      case topicSubEnvironment: {
        setEnvironment(JSON.parse(message.payloadString))
        break;
      }
      case topicSubNotification: {
        Alert.alert("Warning", message.payloadString.message)
        //
        break;
      }
      default:
        break;
    }
  }

  const _renderItem = (item: RelayData, index: number) => {
    const soilHumidity = item.soil_humidity ? Number(item.soil_humidity) : 0
    let treeStatus = TREE_STATUS.GOOD
    if (Number(item.status) === 1) treeStatus = TREE_STATUS.WATERING
    else {
      if (soilHumidity < 30) treeStatus = TREE_STATUS.WARNING
      else treeStatus = TREE_STATUS.GOOD
    }
    return (
      <View style={styles.device}>
        <Image
          source={Number(item.status) === 1 ? WATER_ON : WATER_OFF}
          style={styles.deviceImage}
        />
        <View style={styles.deviceItemContainer}>
          <Text style={styles.deviceName}>{`Van ${index + 1}`}</Text>
          <View style={styles.deviceInfo}>
            <View style={styles.deviceSoil}>
              <Image source={require('../assets/icon/soil.png')}
                style={styles.deviceIcon}
              />
              <Text style={styles.deviceContent}>{` ${item.soil_humidity ?? ''} %`}</Text>
            </View>
            <View style={styles.deviceSoil}>
              <Image source={require('../assets/icon/soil_warning.png')}
                style={styles.deviceIcon}
              />
              <Text style={styles.deviceContent}>{` ${"30"} %`}</Text>
            </View>
          </View>
        </View>
        <View style={styles.deviceRight}>
          <Image source={require('../assets/icon/status.png')}
            style={[styles.deviceIconStatus, { tintColor: treeStatus }]}
          />
          <TouchableOpacity style={styles.buttonEdit}>
            <Image source={require('../assets/icon/edit.png')}
              style={styles.deviceIconEdit}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMain
        title="Môi trường"
      />
      <View style={styles.environmentContainer}>
        <View style={styles.environmentLeftContainer}>
          <Image
            source={require('../assets/icon/temperature.png')}
            style={styles.iconEnvironment}
          />
          <Text style={styles.contentEnvironment}>{environment.temperature} °C</Text>
        </View>
        <View style={styles.environmentRightContainer}>
          <Image
            source={require('../assets/icon/humidity.png')}
            style={styles.iconEnvironment}
          />
          <Text style={styles.contentEnvironment}>{environment.humidity} %</Text>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.mainTitle}>Danh sách thiết bị</Text>
        <View style={styles.devicesContainer}>
          <FlatList
            data={relayData}
            keyExtractor={item => item.relay_id}
            renderItem={({ item, index }) => _renderItem(item, index)}
          />
        </View>
      </View>
      <View style={styles.iconSendContainer}>
        <TouchableOpacity onPress={() => navigation.dispatch(
          CommonActions.navigate({
            name: 'ReportInfo',
          })
        )}>
          <Image source={require('../assets/icon/send.png')} style={styles.iconSend} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  environmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: '5%',
    marginHorizontal: '5%',
    borderRadius: 5,
  },
  environmentLeftContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  environmentRightContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  iconEnvironment: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  contentEnvironment: {
    color: color.blueStrong,
    fontSize: fontSize.title,
    fontWeight: 'bold'
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
    width: 35,
    height: 26,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainTitle: {
    fontSize: fontSize.content,
    fontWeight: 'bold',
    marginTop: 20,
  },
  iconSearch: {
    marginRight: 10
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: widthDevice * 80 / 100,
    height: 45,
    backgroundColor: 'white',
    color: 'black',
    marginTop: 20,
    borderRadius: 5,
    paddingHorizontal: 15
  },
  iconSendContainer: {
    alignItems: 'flex-end'
  },
  iconSend: {
    width: 55,
    height: 55,
    margin: 30
  }
});

export default HomeScreen