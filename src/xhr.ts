import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './type'
import { parseHeaders } from './helpers/headers'

export function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise(resolve => {
        const { url, method = 'get', data = null, headers, responseType } = config
        const request = new XMLHttpRequest()

        if (responseType) {
            request.responseType = responseType
        }

        request.open(method.toLocaleUpperCase(), url, true)

        request.onreadystatechange  = function handleLoad() {
            if (request.readyState !== 4) {
                return
            }
            const responseHeader = parseHeaders(request.getAllResponseHeaders())
            const responseData = responseType !== 'text' ? request.response : request.responseText
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeader,
                config,
                request
            }
            resolve(response)
        }

        Object.keys(headers).forEach((name) => {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name]
            } else {
                request.setRequestHeader(name, headers[name])
            }
        })
        request.send(data)
    })
}
