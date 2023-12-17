<template>
  <!--    <img src="./assets/logo.png">-->
  <!--    <router-view/>-->
  <div id="ct-layout" >
    <el-container style="padding: 0px;">
      <el-container style="z-index: 1;">
        <el-container>
          <el-main style="padding:0px;" >
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import CtHeader from '@/components/layouts/CtHeader.vue'
import CtHeaderLogin from '@/components/layouts/CtHeaderLogin.vue'
import CtNavMenu from '@/components/layouts/CtNavMenu.vue'
import CtFooter from '@/components/layouts/CtFooter.vue'

export default {
  name: 'NoTopLayout',
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

  },
  methods: {

  }
}
</script>
<style>
body{
  background-color: #F1F1F1;
  /*#ffb25c*/
}
</style>
