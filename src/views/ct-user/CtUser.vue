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
              <div style="padding: 30px;">
                <el-descriptions title="账号信息" column="1" border >
                  <el-descriptions-item label="账号">{{ userInfo.userName }}</el-descriptions-item>
                  <el-descriptions-item label="权限">{{ userInfo.role.length > 1 ? '管理员' : '普通用户' }}</el-descriptions-item>
                  <el-descriptions-item label="邮箱">{{ userInfo.email !== null ? userInfo.email : '空' }}</el-descriptions-item>
                  <el-descriptions-item label="微信">{{ userInfo.wechat !== null ? userInfo.wechat : '空' }}</el-descriptions-item>
                  <el-descriptions-item label="电话">{{ userInfo.phone !== null ? userInfo.phone : '空' }}</el-descriptions-item>
                </el-descriptions>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import CtUserMenu from './CtUserMenu'
import {ctUserInfo} from '../../api/ct-user'

export default {
  name: 'CtUser',
  components: {
    CtUserMenu
  },
  data () {
    return {
      userInfo: {}
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      ctUserInfo().then((response) => {
        this.userInfo = response.data;
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
