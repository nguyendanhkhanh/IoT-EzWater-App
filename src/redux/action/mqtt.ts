import { Environment, RelayData } from "../../model/MqttData";
import { ENVIRONMENT_DATA, RELAY_DATA } from "../type";

export function saveRelayData (payload: RelayData[]) {
    return {
        type: RELAY_DATA,
        payload: payload
    }
}
export function saveEnvData (payload: Environment) {
    return {
        type: ENVIRONMENT_DATA,
        payload: payload
    }
}