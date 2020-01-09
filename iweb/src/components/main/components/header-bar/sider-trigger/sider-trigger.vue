<template>
  <span>
    <a @click="handleChange" type="text" :class="['sider-trigger-a', collapsed ? 'collapsed' : '']">
      <Icon :type="icon" :size="size"/>
    </a>
    <a @click="handleRefresh" type="text" class="sider-trigger-a">
      <Icon type="ios-refresh" :size="size"/>
    </a>
  </span>
</template>
<script>
  export default {
    name: 'siderTrigger',
    inject: ['reload'],
    props: {
      collapsed: Boolean,
      icon: {
        type: String,
        default: 'navicon-round'
      },
      size: {
        type: Number,
        default: 26
      }
    },
    methods: {
      handleChange() {
        this.$emit('on-change', !this.collapsed);
      },
      handleRefresh() {
        this.reload();
      }
    }
  };
</script>
<style lang="less">
  @import './sider-trigger.less';
</style>
