<template>
  <div id="app" >
    <router-view/>
  </div>
</template>

<script>

import CtHeader from '@/components/layouts/CtHeader.vue'
import CtHeaderLogin from '@/components/layouts/CtHeaderLogin.vue'
import CtNavMenu from '@/components/layouts/CtNavMenu.vue'
import CtFooter from '@/components/layouts/CtFooter.vue'

export default {
  name: 'App',
  components: {
    'ct-nav-menu': CtNavMenu,
    'ct-header': CtHeader,
    'ct-header-login': CtHeaderLogin,
    'ct-footer': CtFooter
  },
  data () {
    return {
      currentHeader: 'ct-header'
    }
  },
  mounted () {
    this.loginStatus()
  },
  methods: {
    loginStatus: function () {
      const fullPath = this.$route.fullPath
      if (fullPath.indexOf('login') >= 0) {
        this.currentHeader = 'ct-header-login'
      } else {
        this.currentHeader = 'ct-header'
      }
    }
  }
}
</script>
<style>
body{
  background-color: #F1F1F1;
  /*#ffb25c*/
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-header{
  background-color: #25292E;
}
.el-footer {
  /*background-color: #B3C0D1;*/
  line-height: 60px;
  color: #7c7c7c;
}
.el-aside {
}
</style>
