<template>
  <div>
    <Form :model="row" :label-width="110">
        <FormItem label='dept_no' prop='dept_no'>
    <Input v-model.trim='row.dept_no' />
</FormItem>
<FormItem label='from_date' prop='from_date'>
    <Input v-model.trim='row.from_date' />
</FormItem>
<FormItem label='to_date' prop='to_date'>
    <Input v-model.trim='row.to_date' />
</FormItem>
    </Form>
    <div class="ivu-modal-footer">
      <Button @click="admin.hideEditor()">取消</Button>
      <Button type="primary" @click="admin.handleSave()">保存</Button>
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