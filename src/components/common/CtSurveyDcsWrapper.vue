<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="ct-dcs-main">
          <div class="ct-dcs-main-survey-title">
            <el-row type="flex" justify="space-between" align="middle">
              <el-col>
                <div class="ct-dcs-main-survey-title-content">
                  <div v-if="survey.title != null" v-text="survey.title"></div>
                  <div v-else v-html="survey.title"></div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="ct-dcs-main-survey-step">
            <div class="ct-dcs-main-survey-step-item" style="padding: 13px 16px;">
              <el-row type="flex" justify="space-between" align="middle" >
                <el-col :span="3" >
                  <router-link :to="`${prevPath}/survey/c/url/${survey.id}`" :class="{ 'ct-link-primary' : isAnswerUrl || isSurveySet || isSiteShare || isAnswerWx}" class="ct-link ct-link-1" ><i class="el-icon-link"></i>问卷收集</router-link>
                </el-col>
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/d/chart/${survey.id}`" :class="{ 'ct-link-primary' : isSurveyChart || isAnswerData }" class="ct-link ct-link-1" ><i class="el-icon-s-data"></i>问卷数据</router-link>
                </el-col>
                <el-col :span="15" style="text-align: right;">
                  <el-button size="small" @click="handlePush(`${prevPath}/survey/c/url/${survey.id}`)" >答卷地址</el-button>
                </el-col>
              </el-row>
            </div>
            <div class="ct-dcs-main-survey-step-item" style="padding-left: 16px;">
              <el-row v-show="isAnswerUrl || isSurveySet || isSiteShare || isAnswerWx">
                <el-col :span="3">
                  <router-link v-if="survey.status === '进行中'" :to="`${prevPath}/survey/c/url/${survey.id}`" :class="{ 'ct-link-primary' : isAnswerUrl}" class="ct-link" ><i class="el-icon-link"></i>答卷地址</router-link>
                </el-col>
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/c/attr/${survey.id}`" :class="{ 'ct-link-primary' : isSurveySet}" class="ct-link" ><i class="el-icon-setting"></i>答卷设置</router-link>
                </el-col>
              </el-row>
              <el-row v-show="isSurveyChart || isAnswerData">
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/d/chart/${survey.id}`" :class="{ 'ct-link-primary' : isSurveyChart}" class="ct-link" ><i class="el-icon-discount"></i>默认统计</router-link>
                </el-col>
                <el-col :span="3">
                  <router-link :to="`${prevPath}/survey/d/data/${survey.id}`" :class="{ 'ct-link-primary' : isAnswerData}" class="ct-link" ><i class="el-icon-receiving"></i>原始数据</router-link>
                </el-col>
                <el-col :span="3"></el-col>
                <el-col :span="3"></el-col>
              </el-row>
            </div>
            <div class="ct-dcs-main-survey-step-item ct-dcs-main-survey-step-item-status" >
              <el-row type="flex" justify="space-between" align="middle">
                <el-col :span="4">
                  <div>状态：
                    <el-tag v-if="survey.status === '草稿'" size="mini" >草稿</el-tag>
                    <el-tag v-else-if="survey.status === '进行中'" type="success" size="mini" >进行中</el-tag>
                    <el-tag v-else-if="survey.status === '已结束'" type="info" size="mini" >已结束</el-tag>
                    <el-tag v-else disable-transitions style="margin-left: 10px" size="mini" >未知</el-tag>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div>收集数：{{ survey.responseList != null ? survey.responseList.length : 0 }} 份</div>
                </el-col>
                <el-col :span="16" style="text-align: right;">
                  创建时间：{{ survey.createDate }}
                </el-col>
              </el-row>
            </div>
            <div class="ct-dcs-main-survey-step-main">
              <slot :survey="survey" name="ct-dcs-main-slot" ></slot>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {ctSurveyInfo} from '@/api/ct-survey'
import {ctSurveyUpState} from '../../api/ct-survey'
export default {
  name: 'CtSurveyDcsWrapper',
  props: {
    id: {type: String, default: ''},
    isAnswerUrl: {type: Boolean, default: false},
    isSurveySet: {type: Boolean, default: false},
    isSiteShare: {type: Boolean, default: false},
    isAnswerWx: {type: Boolean, default: false},
    isSurveyChart: {type: Boolean, default: false},
    isAnswerData: {type: Boolean, default: false},
    isSurveyLog: {type: Boolean, default: false},
    isAnswerLog: {type: Boolean, default: false}
  },
  data () {
    return {
      survey: {
        sid: '',
        answerUrl: '',
        answerUrl1: '',
        answerUrlQR: '',
        siteCompCodeRoot: '',
        surveyState: ''
      },
      prevPath: '/ct'
    }
  },
  mounted () {
    console.debug(process.env)
    this.getSurveyInfo()
  },
  methods: {
    buttonClickA (href) {
      window.location.href = href
    },
    handlePush (to) {
      this.$router.push(to)
    },
    getSurveyInfo () {
      ctSurveyInfo(this.$route.params.id).then((response) => {
        if (response.status !== 200) {
          this.$message.error(response.message);
          return;
        }
        this.survey = response.data
        this.survey.answerUrl = location.origin + '/#/no-top/ct-survey/answer/' + this.survey.id
      })
    }
  }
}

</script>
<style scoped>
.ct-dcs-main{
  background-color: white;
  padding: 20px;
}
.ct-dcs-main-survey-title{
  border-bottom: 1px solid rgb(241, 242, 245);
  padding-bottom: 20px;
  padding-left: 10px;
}
.ct-dcs-main-survey-title-content{
  font-size: 26px;
  font-weight: 300;
}
.ct-dcs-main-survey-step{
  padding: 0px;
}
.ct-dcs-main-survey-step-item{
  padding: 20px 10px;
  border-bottom: 1px solid rgb(241, 242, 245);
}
.ct-link{
  text-decoration: none;
  color: #606266;
  font-size: 14px;
}
.ct-link-1{
  font-size: 14px;
}
.ct-link-primary,.ct-link:hover{
  color: #409eff;
  font-weight: bold;
}
.ct-link i{
  margin-right: 6px;
}
.ct-dcs-main-survey-step-main{
  padding: 20px 10px;
}
.ct-dcs-main-survey-step-item-status{
  background-color: rgb(241, 242, 245);
  font-size: 14px;
  padding: 10px;
}
</style>
