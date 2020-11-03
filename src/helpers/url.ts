import { isDate, isPlainObject } from './util'

function encode(val: string): string {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any): string {
    if (!params) {
        return url
    }

    const parts: string[] = []
    // 遍历params的key
    Object.keys(params).forEach(key => {
        // 获取params对应key的value，val有多种类型
        const val = params[key]
        // 为空 跳出循环
        if (val === null || typeof val === 'undefined') return

        let values = []
        // 判断val是否为数组，不是数组则转化为数组
        if (Array.isArray(val)) {
            values = val
            key += '[]'
        } else {
            values = [val]
        }

        // 遍历值数组
        values.forEach(value => {
            if (isDate(value)) {
                value = value.toISOString()
            } else if (isPlainObject(value)) {
                value = JSON.stringify(value)
            }
            parts.push(`${encode(key)}=${encode(value)}`)
        })
    })

    let serializedParams = parts.join('&')
    if (serializedParams) {
        const markIndex = serializedParams.indexOf('#')
        if (markIndex !== -1) {
            url = url.slice(0, markIndex)
        }
        url += (url.indexOf('?') === -1? '?' : '&') + serializedParams
    }
    return url

}
