<template>
    <div class="login-content">
        用户名:<input type="text" v-model="user"><br>
        密码:<input type="password" v-model="pass"><br>
        <input type="button" value="登录" @click="login">
        <input type="button" value="注册" @click="reject">
    </div>
</template>
<script>
import Store from "./store.js";
export default {
  data() {
    return {
      user: "",
      pass: ""
    };
  },
  methods: {
    login() {
      if (!this.user || !this.pass) {
        alert("用户名或密码不能为空!");
        return;
      }
      axios
        .get("/user", {
          params: {
            act: "login",
            user: this.user,
            pass: this.pass
          }
        })
        .then(res => {
          if (res.status === 200) {
            alert(res.data.msg);
          } else {
            alert("登录失败!");
          }
        });
    },
    reject() {
      if (!this.user || !this.pass) {
        alert("用户名或密码不能为空!");
        return;
      }
      axios
        .get("/user", {
          params: {
            act: "reg",
            user: this.user,
            pass: this.pass
          }
        })
        .then(res => {
          if (res.status === 200) {
            alert(res.data.msg);
          } else {
            alert("登录失败!");
          }
        });
    }
  }
};
</script>
<style>
</style>
