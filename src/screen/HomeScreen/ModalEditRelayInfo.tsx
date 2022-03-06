import React, { ReactElement, useState } from 'react'
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { RelayInfo } from '../../redux/reducer/relay'
import { styles } from './HomeScreen.style'

interface Props {
  modalVisible?: boolean
  onClose: () => void
  onConfirm: (newRelayInfo: RelayInfo) => void
  relayInfo: RelayInfo
}

export default function ModalEditRelayInfo(props: Props) {
  const { relayInfo, onClose, onConfirm } = props
  const [relayName, setRelayName] = useState(relayInfo.relay_name)
  const [autoOnOff, setAutoOnOff] = useState(relayInfo.auto_on_off)
  const [waterTime, setWaterTime] = useState(relayInfo.water_time)
  const [humidityWarning, setHumidityWarning] = useState(relayInfo.relay_warning_humidity)

  const onConfirmEdit = () => {
    const newRelayInfo = { ...relayInfo }
    newRelayInfo.relay_name = relayName
    newRelayInfo.relay_warning_humidity = humidityWarning
    onConfirm(newRelayInfo)
  }

  const _renderFooterModal = () => (
    <View style={styles.modalFooterContainer}>
      <TouchableOpacity style={styles.modalButtonCancel}
        onPress={onClose}>
        <Text style={styles.modalButtonCancelTitle}>Hủy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.modalButtonConfirm}
        onPress={onConfirmEdit}>
        <Text style={styles.modalButtonConfirmTitle}>Đồng ý</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <Modal
      animationType="fade"
      transparent
      visible
      statusBarTranslucent
      onRequestClose={onClose}>
      <View style={styles.centerView}>
        <View style={styles.modalView}>
          <View style={styles.modalLineContainer}>
            <Text style={styles.modalContent}>Tên gợi nhớ: </Text>
            <TextInput
              placeholder="Nhập tên gợi nhớ"
              value={relayName}
              style={styles.modalContentInput}
              onChangeText={value => setRelayName(value)}
            />
          </View>
          <View style={styles.modalLineContainer}>
            <Text style={styles.modalContent}>Độ ẩm cảnh báo: </Text>
            <TextInput
              placeholder="Nhập độ ẩm"
              value={humidityWarning.toString()}
              style={styles.modalContentInput}
              onChangeText={value => { setHumidityWarning(Number(value)) }}
            />
          </View>
          <View style={styles.modalLineContainer}>
            <Text style={styles.modalContent}>Tự động bơm: </Text>
            <TouchableOpacity style={styles.autoContainer}
              onPress={() => setAutoOnOff(!autoOnOff)}>
              <View style={[styles.autoButtonContainer, autoOnOff && styles.bgcGrey]}>
                <Text style={styles.autoTitle}>OFF</Text>
              </View>
              <View style={[styles.autoButtonContainer, !autoOnOff && styles.bgcGrey]}>
                <Text style={styles.autoTitle}>ON</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.modalLineContainer}>
            <Text style={styles.modalContent}>Thời gian bơm: </Text>
            <TextInput
              placeholder="Nhập thời gian tự động bơm"
              value={waterTime.toString()}
              style={styles.modalContentInput}
              onChangeText={value => { setWaterTime(Number(value)) }}
            />
          </View>
          {_renderFooterModal()}
        </View>
      </View>
    </Modal>
  )
}
