<template>
  <div>
    <div>
      <el-row style="background-color: #34495e;opacity:0.85;" >
        <el-col :span="20" :offset="2">
          <div class="ct-header-main" >
            <el-row type="flex" justify="space-between" align="middle">
              <el-col :span="16">
                <div style="padding-left: 60px;"><ct-nav-menu></ct-nav-menu></div>
              </el-col>
              <el-col :span="4" style="text-align: right;" >
                <div>
                  <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link" >
                      {{ userName }} <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="myAccount">我的账号</el-dropdown-item>
                      <el-dropdown-item command="updatePwd">修改密码</el-dropdown-item>
                      <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import CtNavMenu from '@/components/layouts/CtNavMenu.vue'
import CtAuthorized from '@/utils/ct-authorized'
import {logout} from '@/api/ct-login'

export default {
  name: 'CtHeader',
  components: {
    'ct-nav-menu': CtNavMenu
  },
  data () {
    return {
      userName: 'ctsurvey'
    }
  },
  mounted () {
    this.userName = CtAuthorized.getUserName()
  },
  methods: {
    handleCommand: function (command) {
      if (command === 'logout') 
      {
        logout().then((res) => {
          if (res.status === 200)
          {
            localStorage.clear();
            this.$alert("注销成功", "提示").then(() => {
              this.$router.push('/login')
            })
            return;
          }
        })
      } else if (command === 'myAccount') {
        this.$router.push('/ct/user')
      } else if (command === 'updatePwd') {
        this.$router.push('/ct/user/pwd')
      }
    }
  }
}
</script>

<style scoped>
.ct-header-main{
  padding: 0px;
}
.el-dropdown-link{
  color: white;
}
.m-logbg {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
