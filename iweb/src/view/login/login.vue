<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip"></p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import LoginForm from './login-form';
  import {mapActions} from 'vuex';

  export default {
    components: {
      LoginForm
    },
    methods: {
      ...mapActions([
        'handleLogin',
      ]),
      handleSubmit({username, password, callback}) {
        this.handleLogin({username, password}).then(res => {
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
