import { SET_DEVICE } from "../type";
import { Device } from "./listDevices";

export function setCurrentDevice (payload: Device) {
    return {
        type: SET_DEVICE,
        payload: payload
    }
}