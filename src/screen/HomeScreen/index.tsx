import { CommonActions, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { publishRelay } from '../../api/publish'
import { PUMP_OFF, PUMP_ON, WATER_OFF, WATER_ON } from '../../assets/source/icon'
import HeaderMain from '../../component/HeaderMain'
import ItemRelay from '../../component/ItemRelay'
import { TREE_STATUS } from '../../constant/environment'
import { MQTT_Broker, MQTT_TOPIC_PUB, MQTT_TOPIC_SUB } from '../../constant/mqtt'
import { RelayData, Environment } from '../../model/MqttData'
import { saveRelayData } from '../../redux/action/mqtt'
import { setListRelay } from '../../redux/action/relay'
import { RootState } from '../../redux/reducer'
import { RelayInfo } from '../../redux/reducer/relay'
import { styles } from './HomeScreen.style'
import ModalEditRelayInfo from './ModalEditRelayInfo'


const HomeScreen = () => {
  const client = new Paho.MQTT.Client(MQTT_Broker.HOST, MQTT_Broker.PORT, MQTT_Broker.CLIENT_NAME);
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { macAddress } = useSelector((state: RootState) => state.device)
  const listRelayInfo = useSelector((state: RootState) => state.relay)
  const relayData = useSelector((state: RootState) => state.mqtt.relay)
  const environment = useSelector((state: RootState) => state.mqtt.environment)
  let topicSubRelayData = `${MQTT_TOPIC_SUB.RELAY_DATA}${macAddress}`
  let topicSubEnvironment = `${MQTT_TOPIC_SUB.ENV}${macAddress}`
  let topicSubNotification = `${MQTT_TOPIC_SUB.NOTIFICATION}${macAddress}`
  let topicPubRelay0 = `${MQTT_TOPIC_PUB.RELAY_0}${macAddress}`
  let topicPubRelay1 = `${MQTT_TOPIC_PUB.RELAY_1}${macAddress}`
  let topicPubRelay2 = `${MQTT_TOPIC_PUB.RELAY_2}${macAddress}`
  let topicPubRelay3 = `${MQTT_TOPIC_PUB.RELAY_3}${macAddress}`
  let topicPubRelay4 = `${MQTT_TOPIC_PUB.RELAY_4}${macAddress}`
  // const [relayControl, setRelayControl] = useState<RelayData | null>(null)
  // let relayControl: RelayData | null = null
  const [relayEdit, setRelayEdit] = useState<RelayInfo | null>(null)

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
    // Once a connection has been made, make a subscription and send a message
    client.subscribe(topicSubRelayData)
    console.log("Subscribe ", topicSubRelayData);
    client.subscribe(topicSubEnvironment)
    console.log("Subscribe ", topicSubEnvironment);
  }

  function onConnectionLost(responseObject: any) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
    // reconnect();
  }

  function onMessageArrived(message: any) {

    console.log("onMessageArrived: " + message.topic + message.payloadString);
    switch (message.topic) {
      case topicSubRelayData: {
        dispatch(saveRelayData(JSON.parse(message.payloadString)))
        onConnect()
        break;
      }
      case topicSubEnvironment: {
        // dispatch(saveRelayData(JSON.parse(message.payloadString)))
        // setEnvironment(JSON.parse(message.payloadString))
        break;
      }
      case topicSubNotification: {
        Alert.alert("Warning", message.payloadString.message)
        //
        break;
      }
      default: {
        break;
      }
    }
  }

  const clientPublish = (topicPub: string, status: string) => {
    publishRelay(topicPub, status)
  }

  const sendMessage = (relayControl: RelayData | null) => {
    console.log(relayControl);
    if (relayControl == null) return

    switch (relayControl.relay_id) {
      case "1": {
        console.log('keytest', relayControl);
        if (relayControl.status === "0") {
          clientPublish(topicPubRelay1, "1")
          clientPublish(topicPubRelay0, "1")
        }
        else {
          clientPublish(topicPubRelay1, "0")
          const currentWater = relayData.find(item => item.relay_id === "2" && item.status == "1")
          if (currentWater === undefined) clientPublish(topicPubRelay0, "0")
        }

        // setRelayControl(null)
        break;
      }
      case "2": {
        if (relayControl.status === "0") {
          clientPublish(topicPubRelay2, "1")
          clientPublish(topicPubRelay0, "1")
        }
        else {
          clientPublish(topicPubRelay2, "0")
          const currentWater = relayData.find(item => item.relay_id === "1" && item.status == "1")
          if (currentWater === undefined) clientPublish(topicPubRelay0, "0")
        }
        break;
      }
      case "3": {
        if (relayControl.status === "0") {
          clientPublish(topicPubRelay3, "1")
          clientPublish(topicPubRelay0, "1")
        }
        else {
          clientPublish(topicPubRelay3, "0")
          clientPublish(topicPubRelay0, "0")
        }
        break;
      }
      case "4": {
        if (relayControl.status === "0") {
          clientPublish(topicPubRelay4, "1")
          clientPublish(topicPubRelay0, "1")
        }
        else {
          clientPublish(topicPubRelay4, "0")
          clientPublish(topicPubRelay0, "0")
        }
        break;
      }

      default:
        break;
    }
  }

  const saveRelay = (newRelayInfo: RelayInfo) => {
    const newRelay = listRelayInfo.find(item => item.relay_id === newRelayInfo.relay_id)
    if (newRelay === undefined) return
    newRelay.relay_name = newRelayInfo.relay_name
    newRelay.relay_warning_humidity = newRelayInfo.relay_warning_humidity
    dispatch(setListRelay(listRelayInfo))
    setRelayEdit(null)
  }


  const _renderItem = (item: RelayData, index: number) => {
    const relayInfo = listRelayInfo.find(relay => relay.relay_id === item.relay_id)
    const soilHumidity = item.soil_humidity ? Number(item.soil_humidity) : 0
    const soilHumidityWarning = relayInfo ? relayInfo.relay_warning_humidity : 50
    let treeStatus = TREE_STATUS.GOOD
    if (Number(item.status) === 1) treeStatus = TREE_STATUS.WATERING
    else {
      if (soilHumidity < soilHumidityWarning) treeStatus = TREE_STATUS.WARNING
      else treeStatus = TREE_STATUS.GOOD
    }
    return (
      <View style={styles.device}>
        <TouchableOpacity onPress={() => sendMessage(item)}>
          <Image
            source={Number(item.status) === 1 ? WATER_ON : WATER_OFF}
            style={styles.deviceImage}
          />
        </TouchableOpacity>
        <View style={styles.deviceItemContainer}>
          <Text style={styles.deviceName}>{relayInfo ? relayInfo.relay_name : `Van ${index + 1}`}</Text>
          <View style={styles.deviceInfo}>
            <View style={styles.deviceSoil}>
              <Image source={require('../../assets/icon/soil.png')}
                style={styles.deviceIcon}
              />
              <Text style={styles.deviceContent}>{` ${item.soil_humidity ?? ''} %`}</Text>
            </View>
            <View style={styles.deviceSoil}>
              <Image source={require('../../assets/icon/soil_warning.png')}
                style={styles.deviceIcon}
              />
              <Text style={styles.deviceContent}>{` ${relayInfo ? relayInfo.relay_warning_humidity : 30} %`}</Text>
            </View>
          </View>
        </View>
        <View style={styles.deviceRight}>
          <Image source={require('../../assets/icon/status.png')}
            style={[styles.deviceIconStatus, { tintColor: treeStatus }]}
          />
          <TouchableOpacity style={styles.buttonEdit}
            onPress={() => setRelayEdit(relayInfo ? relayInfo : null)}>
            <Image source={require('../../assets/icon/edit.png')}
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
            source={require('../../assets/icon/temperature.png')}
            style={styles.iconEnvironment}
          />
          <Text style={styles.contentEnvironment}>{environment.temperature} °C</Text>
        </View>
        <View style={styles.environmentRightContainer}>
          <Image
            source={require('../../assets/icon/humidity.png')}
            style={styles.iconEnvironment}
          />
          <Text style={styles.contentEnvironment}>{environment.humidity} %</Text>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.mainTitle}>Danh sách thiết bị</Text>
        <View style={styles.devicesContainer}>
          <FlatList
            data={relayData.filter(item => item.relay_id !== "0")}
            keyExtractor={item => item.relay_id}
            renderItem={({ item, index }) => _renderItem(item, index)}
          />
        </View>
        {relayEdit &&
          <ModalEditRelayInfo
            relayInfo={relayEdit}
            onClose={() => setRelayEdit(null)}
            onConfirm={(newRelayInfo) => saveRelay(newRelayInfo)}
          />}
      </View>
      <View style={styles.iconSendContainer}>
        <TouchableOpacity
          disabled={relayData.find(item => item.status === "1") !== undefined}
          onPress={() => clientPublish(topicPubRelay0, "0")}>
          <Image source={relayData.find(item => item.status === "1") ? PUMP_ON : PUMP_OFF} style={styles.iconSend} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => reconnect()}>
          <Image source={require('../../assets/icon/refresh.png')} style={styles.iconSend} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen