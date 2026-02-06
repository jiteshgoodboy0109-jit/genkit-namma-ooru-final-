import api from '../api'

export const getCustomers = (params={}) => {
    const res = api.get('/orders/admin/customers/',{
        params,
    })
    return res
}
