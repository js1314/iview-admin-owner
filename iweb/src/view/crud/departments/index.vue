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
  import {departments_insert, departments_delete, departments_update, departments_detail, departments_list} from '@/api/crud/departments';

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
           {key:'dept_no',title:'dept_no'},
{key:'dept_name',title:'dept_name'}
        ]
      };
    },
    methods: {
      handleInsert(row) {
        return new Promise((resolve, reject) => {
          departments_insert(row).then(res => {
            resolve(res.data);
          });
        });
      },
      handleDelete(row) {
        return new Promise((resolve, reject) => {
          departments_delete(row).then(res => {
            resolve(res.data);
          });
        });
      },
      handleUpdate(row) {
        return new Promise((resolve, reject) => {
          departments_update(row).then(res => {
            resolve(res.data);
          });
        });
      },
      handleDetail(conditions) {
        return new Promise((resolve, reject) => {
          departments_detail(conditions).then(res => {
            resolve(res.data);
          });
        });
      },
      handleSelect() {
        return new Promise((resolve, reject) => {
          departments_list().then(res => {
            resolve(res.data);
          });
        });
      },
      handleSearch(conditions) {
        return new Promise((resolve, reject) => {
          departments_list(conditions).then(res => {
            resolve(res.data);
          });
        });
      },
    }
  };
</script>
