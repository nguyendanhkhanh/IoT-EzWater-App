export interface StatisticRequest {
    mac_address: string,
    relay_id: string,
    time_from: string,
    time_to: string
}
export interface StatisticResponse {
    relay_id: string
    relay_name: string
    water_time: string
    water_amount: string
    timestamp: string
}