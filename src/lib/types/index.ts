import { ReactNode } from "react"


export type CommonResponseType = {
    status: boolean
    message: string
    data?: any
    error?: any
    totalPage?: number
}

export type CommonPropsType = {
    children: ReactNode
}