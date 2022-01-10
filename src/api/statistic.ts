import { StatisticRequest } from "../model/Statistic"
import { getApiService } from "./BaseApiService"

export const statistic = async (params: StatisticRequest) => {
    const endpoint = `api/statistic`
    const axios = await getApiService()
    return axios.post(endpoint, params)
}