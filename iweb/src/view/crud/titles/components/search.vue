<template>
  <div>
    <Form :model="row" :label-width="110">
      <Row type='flex'><Col span='6'><FormItem label='emp_no' prop='emp_no'>
    <Input v-model.trim='row.emp_no' />
</FormItem></Col>
<Col span='6'><FormItem label='title' prop='title'>
    <Input v-model.trim='row.title' />
</FormItem></Col>
<Col span='6'><FormItem label='from_date' prop='from_date'>
    <Input v-model.trim='row.from_date' />
</FormItem></Col>
<Col span='6'><FormItem label='to_date' prop='to_date'>
    <Input v-model.trim='row.to_date' />
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
