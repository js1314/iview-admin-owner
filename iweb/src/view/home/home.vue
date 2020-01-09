<template>
  <div>
    <Row type="flex" :gutter="20">
      <Col
        :span="8" v-for="(count, i) in countData" :key="`infor-${i}`"
        style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="count.color" :icon="count.icon" :icon-size="36">
          <router-link :to="count.to">
            <count-to :end="count.count" count-class="count-style"/>
          </router-link>
          <p>{{ count.title }}</p>
        </infor-card>
      </Col>
    </Row>
    <QuickNav/>
  </div>
</template>

<script>
  import InforCard from '_c/info-card';
  import CountTo from '_c/count-to';
  import QuickNav from './components/quick-nav';

  export default {
    name: 'home',
    components: {
      InforCard,
      CountTo,
      QuickNav
    },
    data() {
      return {
        countData: {}
      };
    },
    mounted() {
    }
  };
</script>

<style lang="less">
  .count-style {
    font-size: 50px;
  }
</style>
