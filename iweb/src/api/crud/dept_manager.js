import axios from '@/libs/api.request'
export const dept_manager = (data={},method='get',config={}) =>axios.request({url:'crud/dept_manager',method,...config,[method==='get'?'params':'data']:data});
export const dept_manager_insert = (data={},config={}) => axios.request({url:'crud/dept_manager/insert',method:'post',data,...config});
export const dept_manager_delete = (data={},config={}) => axios.request({url:'crud/dept_manager/delete',method:'delete',data,...config});
export const dept_manager_update = (data={},config={}) => axios.request({url:'crud/dept_manager/update',method:'put',data,...config});
export const dept_manager_detail = (params={},config={}) => axios.request({url:'crud/dept_manager/detail',method:'get',params,...config});
export const dept_manager_list = (params={},config={}) => axios.request({url:'crud/dept_manager/list',method:'get',params,...config});