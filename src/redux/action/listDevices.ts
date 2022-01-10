import { SAVE_DEVICES, SET_DEVICE } from "../type"

export type Device = {
    macAddress: string,
    nameDevice: string
}

export type DeviceList = Device[]

export function saveDevices (payload: DeviceList) {
    return {
        type: SAVE_DEVICES,
        payload: payload
    }
}
