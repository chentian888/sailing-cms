import _ from 'lodash'
import { AxiosResponse, AxiosError } from 'axios/index'
import { RequestConfig } from '@/request/http'

// const HttpEngine = require(`HttpEngine/http/HttpEngine.${
//   process.env.NODE_ENV === 'development' ? 'dev' : 'prod'
// }`).default
import HttpEngine from '@/request/http/HttpEngine.dev'

export default class Http extends HttpEngine {
  loadingHash = ''
  constructor() {
    super()
    this.baseURL = process.env.VUE_APP_HTTP_BASE_URL
    this.mockTimeout = 1
    this.requestedSever = false
  }

  beforeSendRequestHandler(config: RequestConfig) {
    config.headers = { ...config.headers }
  }
  afterResolveResponseHandler() {
    // this.loadingHash && loading.hide(this.loadingHash)
  }

  afterRejectResponseHandler(error: AxiosError<any>) {
    // this.loadingHash && loading.hide(this.loadingHash)
    let errorMsg = error.message
    const response: AxiosResponse<any> | undefined = error.response
    if (errorMsg === 'Network Error') {
      errorMsg = '网络异常'
    }
    if (errorMsg.indexOf('timeout') >= 0) {
      errorMsg = '请求超时'
    }

    if (_.isObject(response)) {
      if (_.isObject(response.data)) {
        errorMsg = (response.data as any)['error_msg']
      }
      if (response.status === 401) {
        // helper.logout(sysConfig.loginPage)
        return
      }
    }
    // helper.toast(errorMsg)
  }
}
