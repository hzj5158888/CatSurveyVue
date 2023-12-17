<template>
  <div>
    <div>
      <div class="ct-dcs-main-title">
        <h4>答卷地址</h4>
        <div class="ct-dcs-main-p">复制下面的问卷链接到QQ，Email等工具中直接发给被用户</div>
      </div>
      <div class="ct-dcs-main-content">
        <el-input id="copyCodeInput" v-model="survey.answerUrl" readonly style="width: 500px;" ></el-input>
        <el-button-group>
          <el-button type="primary" icon="el-icon-copy-document" @click="copyActiveCode($event,survey.answerUrl )" >复制地址</el-button>
          <el-link :href="survey.answerUrl" :underline="false" target="_blank" ><el-button icon="el-icon-link" style="border-bottom-left-radius: 0px;border-top-left-radius: 0px;" >打开问卷</el-button></el-link>
        </el-button-group>
      </div>
    </div>
  </div>
</template>

<script>

import Clipboard from 'clipboard'

export default {
  name: 'CtAnswerUrlMain',
  components: {
    Clipboard
  },
  props: {
    survey: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    downloadAnswerImg (imgSrc) {
      console.debug(imgSrc)
      window.location.href = imgSrc
    },
    copyActiveCode (e, text) {
      // console.debug(this.$children[0].survey)
      console.debug(this.survey)
      const clipboard = new Clipboard(e.target, {text: () => text})
      clipboard.on('success', e => {
        this.$message({type: 'success', message: '复制成功'})
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message({type: 'warning', message: '该浏览器不支持自动复制'})
        // 释放内存
        clipboard.off('error')
        clipboard.off('success')
        clipboard.destroy()
      })
      clipboard.onClick(e)
    }
  }
}
</script>

<style scoped>
.ct-dcs-main-p{
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
.ct-dcs-main-content{
  padding: 20px 0px;
}
.ct-dcs-main-img{
  border: 1px solid rgb(241, 242, 245);
}
.ct-dcs-main-title{
  padding-bottom: 10px;
}
</style>
