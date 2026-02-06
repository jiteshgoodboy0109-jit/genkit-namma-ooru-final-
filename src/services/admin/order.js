import api from '../api'

export const getAdminOrders = (params={}) => {
    const res = api.get('/orders/admin/orders-list/',{
        params,
    })
    return res
}


export const UpdateOrderStatus = (orderId,status) => {
    const res = api.patch(`/orders/admin/${orderId}/status/`,{
        status
    })
    return res
}

