<template>
    <div>
      <el-row>
        <el-col :span="20" :offset="2">
          <div class="ct-user-body">
            <el-row>
              <el-col :span="4" style="height: 600px;">
                <ct-user-menu></ct-user-menu>
              </el-col>
              <el-col :span="20">
                <el-form ref="userInfo" :model="userInfo" style="width: 60% !important; padding: 30px;">
                  <el-form-item label="账号" prop="userName">
                    <el-input v-model="userInfo.userName" autocomplete="off" style="width: auto;" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userInfo.email" autocomplete="off" style="width: auto;"></el-input>
                  </el-form-item>
                  <el-form-item label="微信" prop="wechat">
                    <el-input v-model="userInfo.wechat" autocomplete="off" style="width: auto;"></el-input>
                  </el-form-item>
                  <el-form-item label="电话" prop="phone">
                    <el-input v-model="userInfo.phone" autocomplete="off" style="width: auto;"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </template>
  <script>
  import CtUserMenu from './CtUserMenu'
  import {ctUserInfo, ctUserModify} from '../../api/ct-user'
  
  export default {
    name: 'CtUserEdit',
    components: {
      CtUserMenu
    },
    data () {
      return {
        userInfo: {
            userName: '',
            email: '',
            wechat: '',
            phone: ''
        }
      }
    },
    mounted () {
      this.getUserInfo()
    },
    methods: {
      getUserInfo () {
        ctUserInfo().then((response) => 
        {
            if (response.status === 200) 
            {
                this.userInfo.userName = response.data.userName;
                this.userInfo.email = response.data.email;
                this.userInfo.wechat = response.data.wechat;
                this.userInfo.phone = response.data.phone;
            }
        })
      },
      onSubmit() {
        let userInfo = this.userInfo;
        ctUserModify(userInfo).then((res) => 
        {
            if (res.status === 200)
            {
                this.$message.success("已保存")
                getUserInfo(); 
            } 
        })
      }
    }
  }
  </script>
  
  <style scoped>
  .ct-user-body{
    background-color: white;
    min-height: 600px;
  }
  </style>
  