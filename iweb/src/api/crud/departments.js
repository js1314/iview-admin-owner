import axios from '@/libs/api.request'
export const departments = (data={},method='get',config={}) =>axios.request({url:'crud/departments',method,...config,[method==='get'?'params':'data']:data});
export const departments_insert = (data={},config={}) => axios.request({url:'crud/departments/insert',method:'post',data,...config});
export const departments_delete = (data={},config={}) => axios.request({url:'crud/departments/delete',method:'delete',data,...config});
export const departments_update = (data={},config={}) => axios.request({url:'crud/departments/update',method:'put',data,...config});
export const departments_detail = (params={},config={}) => axios.request({url:'crud/departments/detail',method:'get',params,...config});
export const departments_list = (params={},config={}) => axios.request({url:'crud/departments/list',method:'get',params,...config});