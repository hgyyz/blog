<template>
    <div id='login'>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
              </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
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
      submitForm(formName) {
        axios.post('/login',{user:this.ruleForm})
        .then((data)=>{
          if(data.data.status==0){
            alert('登录成功')
            this.$router.push('/')
            this.ruleForm.username = ''
            this.ruleForm.pass = ''
          }else{
            alert('账号或密码错误')
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }

}
</script>

<style scoped>
#login{
    max-width: 500px;
    margin: 0px auto;
}
::v-deep .el-form-item__label{
    margin: 0px !important;
}
::v-deep .el-form-item__content{
    margin-right: 50px;
}
</style>