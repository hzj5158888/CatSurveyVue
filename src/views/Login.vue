<template>
  <div id="loginPage" >
    <el-row :gutter="0">
      <el-col :span="10" :offset="7">
        <div class="loginFormContent" >
          <div style="text-align: center;">
            <h3>欢迎登录</h3>
          </div>
          <div>
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon label-position="top" label-width="100px" class="demo-ruleForm" @submit.native.prevent >
              <el-form-item label="用户名" prop="email">
                <el-input v-model="ruleForm.email" autocomplete="on" ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" show-password ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" native-type="submit" style="width: 100%;" @click="submitForm('ruleForm')" >登录</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" native-type="submit" style="width: 100%;" @click="signup()" >注册</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>

import CtAuthorized from '../utils/ct-authorized'
import {msgError} from '../utils/ct-msg'
import {ctLogin} from '@/api/ct-login'
import request from '../utils/request.js'

export default {
  name: 'Login',
  data () {
    return {
      ruleForm: {
        email: '',
        pass: ''
      },
      rules: {
        email: [
          {required: true, message: '请输入登录账号', trigger: 'blur'}
          // {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        pass: [
          {required: true, message: '请输入登录密码', trigger: 'blur'},
          {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.pageH = window.height
  },
  methods: {
    submitForm (formName) {
      // 进行登录验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          ctLogin(this.ruleForm.email, this.ruleForm.pass).then((response) => {
            console.log('login-begin')
            console.log(response)

            if (response.status === 200) {
              let resultData = response.data

              localStorage.clear();
              CtAuthorized.setAuthority(resultData.currentAuthority)
              CtAuthorized.setToken(resultData.accessToken)
              CtAuthorized.setUserInfo(resultData);
              request.defaults.headers = {
                'accessToken': CtAuthorized.getToken(),
                'Content-Type': 'application/json;charset=UTF-8'
              };
              this.$router.push('/ct/survey/')
            } else {
              if (response.message != null || response.message != undefined) {
                msgError(response.message)
              } else {
                msgError('登录失败，请确认！')
              }
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    signup() {
      this.$router.push('/signup')
    },
  }
}
</script>

<style scoped>
#loginPage{
  /*background-image: url("http://localhost:8181/diaowen/images/style-model/login_bg/1.jpg");*/
}
.loginFormContent{
  padding: 20px;
  margin-top: 50px;
  background-color: white;
  border: 1px solid gainsboro;
  border-radius: 3px;
}
</style>
