<template>
  <Row type="flex" :gutter="20" class="home-quick-nav">
    <Col v-for="(nav, key) in navList" :key="key" :span="4">
      <router-link :to="nav.to">
        <Card>
          <p>
            <Icon :type="nav.type" :color="nav.color" :size="32"/>
          </p>
          <p><span>{{nav.name}}</span></p>
        </Card>
      </router-link>
    </Col>
  </Row>
</template>

<script>
  export default {
    data() {
      return {
        navList: [{
          name: 'Event',
          type: 'ios-folder',
          color: 'rgb(105, 192, 255)',
          to: 'demo_list'
        }, {
          name: 'Order',
          type: 'ios-list-box',
          color: 'rgb(179, 127, 235)',
          to: 'demo_list'
        }, {
          name: 'Check',
          type: 'ios-bookmarks',
          color: 'rgb(255, 214, 102)',
          to: 'demo_list'
        }, {
          name: 'Goods',
          type: 'ios-cart',
          color: 'rgb(255, 156, 110)',
          to: 'demo_list'
        }, {
          name: 'Image',
          type: 'ios-images',
          color: 'rgb(255, 133, 192)',
          to: 'demo_list'
        }, {
          name: 'Report',
          type: 'ios-create',
          color: 'rgb(149, 222, 100)',
          to: 'demo_list'
        }]
      };
    }
  };
</script>

<style>
  .home-quick-nav p {
    height: 32px;
    line-height: 32px;
    text-align: center;
    color: #515a6e;
  }
</style>
