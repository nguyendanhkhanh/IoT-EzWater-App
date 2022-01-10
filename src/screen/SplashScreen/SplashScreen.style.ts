import { StyleSheet } from "react-native";
import { color } from "../../assets/color";

export const styles = StyleSheet.create({
    logo: {
        tintColor: 'black',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: color.blue,
    },
})