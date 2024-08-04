import { ReactNode } from "react"


export type CommonResponseType <T = any> = {
    data: {
        status: boolean
        message: string
        data?: T
        error?: any
        totalPage?: number
    },
    status: number
}


export type CommonPropsType = {
    children: ReactNode
}