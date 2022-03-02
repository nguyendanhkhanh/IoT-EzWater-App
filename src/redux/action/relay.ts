import { RelayList } from "../reducer/relay";
import { SET_LIST_RELAY } from "../type";

export function setListRelay (payload: RelayList) {
    return {
        type: SET_LIST_RELAY,
        payload: payload
    }
}