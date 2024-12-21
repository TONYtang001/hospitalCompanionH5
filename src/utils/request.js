// 这是对axios的二次封装，配置一些通用项


import axios from 'axios'

const http = axios.create({
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    // 现在这个是别人已经写好放在服务器上的接口，后续可以自己用springboot复现替换
    baseURL: 'https:/v3pz.itndedu.com/v3pz',
    // 默认请求超时时间
    timeout: 10000,
    headers: { "terminal": "h5" }
  });

//   添加拦截器
// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么


    const token = localStorage.getItem('h5_token')
    // 创建token白名单(指定不需要token的api)
    const whiteUrl = ['/login']
    if (token && !whiteUrl.includes(config.url)){
        // 默认添加token作为请求头
        config.headers['h-token'] = token
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 对接口异常的数据，给用户提示
    if(response.data.code === -1){
        
    }
    if(response.data.code === -2){
      localStorage.removeItem('h5_token')
      localStorage.removeItem('h5_userInfo')
      window.location.href = window.location.origin

  }
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });


  export default http