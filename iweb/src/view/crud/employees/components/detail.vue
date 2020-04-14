<template>
  <div>
    <Form :model="row" :label-width="110">
      <FormItem label='emp_no' prop='emp_no'>
    <Input v-model.trim='row.emp_no' readonly/>
</FormItem>
<FormItem label='birth_date' prop='birth_date'>
    <Input v-model.trim='row.birth_date' readonly/>
</FormItem>
<FormItem label='first_name' prop='first_name'>
    <Input v-model.trim='row.first_name' readonly/>
</FormItem>
<FormItem label='last_name' prop='last_name'>
    <Input v-model.trim='row.last_name' readonly/>
</FormItem>
<FormItem label='gender' prop='gender'>
    <Input v-model.trim='row.gender' readonly/>
</FormItem>
<FormItem label='hire_date' prop='hire_date'>
    <Input v-model.trim='row.hire_date' readonly/>
</FormItem>
    </Form>
    <div class="ivu-modal-footer">
      <Button @click="admin.hideEditor()">取消</Button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      row: Object,
      admin: Object
    }
  };
</script>