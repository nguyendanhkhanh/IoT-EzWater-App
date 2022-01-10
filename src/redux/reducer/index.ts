import { combineReducers } from "redux";
import { Criteria, Regulation } from "../../model/Mistake";
import { Auth } from "../action/auth";
import auth, { initialToken } from "./auth"
import { initialCriteria } from "./criteria";
import mistake, { DcpReport, initialDcpReport } from "./mistake";
import criteria from "./criteria"
import regulation from './regulation'
import { initialRegulation } from "./regulation";
import { Device, DeviceList } from "../action/listDevices";
import listDevices, { initialListDevices } from "./listDevices";
import device, { initialDevice } from "./device";
export interface RootState {
    auth: Auth;
    mistake: DcpReport,
    criteria: Criteria[],
    regulation: Regulation[]
    listDevices: DeviceList
    device: Device
}

export const initialState: RootState = {
    auth: initialToken,
    mistake: initialDcpReport,
    criteria: initialCriteria,
    regulation: initialRegulation,
    listDevices: initialListDevices,
    device: initialDevice
}

const rootReducer = combineReducers({
    auth,
    mistake,
    criteria,
    regulation,
    listDevices,
    device
});

export default rootReducer;