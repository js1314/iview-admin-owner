<template>
  <div>
    <Form :model="row" :label-width="110">
      <Row type='flex'><Col span='6'><FormItem label='dept_no' prop='dept_no'>
    <Input v-model.trim='row.dept_no' />
</FormItem></Col>
<Col span='6'><FormItem label='dept_name' prop='dept_name'>
    <Input v-model.trim='row.dept_name' />
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
