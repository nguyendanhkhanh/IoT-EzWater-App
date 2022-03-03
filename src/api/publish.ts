import { getApiService } from "./BaseApiService"

export const publishRelay = async (topic: string, status: string) => {
    const params = {
        topic,
        status
    }
    const endpoint = `api/publish`
    const axios = await getApiService()
    return axios.post(endpoint, params)
}