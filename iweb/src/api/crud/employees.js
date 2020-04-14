import axios from '@/libs/api.request'
export const employees = (data={},method='get',config={}) =>axios.request({url:'crud/employees',method,...config,[method==='get'?'params':'data']:data});
export const employees_insert = (data={},config={}) => axios.request({url:'crud/employees/insert',method:'post',data,...config});
export const employees_delete = (data={},config={}) => axios.request({url:'crud/employees/delete',method:'delete',data,...config});
export const employees_update = (data={},config={}) => axios.request({url:'crud/employees/update',method:'put',data,...config});
export const employees_detail = (params={},config={}) => axios.request({url:'crud/employees/detail',method:'get',params,...config});
export const employees_list = (params={},config={}) => axios.request({url:'crud/employees/list',method:'get',params,...config});