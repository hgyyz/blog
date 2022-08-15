<template>
  <div class="login">
    <div class="content">
      <div class="title">管理系统</div>
      <div>
        <el-input
          style="width：100%"
          v-model="params.account"
          placeholder="请输入账号"
        ></el-input>
      </div>
      <div>
        <el-input
          style="width：100%"
          type="password"
          v-model="params.password"
          placeholder="请输入密码"
        ></el-input>
      </div>
      <div>
        <el-button style="width：300px" @click="submit" type="primary"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
const sha256 = require("js-sha256").sha256; //这里用的是require方法
export default {
  data() {
    return {
      params: {
        account: "",
        password: "",
      },
    };
  },
  methods: {
    async submit() {
      if (!this.params.account) {
        this.$message.warning("请输入账号");
        return;
      }
      if (!this.params.password) {
        this.$message.warning("请输入密码");
        return;
      }
      console.log(sha256(this.params.password));
      const url = "/v1/manage/login";
      const params = {
        account: this.params.account,
        password: sha256(this.params.password),
      };
      const data = await this.$axios.post(url, {
        ...params,
      });
      if (data.code === 1) {
        sessionStorage.setItem('userinfo',JSON.stringify(data.data))
        sessionStorage.setItem('token',data.data.token)
        this.$router.push("/home")
      }

      console.log(data);
    },
  },
};
</script>



<style scoped lang="less">
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg)
    center no-repeat;
  background-size: 100% 100%;
  background-color: #f0f2f5;
  .content {
    width: 500px;
    height: 400px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    div {
      width: 300px;
      margin-bottom: 20px;
      .el-button {
        width: 300px;
      }
    }
    .title {
      text-align: center;
      font-size: 22px;
      font-weight: 600;
    }
  }
}
</style>