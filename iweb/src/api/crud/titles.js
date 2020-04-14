import axios from '@/libs/api.request'
export const titles = (data={},method='get',config={}) =>axios.request({url:'crud/titles',method,...config,[method==='get'?'params':'data']:data});
export const titles_insert = (data={},config={}) => axios.request({url:'crud/titles/insert',method:'post',data,...config});
export const titles_delete = (data={},config={}) => axios.request({url:'crud/titles/delete',method:'delete',data,...config});
export const titles_update = (data={},config={}) => axios.request({url:'crud/titles/update',method:'put',data,...config});
export const titles_detail = (params={},config={}) => axios.request({url:'crud/titles/detail',method:'get',params,...config});
export const titles_list = (params={},config={}) => axios.request({url:'crud/titles/list',method:'get',params,...config});