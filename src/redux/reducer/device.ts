import { AnyAction } from "redux"
import { Device } from "../action/listDevices"
import { LOG_OUT, SET_DEVICE } from "../type"

export const initialDevice: Device = {macAddress: ""}

const deviceReducer = (state = JSON.parse(JSON.stringify(initialDevice)), action: AnyAction) => {
    const { type, payload } = action
    switch (type) {
        case SET_DEVICE: {
            return payload
        }
        case LOG_OUT: {
            return initialDevice
        }
        default:
            return state;
    }
}

export default deviceReducer