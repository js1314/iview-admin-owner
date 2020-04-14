import axios from '@/libs/api.request'
export const dept_emp = (data={},method='get',config={}) =>axios.request({url:'crud/dept_emp',method,...config,[method==='get'?'params':'data']:data});
export const dept_emp_insert = (data={},config={}) => axios.request({url:'crud/dept_emp/insert',method:'post',data,...config});
export const dept_emp_delete = (data={},config={}) => axios.request({url:'crud/dept_emp/delete',method:'delete',data,...config});
export const dept_emp_update = (data={},config={}) => axios.request({url:'crud/dept_emp/update',method:'put',data,...config});
export const dept_emp_detail = (params={},config={}) => axios.request({url:'crud/dept_emp/detail',method:'get',params,...config});
export const dept_emp_list = (params={},config={}) => axios.request({url:'crud/dept_emp/list',method:'get',params,...config});