<template>
  <AdminTable
    :columns="columns"
    :insert="insert"
    :remove="remove"
    :update="update"
    :detail="detail"
    :search="search"
    :page="page"/>
</template>

<script>
  import {dept_manager_insert, dept_manager_delete, dept_manager_update, dept_manager_detail, dept_manager_list} from '@/api/crud/dept_manager';

  export default {
    data() {
      return {
        insert: {
          show: true,
          handle: this.handleInsert,
          component: () => import('./components/editor.vue')
        },
        remove: {
          show: true,
          handle: this.handleDelete
        },
        update: {
          show: true,
          handle: this.handleUpdate,
          component: () => import('./components/editor.vue')
        },
        detail: {
          show: true,
          handle: this.handleDetail,
          component: () => import('./components/detail.vue')
        },
        search: {
          show: true,
          handle: this.handleSearch,
          component: () => import('./components/search.vue')
        },
        page: {
          show: true
        },
        columns: [
           {key:'emp_no',title:'emp_no'},
{key:'dept_no',title:'dept_no'},
{key:'from_date',title:'from_date'},
{key:'to_date',title:'to_date'}
        ]
      };
    },
    methods: {
      handleInsert(row) {
        return new Promise((resolve, reject) => {
          dept_manager_insert(row).then(res => {
            resolve(res.data);
          });
        });
      },
      handleDelete(row) {
        return new Promise((resolve, reject) => {
          dept_manager_delete(row).then(res => {
            resolve(res.data);
          });
        });
      },
      handleUpdate(row) {
        return new Promise((resolve, reject) => {
          dept_manager_update(row).then(res => {
            resolve(res.data);
          });
        });
      },
      handleDetail(conditions) {
        return new Promise((resolve, reject) => {
          dept_manager_detail(conditions).then(res => {
            resolve(res.data);
          });
        });
      },
      handleSelect() {
        return new Promise((resolve, reject) => {
          dept_manager_list().then(res => {
            resolve(res.data);
          });
        });
      },
      handleSearch(conditions) {
        return new Promise((resolve, reject) => {
          dept_manager_list(conditions).then(res => {
            resolve(res.data);
          });
        });
      },
    }
  };
</script>
