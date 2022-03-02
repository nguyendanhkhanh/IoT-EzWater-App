import { StyleSheet } from "react-native";
import { color } from "../../assets/color";
import { fontSize, widthDevice } from "../../assets/size";

export const styles = StyleSheet.create({
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
    },
    centerView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        paddingTop: 20,
        alignItems: 'center',
        height: '25%',
        borderRadius: 10
    },
    modalLineContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        minHeight: 20,
        paddingHorizontal: 15
    },
    modalContent: {
        fontSize: fontSize.content,
        flex: 1,
        paddingRight: 5
    },
    modalContentInput: {
        fontSize: fontSize.content,
        flex: 1,
        borderBottomWidth: 1.5,
        borderColor: 'grey',
    },
    modalFooterContainer: {
        flexDirection: 'row',
        paddingVertical: 5,
        marginTop: 15,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    modalButtonConfirm: {
        flex: 1,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: 'gray'
    },
    modalButtonCancel: {
        flex: 1,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalButtonConfirmTitle: {
        fontSize: fontSize.content,
        fontWeight: 'bold',
        color: color.blueStrong
    },
    modalButtonCancelTitle: {
        fontSize: fontSize.content,
        fontWeight: 'bold',
        color: color.red
    }
});