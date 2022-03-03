import { combineReducers } from "redux";
import { Auth } from "../action/auth";
import auth, { initialToken } from "./auth"
import { Device, DeviceList } from "../action/listDevices";
import listDevices, { initialListDevices } from "./listDevices";
import device, { initialDevice } from "./device";
import relay, { initialListRelay, RelayList } from "./relay";
import mqtt, { initialMqtt, MqttData } from "./mqtt";
export interface RootState {
    auth: Auth;
    listDevices: DeviceList
    device: Device
    relay: RelayList
    mqtt: MqttData
}

export const initialState: RootState = {
    auth: initialToken,
    listDevices: initialListDevices,
    device: initialDevice,
    relay: initialListRelay,
    mqtt: initialMqtt
}

const rootReducer = combineReducers({
    auth,
    listDevices,
    device,
    relay,
    mqtt
});

export default rootReducer;