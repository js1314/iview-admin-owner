<template>
  <div>
    <Form :model="row" :label-width="110">
      <FormItem label='emp_no' prop='emp_no'>
    <Input v-model.trim='row.emp_no' readonly/>
</FormItem>
<FormItem label='dept_no' prop='dept_no'>
    <Input v-model.trim='row.dept_no' readonly/>
</FormItem>
<FormItem label='from_date' prop='from_date'>
    <Input v-model.trim='row.from_date' readonly/>
</FormItem>
<FormItem label='to_date' prop='to_date'>
    <Input v-model.trim='row.to_date' readonly/>
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