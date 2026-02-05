import api from '../api'

export const getAdminOrders = (params={}) => {
    const res = api.get('/orders/admin/orders-list/',{
        params,
    })
    return res
}


