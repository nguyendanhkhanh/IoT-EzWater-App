import { AnyAction } from "redux"
import { DeviceList } from "../action/listDevices"
import { LOG_OUT, SAVE_DEVICES } from "../type"

export const initialListDevices: DeviceList = []

const listDevicesReducer = (state = JSON.parse(JSON.stringify(initialListDevices)), action: AnyAction) => {
    const { type, payload } = action
    switch (type) {
        case SAVE_DEVICES: {
            console.log(payload)
            return payload
        }
        case LOG_OUT: {
            return initialListDevices
        }
        default:
            return state;
    }
}

export default listDevicesReducer