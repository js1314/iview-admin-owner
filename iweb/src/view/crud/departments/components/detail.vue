<template>
  <div>
    <Form :model="row" :label-width="110">
      <FormItem label='dept_no' prop='dept_no'>
    <Input v-model.trim='row.dept_no' readonly/>
</FormItem>
<FormItem label='dept_name' prop='dept_name'>
    <Input v-model.trim='row.dept_name' readonly/>
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