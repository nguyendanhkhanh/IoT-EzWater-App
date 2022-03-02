import { combineReducers } from "redux";
import { Auth } from "../action/auth";
import auth, { initialToken } from "./auth"
import { Device, DeviceList } from "../action/listDevices";
import listDevices, { initialListDevices } from "./listDevices";
import device, { initialDevice } from "./device";
import relay, { initialListRelay, RelayList } from "./relay";
export interface RootState {
    auth: Auth;
    listDevices: DeviceList
    device: Device
    relay: RelayList
}

export const initialState: RootState = {
    auth: initialToken,
    listDevices: initialListDevices,
    device: initialDevice,
    relay: initialListRelay
}

const rootReducer = combineReducers({
    auth,
    listDevices,
    device,
    relay
});

export default rootReducer;