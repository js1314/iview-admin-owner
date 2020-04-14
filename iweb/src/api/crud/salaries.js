import axios from '@/libs/api.request'
export const salaries = (data={},method='get',config={}) =>axios.request({url:'crud/salaries',method,...config,[method==='get'?'params':'data']:data});
export const salaries_insert = (data={},config={}) => axios.request({url:'crud/salaries/insert',method:'post',data,...config});
export const salaries_delete = (data={},config={}) => axios.request({url:'crud/salaries/delete',method:'delete',data,...config});
export const salaries_update = (data={},config={}) => axios.request({url:'crud/salaries/update',method:'put',data,...config});
export const salaries_detail = (params={},config={}) => axios.request({url:'crud/salaries/detail',method:'get',params,...config});
export const salaries_list = (params={},config={}) => axios.request({url:'crud/salaries/list',method:'get',params,...config});