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
  import {employees_insert, employees_delete, employees_update, employees_detail, employees_list} from '@/api/crud/employees';

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
{key:'birth_date',title:'birth_date'},
{key:'first_name',title:'first_name'},
{key:'last_name',title:'last_name'},
{key:'gender',title:'gender'},
{key:'hire_date',title:'hire_date'}
        ]
      };
    },
    methods: {
      handleInsert(row) {
        return new Promise((resolve, reject) => {
          employees_insert(row).then(res => {
            resolve(res.data);
          });
        });
      },
      handleDelete(row) {
        return new Promise((resolve, reject) => {
          employees_delete(row).then(res => {
            resolve(res.data);
          });
        });
      },
      handleUpdate(row) {
        return new Promise((resolve, reject) => {
          employees_update(row).then(res => {
            resolve(res.data);
          });
        });
      },
      handleDetail(conditions) {
        return new Promise((resolve, reject) => {
          employees_detail(conditions).then(res => {
            resolve(res.data);
          });
        });
      },
      handleSelect() {
        return new Promise((resolve, reject) => {
          employees_list().then(res => {
            resolve(res.data);
          });
        });
      },
      handleSearch(conditions) {
        return new Promise((resolve, reject) => {
          employees_list(conditions).then(res => {
            resolve(res.data);
          });
        });
      },
    }
  };
</script>
