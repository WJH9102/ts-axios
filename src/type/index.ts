export type Method = 'get' | 'GET'
  | 'post' | 'POST'
  | 'delete' | 'DELETE'
  | 'put' | 'PUT'
  | 'potions' | 'OPTIONS'
  | 'head' | 'HEAD'
  | 'patch' | 'PATCH'

export interface AxiosRequestConfig {
  usl: string
  method?: Method
  param?: any
  data?: any
}
