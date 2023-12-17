<template>
  <div id="ct-layout" style="height: 100vh;" class="ct-layout-body" >
    <el-container>
      <el-container style="padding: 0px;height: calc(100vh - 80px);">
        <el-container style="z-index: 1;">
          <el-container>
            <el-main style="padding: 20px 0px;" >
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>

import CtHeader from '@/components/layouts/CtHeader.vue'
import CtHeaderSignUp from '@/components/layouts/CtHeaderSignUp.vue'
import CtNavMenu from '@/components/layouts/CtNavMenu.vue'
import CtFooter from '@/components/layouts/CtFooter.vue'

export default {
  name: 'LoginLayout',
  components: {
    'ct-nav-menu': CtNavMenu,
    'ct-header': CtHeader,
    'ct-header-signup': CtHeaderSignUp,
    'ct-footer': CtFooter
  },
  data () {
    return {
      currentHeader: 'ct-header',
      pageH: '600px'
    }
  },
  mounted () {
    this.loginStatus()
    this.pageH = `${window.innerHeight}px`
  },
  methods: {
    loginStatus () {
      const fullPath = this.$route.fullPath
      if (fullPath.indexOf('signup') >= 0) {
        this.currentHeader = 'ct-header-signup'
      } else {
        this.currentHeader = 'ct-header'
      }
    }
  }
}
</script>
<style scoped>
body{
  background-color: #F1F1F1;
  /*#ffb25c*/
}
.ct-footer-container{
  bottom: 0px;
  width: 100%;
  text-align: center;
  background: #F1F1F1;
  padding-top: 20px;
}
.ct-layout-body{
  background-image: url("../../assets/images/style-model/login_bg/1.jpg");
  -moz-background-size: cover;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
