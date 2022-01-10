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
    itemContainer: {
        width: widthDevice * 80 / 100,
        marginTop: 10
    },
    inputMacAddress: {
        borderColor: color.blue,
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 5
    }
})