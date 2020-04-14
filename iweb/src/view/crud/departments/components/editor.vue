<template>
  <div>
    <Form :model="row" :label-width="110">
        <FormItem label='dept_name' prop='dept_name'>
    <Input v-model.trim='row.dept_name' />
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