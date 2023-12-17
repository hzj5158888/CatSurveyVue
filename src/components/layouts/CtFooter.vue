<template>
  <div class="ct-footer-main" >
  </div>
</template>
<script>

import API from '@/api/index.js'

export default {
  name: 'CtFooter',
  data () {
    return {}
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>
.ct-footer-main{
  text-align: center;
  font-size: 12px;
  color: grey;
  line-height: 30px;
  padding-top: 0px;
  padding-bottom: 20px;
}
.ct-footer-main a{
  text-decoration: none;
  color: grey;
}
</style>
