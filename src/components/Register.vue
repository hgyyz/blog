<template>
    <div id='register'>
        <center>注册</center>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="username">
                <el-input type="text" placeholder="用户名" v-model="ruleForm.username" autocomplete="off"></el-input>
              </el-form-item>
            <el-form-item prop="pass">
              <el-input placeholder="密码" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input placeholder="确认密码" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input placeholder="邮箱" v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
                <el-input placeholder="手机号" v-model.number="ruleForm.phone"></el-input>
              </el-form-item>
              <!-- <el-form-item label="验证码" prop="captcha">
                <el-input v-model.number="ruleForm.captcha"></el-input>
                <el-button type="info" plain class="captcha-btn" @click="sendDx">获取验证码</el-button>
              </el-form-item> -->
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" class="b-btn">注册</el-button>
              <el-button @click="resetForm('ruleForm')" class="b-btn">返回</el-button>
            </el-form-item>
          </el-form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Register',
    data() {
        var patt = /^[a-zA-Z0-9_-]{4,16}$/;
        var validateUser = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入用户名'));
        } else if(!patt.test(value)){
          return callback(new Error('用户名由4到16位（字母，数字，下划线，减号）组成'));
        }else{
          callback();
        }
      };
      var mPattern = /^1[3456789]\d{9}$/; 
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入手机号'));
        } else if(!mPattern.test(value)){
          return callback(new Error('手机号格式错误'));
        }else{
          callback();
        }
      };
      var validateCaptcha = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入验证码'));
        } else {
          callback();
        }
      };
      var ePattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
      var checkemail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入邮箱'));
        }else if(!ePattern.test(value)){
          return callback(new Error('邮箱格式错误'));
        }else{
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          email: '',
          username:'',
          phone:'',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          email: [
            { validator: checkemail, trigger: 'blur' }
          ],
          username: [
            { validator: validateUser, trigger: 'blur' }
          ],
          phone: [
            { validator: validatePhone, trigger: 'blur' }
          ],
          // captcha: [
          //   { validator: validateCaptcha, trigger: 'blur' }
          // ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('/register',{users:this.ruleForm})
              .then((data)=>{
                if(data.data.status==0){
                  this.ruleForm={
                    pass: '',
                    checkPass: '',
                    email: '',
                    username:'',
                    phone:'',
                    captcha:''
                  }
                  this.openSuccess()
                  this.$router.push('/login')
                }else{
                  this.openError(data.data.message)
                }
              })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$router.push('/login')
      },
      openError(e) {
        this.$message.error(e);
      },
      openSuccess() {
        this.$message({
          message: '注册成功',
          type: 'success'
        });
      }
    },
}
</script>

<style scoped>
#register{
    max-width: 380px;
    margin: 0px auto;
    margin-top: 120px;
    background-color:rgb(255, 255, 255,0.4);
    padding-bottom: 20px;
    border-radius: 10px;
}
center{
  font-size: 25px;
  padding: 10px 0px;
}
::v-deep .el-form-item__label{
    margin: 0px !important;
}
::v-deep .el-form-item__content{
    margin:0px 50px !important;
}
::v-deep .captcha-btn{
    position: absolute;
    right: 0px;
    border:none;
    height: 40px;
}
::v-deep .el-button:nth-child(1){
  background-color: green !important;
}
::v-deep .b-btn{
    width: 49%;
}
::v-deep .el-form-item__content{
    display: flex;
    justify-content: center;
}
</style>