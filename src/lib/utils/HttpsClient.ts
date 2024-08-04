import { CommonResponseType } from "../types/index";
import Axios from "./Axios";


const getRequest = async (url: string, config: object = {}): Promise<CommonResponseType> => {
    try {
        const response = await Axios.AxiosJson.get(url, config)
        return { data: response.data, status: response.status }
    } catch (error: any) {
        return { data: error.response.data, status: error.response.status }
    }
}

const postRequest = async (url: string, data: object = {}, config: object = {}, isFromData: boolean = false): Promise<CommonResponseType> => {
    try {
        const response = isFromData ? await Axios.AxiosForm.post(url, data, config) : await Axios.AxiosJson.post(url, data, config)
        return { data: response.data, status: response.status }
    } catch (error: any) {
        return { data: error.response.data, status: error.response.status }
    }
}

const putRequest = async (url: string, data: object = {}, config: object = {}, isFromData: boolean = false): Promise<CommonResponseType> => {
    try {
        const response = isFromData ? await Axios.AxiosForm.put(url, data, config) : await Axios.AxiosJson.put(url, data, config)
        return { data: response.data, status: response.status }
    } catch (error: any) {
        return { data: error.response.data, status: error.response.status }
    }
}

const deleteRequest = async (url: string, config: object = {}): Promise<CommonResponseType> => {
    try {
        const response = await Axios.AxiosJson.delete(url, config)
        return { data: response.data, status: response.status }
    } catch (error: any) {
        return { data: error.response.data, status: error.response.status }
    }
}

export { getRequest, postRequest, putRequest, deleteRequest };