import { StyleSheet } from "react-native";
import { color } from "../../assets/color";
import { fontSize, height, width, widthDevice } from "../../assets/size";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: color.blue,
    },
    logo: {
        tintColor: 'black',
    },
    inputContainer: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        backgroundColor: 'white',
        width: width.button,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginBottom: 10
    },
    inputPass: {
        backgroundColor: 'white',
        width: width.button,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        paddingHorizontal: 30,
        paddingVertical: 5,
        height: height.button,
        width: width.button,
        backgroundColor: color.blueStrong,
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginTop: 20
    },
    buttonTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    errMess: {
        fontSize: fontSize.tag,
        color: 'red'
    },
    iconEye: {
        width: 30,
        height: 30,
        tintColor: 'grey'
    },
    register: {
        marginTop: 10,
        fontSize: fontSize.contentSmall,
        color: color.blueStrong,
        textDecorationLine: 'underline'
    }
})