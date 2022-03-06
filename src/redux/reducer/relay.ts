import { AnyAction } from "redux";
import { LOG_OUT, SET_LIST_RELAY } from "../type";

export type RelayInfo = {
    relay_id: string
    relay_name: string
    relay_warning_humidity: number,
    auto_on_off: boolean,
    water_time: number
}
export type RelayList = RelayInfo[]
export const initialListRelay: RelayList = [
    {
        relay_id: "1",
        relay_name: "Van 1",
        relay_warning_humidity: 50,
        auto_on_off: false,
        water_time: 60
    },
    {
        relay_id: "2",
        relay_name: "Van 2",
        relay_warning_humidity: 50,
        auto_on_off: false,
        water_time: 60
    },
    {
        relay_id: "3",
        relay_name: "Van 3",
        relay_warning_humidity: 50,
        auto_on_off: false,
        water_time: 60
    },
    {
        relay_id: "4",
        relay_name: "Van 4",
        relay_warning_humidity: 50,
        auto_on_off: false,
        water_time: 60
    }
]

const relayReducer = (state = JSON.parse(JSON.stringify(initialListRelay)), action: AnyAction) => {
    const { type, payload } = action
    switch (type) {
        case SET_LIST_RELAY: {
            return payload
        }
        case LOG_OUT: {
            return initialListRelay
        }
        default:
            return state;
    }
}

export default relayReducer