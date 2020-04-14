<template>
  <div>
    <Form :model="row" :label-width="110">
        <FormItem label='birth_date' prop='birth_date'>
    <Input v-model.trim='row.birth_date' />
</FormItem>
<FormItem label='first_name' prop='first_name'>
    <Input v-model.trim='row.first_name' />
</FormItem>
<FormItem label='last_name' prop='last_name'>
    <Input v-model.trim='row.last_name' />
</FormItem>
<FormItem label='gender' prop='gender'>
    <Input v-model.trim='row.gender' />
</FormItem>
<FormItem label='hire_date' prop='hire_date'>
    <Input v-model.trim='row.hire_date' />
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