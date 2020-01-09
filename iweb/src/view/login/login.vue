<template>
  <div class="login">
    <Card class="login-con" icon="log-in" title="欢迎登录" :bordered="false">
      <div class="form-con">
        <login-form @on-success="handleSubmit"></login-form>
        <p class="login-tip"></p>
      </div>
    </Card>
  </div>
</template>

<script>
  import './login.less';
  import LoginForm from '_v/login-form';

  export default {
    components: {
      LoginForm
    },
    methods: {
      handleSubmit({username, password, callback}) {
        this.$store.dispatch('handleLogin', {username, password}).then(res => {
          this.$router.push(this.$config.homeName);
          callback();
        }).catch(error => {
          callback();
          this.$Modal.error({
            title: '登录失败',
            content: error.response.data.msg
          });
        });
      }
    }
  };
</script>

<style>

</style>
