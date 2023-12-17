<template>
  <div>
    <ct-survey-dcs-wrapper is-site-share="true">
      <div slot="ct-dcs-main-slot">
        <div>
          <div class="ct-dcs-main-title">
            <h4>分享到社交网络</h4>
            <div class="ct-dcs-main-p">赶快分享您的问卷到各大社交网站，让更多关注您的朋友来回答问卷。</div>
          </div>
          <div class="ct-dcs-main-content"></div>
        </div>
      </div>
    </ct-survey-dcs-wrapper>
  </div>
</template>

<script>

import CtSurveyDcsWrapper from '@/components/common/CtSurveyDcsWrapper'
import Clipboard from 'clipboard'

export default {
  name: 'CtSiteShare',
  components: {
    CtSurveyDcsWrapper,
    Clipboard
  },
  data () {
    return {
      code: '',
      src: ''
    }
  },
  methods: {
    copyActiveCode (e, text) {
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
        this.$message({type: 'waning', message: '该浏览器不支持自动复制'})
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
</style>
