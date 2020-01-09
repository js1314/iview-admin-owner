<template>
  <!--<div></div>-->
</template>

<script>
  import {setToken} from '@/libs/util';

  /**
   * 由于登出需要清空相关store，如果不跳转至路由页面做此操作的话
   * 某些运用到相关store的页面会报错导致登出失败
   * 跳转到登陆页面，防止重复添加路由导致的路由权限问题
   */
  export default {
    methods: {
      login() {
        window.location.href = process.env.BASE_URL + '#/login';
      }
    },
    mounted() {
      // LoadingBar.start();
      this.$store.dispatch('handleLogOut').then(oldState => {
        // LoadingBar.finish();
        this.login();
      }).catch(message => {
        // LoadingBar.finish();
        this.login();
      });
    }
  };
</script>
