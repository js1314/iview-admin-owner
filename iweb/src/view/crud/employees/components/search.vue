<template>
  <div>
    <Form :model="row" :label-width="110">
      <Row type='flex'><Col span='6'><FormItem label='emp_no' prop='emp_no'>
    <Input v-model.trim='row.emp_no' />
</FormItem></Col>
<Col span='6'><FormItem label='birth_date' prop='birth_date'>
    <Input v-model.trim='row.birth_date' />
</FormItem></Col>
<Col span='6'><FormItem label='first_name' prop='first_name'>
    <Input v-model.trim='row.first_name' />
</FormItem></Col>
<Col span='6'><FormItem label='last_name' prop='last_name'>
    <Input v-model.trim='row.last_name' />
</FormItem></Col></Row>
<Row type='flex'><Col span='6'><FormItem label='gender' prop='gender'>
    <Input v-model.trim='row.gender' />
</FormItem></Col>
<Col span='6'><FormItem label='hire_date' prop='hire_date'>
    <Input v-model.trim='row.hire_date' />
</FormItem></Col></Row>
    </Form>
    <Row type="flex" justify="end">
      <Button @click="admin.handleReset()">重置</Button>
      <Button type="primary" @click="admin.handleSearch()">查询</Button>
    </Row>
  </div>
</template>

<script>
  export default {
    props: {
      admin: Object,
      row: Object
    }
  };
</script>
