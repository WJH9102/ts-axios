export type Method = 'get' | 'GET'
    | 'post' | 'POST'
    | 'delete' | 'DELETE'
    | 'put' | 'PUT'
    | 'potions' | 'OPTIONS'
    | 'head' | 'HEAD'
    | 'patch' | 'PATCH'

export interface AxiosRequestConfig {
    url: string
    method?: Method
    params?: any
    data?: any
    headers?: any
    responseType?: XMLHttpRequestResponseType
}

export interface AxiosResponse {
    data: any
    status: number
    statusText: string
    headers: any
    config: AxiosRequestConfig
    request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {
}
