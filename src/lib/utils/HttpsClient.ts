import { CommonResponseType } from "../types/index";
import Axios from "./Axios";


const getRequest = async ( url: string, config: object = {}): Promise<CommonResponseType> => {
    return await Axios.get(url, config)
}

const postRequest = async ( url: string, data: object = {}, config: object = {}): Promise<CommonResponseType> => {
    try {
        const response = await Axios.post(url, data, config)
        return response.data
    } catch(error: any) {
        return error.response.data
    }
}

const putRequest = async ( url: string, data: object = {}, config: object = {}): Promise<CommonResponseType> => {
    return await Axios.put(url, data, config)
}

const deleteRequest = async ( url: string, data: object = {}, config: object = {}): Promise<CommonResponseType> => {
    return await Axios.delete(url, config)
}

export {getRequest, postRequest, putRequest, deleteRequest};