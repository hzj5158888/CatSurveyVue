<template>
  <el-menu
    :default-active="defActive"
    class="el-menu-vertical-demo"
    style="height: 600px;"
    router
  >
    <el-menu-item index="/ct/user" >
      <i class="el-icon-user"></i>
      <span slot="title">我的账号</span>
    </el-menu-item>
    <el-menu-item index="/ct/user/edit" >
      <i class="el-icon-setting"></i>
      <span slot="title">编辑资料</span>
    </el-menu-item>
    <el-menu-item index="/ct/user/pwd">
      <i class="el-icon-key"></i>
      <span slot="title">修改密码</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'CtUserMenu',
  data () {
    return {
      defActive: '/ct/user'
    }
  },
  mounted () {
    this.setDefActive()
  },
  methods: {
    setDefActive () {
      const fullPath = this.$route.fullPath
      if (fullPath.indexOf('/ct/user/pwd') >= 0)
        this.defActive = '/ct/user/pwd'
      else if (fullPath.indexOf('/ct/user/edit') >= 0) 
        this.defActive = '/ct/user/edit'
    }
  }
}
</script>

<style scoped>

</style>
