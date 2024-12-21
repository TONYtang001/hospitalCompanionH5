import request from '../utils/request'

export default {
    login(data) {
        return request.post('/login', data)
    },
    // 首页数据
    Index() {
        return request.get('/Index/index')
    },
    // 订单详情(陪护师列表)
    h5Companion () {
        return request.get('/h5/companion')
    },
    // 提交订单
    createOrder(data) {
        return request.post('/createOrder', data)
    },
    // 获取订单列表
    orderList(params) {
        return request.get('/order/list', {params})
    },
    // 获取订单详情
    orderDetail(params) {
        return request.get('/order/detail', {params})
    }
}