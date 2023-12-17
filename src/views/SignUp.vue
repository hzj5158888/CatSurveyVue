<template>
    <div id="loginPage" >
      <el-row :gutter="0">
        <el-col :span="10" :offset="7">
          <div class="loginFormContent" >
            <div style="text-align: center;">
              <h3>欢迎注册</h3>
            </div>
            <div>
              <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon label-position="top" label-width="100px" class="demo-ruleForm" @submit.native.prevent >
                <el-form-item label="用户名" prop="userName">
                  <el-input v-model="ruleForm.userName" autocomplete="on" ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                  <el-input v-model="ruleForm.pass" type="password" autocomplete="off" show-password ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" show-password ></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email" type="email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit" style="width: 100%;" @click="resetForm('ruleForm')" >重置</el-button>
                  </el-form-item>
                <el-form-item>
                  <el-button type="primary" native-type="submit" style="width: 100%;" @click="submitForm('ruleForm')" >提交</el-button>
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
  import {signup} from '@/api/ct-login'
  import request from '../utils/request.js'
  
  export default {
    name: 'SignUp',
    data () {
      var validateChkPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
      }
      return {
        ruleForm: {
          userName: '',
          pass: ''
        },
        rules: {
          userName: [
            {required: true, message: '请输入登录账号', trigger: 'blur'}
            // {type: 'userName', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          ],
          pass: [
            {required: true, message: '请输入登录密码', trigger: 'blur'},
            {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
          ],
          checkPass: [
            {required: true, message: '请输入确认密码', trigger: 'blur'},
            {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'},
            {validator: validateChkPass, trigger: 'blur'}
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
        this.$refs[formName].validate((valid) => 
        {
          if (valid) 
          {
            const uploadData = {
                'userName': this.ruleForm.userName,
                'password': this.ruleForm.pass,
                'email': this.ruleForm.email  
            };
            signup(uploadData).then((response) => {
              console.log('login-begin')
              console.log(response)
  
              if (response.status === 200) {
                this.$alert("注册成功，跳转至登录页", "提示").then(() =>
                {
                  this.$router.push('/login')
                })
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
      }
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
  