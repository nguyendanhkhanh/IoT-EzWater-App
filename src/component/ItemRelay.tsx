import React, { ReactElement } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { WATER_OFF, WATER_ON } from '../assets/source/icon'
import { TREE_STATUS } from '../constant/environment'
import { MQTT_TOPIC_PUB } from '../constant/mqtt'
import { RelayData } from '../model/MqttData'
import { RootState } from '../redux/reducer'
import { styles } from '../screen/HomeScreen/HomeScreen.style'

interface Props {
  item: RelayData,
  index: number,
  client: any
}

export default function ItemRelay(props: Props): ReactElement {
  const { item, index, client } = props
  const listRelayInfo = useSelector((state: RootState) => state.relay)
  const { macAddress } = useSelector((state: RootState) => state.device)
  const relayInfo = listRelayInfo.find(relay => relay.relay_id === item.relay_id)
  const soilHumidity = item.soil_humidity ? Number(item.soil_humidity) : 0
  const soilHumidityWarning = relayInfo ? relayInfo.relay_warning_humidity : 50
  let treeStatus = TREE_STATUS.GOOD
  let topicPubRelay0 = `${MQTT_TOPIC_PUB.RELAY_0}${macAddress}`
  if (Number(item.status) === 1) treeStatus = TREE_STATUS.WATERING
  else {
    if (soilHumidity < soilHumidityWarning) treeStatus = TREE_STATUS.WARNING
    else treeStatus = TREE_STATUS.GOOD
  }
  return (
    <View style={styles.device}>
      <TouchableOpacity onPress={() => client.publish(topicPubRelay0, "0")}>
        <Image
          source={Number(item.status) === 1 ? WATER_ON : WATER_OFF}
          style={styles.deviceImage}
        />
      </TouchableOpacity>
      <View style={styles.deviceItemContainer}>
        <Text style={styles.deviceName}>{relayInfo ? relayInfo.relay_name : `Van ${index + 1}`}</Text>
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
            <Text style={styles.deviceContent}>{` ${relayInfo ? relayInfo.relay_warning_humidity : 30} %`}</Text>
          </View>
        </View>
      </View>
      <View style={styles.deviceRight}>
        <Image source={require('../assets/icon/status.png')}
          style={[styles.deviceIconStatus, { tintColor: treeStatus }]}
        />
        <TouchableOpacity style={styles.buttonEdit}
        // onPress={() => setRelayEdit(relayInfo ? relayInfo : null)}
        >
          <Image source={require('../assets/icon/edit.png')}
            style={styles.deviceIconEdit}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
