import { StyleSheet } from "react-native";
import { color } from "../../assets/color";
import { fontSize, heightDevice, widthDevice } from "../../assets/size";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
        alignItems: 'center',
        height: heightDevice
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    contentContainer: {
        flex: 1,
    },
    buttonAddContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        padding: 20
    },
    buttonAdd: {
        backgroundColor: color.blueStrong,
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginBottom: 50
    },
    buttonAddTitle: {
        color: 'white',
        fontSize: fontSize.contentSmall,
        fontWeight: 'bold',
    },
    inputMacAddress: {
        borderColor: color.blue,
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 5
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
        fontSize: fontSize.contentSmall,
        marginTop: 2
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
})