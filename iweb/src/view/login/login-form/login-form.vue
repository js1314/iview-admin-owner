<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="username">
      <Input v-model="form.username" placeholder="请输入手机号" maxlength="11" :disabled="loading">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码" :disabled="loading">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long :loading="loading">{{loadingText}}</Button>
    </FormItem>
  </Form>
</template>

<script>
  export default {
    name: 'LoginForm',
    props: {
      usernameRules: {
        type: Array,
        default: () => {
          return [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ];
        }
      },
      passwordRules: {
        type: Array,
        default: () => {
          return [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ];
        }
      }
    },
    data() {
      return {
        loading: false,
        form: {
          username: '',
          password: ''
        }
      };
    },
    computed: {
      rules() {
        return {
          username: this.usernameRules,
          password: this.passwordRules
        };
      },
      loadingText() {
        return this.loading ? '登录中...' : '登录';
      }
    },
    methods: {
      handleSubmit() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$emit('on-success-valid', {
              username: this.form.username,
              password: this.form.password,
              callback: () => {
                this.loading = false;
              }
            });
          }
        });
      }
    }
  };
</script>
