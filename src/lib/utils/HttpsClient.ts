import { CommonResponseType } from "../types/index";
import Axios from "./Axios";


const getRequest = async (url: string, config: object = {}): Promise<CommonResponseType> => {
    try {
        const response = await Axios.AxiosJson.get(url, config)
        return response.data
    } catch (error: any) {
        return error.response.data
    }

}

const postRequest = async (url: string, data: object = {}, config: object = {}, isFromData: boolean = false): Promise<CommonResponseType> => {
    try {
        const response = isFromData ? await Axios.AxiosForm.post(url, data, config) : await Axios.AxiosJson.post(url, data, config)
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}

const putRequest = async (url: string, data: object = {}, config: object = {}, isFromData: boolean = false): Promise<CommonResponseType> => {
    try {
        const response = isFromData ? await Axios.AxiosForm.put(url, data, config) : await Axios.AxiosJson.put(url, data, config)
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}

const deleteRequest = async (url: string, config: object = {}): Promise<CommonResponseType> => {
    try {
        const response = await Axios.AxiosJson.delete(url, config)
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}

export { getRequest, postRequest, putRequest, deleteRequest };