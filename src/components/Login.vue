<template>
    <div id='login'>
        <center>登录</center>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="username">
                <el-input type="text" maxlength="400" v-model="ruleForm.username" autocomplete="off" placeholder="用户名"></el-input>
              </el-form-item>
            <el-form-item prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()">登录</el-button>
            </el-form-item>
          </el-form>
          <div class="tip">
            <router-link to="/register">
              没有账号，去注册
            </router-link>
          </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Login',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback()
        }
      };
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username:'',
          pass: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm() {
        axios.post('/login',{user:this.ruleForm})
        .then((data)=>{
          if(data.data.status==0){
            //提示登录成功
            this.openSuccess()
            //登录成功设置cookie
            this.$cookie.set('cookie',JSON.stringify(data.data.session),{ expires: '1h' })
            //将用户信息保存在浏览器本地
            localStorage.setItem('user',JSON.stringify(data.data.session))
  
            this.$bus.$emit('info',{id:JSON.parse(localStorage.getItem('user')).id})
            this.$router.push('/')
          }else{
            this.openError()
          }
        })
      },
      openError() {
        this.$message.error('账号或密码错误');
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      openSuccess() {
        this.$message({
          message: '登录成功',
          type: 'success',
          offset:80
        });
      },
    },
}
</script>

<style scoped>
#login{
    max-width: 380px;
    margin: 0px auto;
    background-color:rgb(255, 255, 255,0.4);
    height: 380px;
    margin-top: 120px;
    border-radius: 10px;
}
center{
  font-size: 25px;
  padding: 35px 0px;
}
::v-deep .el-form-item__label{
    margin: 0px !important;
}
::v-deep .el-form-item__content{
    /* margin-right: 100px; */
    margin:0px 50px !important;
}
::v-deep .el-button{
  width: 100%;
  background-color: green !important;
  margin-top: 25px;
}
.tip{
  margin-left: 50px;
  margin-top: -10px;
  text-decoration:underline;
  cursor: pointer;
  color: skyblue;
}
</style>