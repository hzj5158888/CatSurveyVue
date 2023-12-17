<template>
  <el-menu
    :default-active="defActive"
    mode="horizontal"
    background-color="#34495e"
    text-color="#fff"
    active-text-color="#409eff"
    class="ct-menu-height ct-menu"
    router
    @select="handleSelect">
    <el-menu-item index="/ct/survey" >我的问卷</el-menu-item>
    <el-menu-item index="/ct/user" >个人中心</el-menu-item>
    <el-menu-item v-has-ct-role="'CTSURVEY_SUPER_ADMIN'" index="/ct/admin/user" >用户管理</el-menu-item>
  </el-menu>
</template>
<script>

export default {
  name: 'CtNavMenu',
  data () {
    return {
      defActive: '/ct/survey'
    }
  },
  watch: {
    $route: function (to, from) {
      this.setDefActive()
    }
  },
  mounted () {
    this.setDefActive()
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    setDefActive () {
      const fullPath = this.$route.fullPath
      if (fullPath.indexOf('/ct/survey') >= 0) {
        this.defActive = '/ct/survey'
      } else if (fullPath.indexOf('/ct/admin/user') >= 0) {
        this.defActive = '/ct/admin/user'
      } else if (fullPath.indexOf('/ct/user') >= 0) {
        this.defActive = '/ct/user'
      }
    }
  }
}
</script>

<style scoped>
.ct-menu-height,.ct-menu-height>.el-menu-item,.ct-menu-height>.el-submenu /deep/ .el-submenu__title{
  height: 80px;
  line-height: 80px;
  font-weight: 400;
  font-size: 16px;
}
.ct-menu{
  border-bottom: none;
}
</style>
