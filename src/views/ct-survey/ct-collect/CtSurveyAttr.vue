<template>
  <div>
    <ct-survey-dcs-wrapper is-survey-set="true" >
      <template v-slot:ct-dcs-main-slot >
        <div>
          <div class="ct-dcs-main-content">

            <div style="padding: 0px 30px;">
              <el-form ref="form" :label-position="labelPosition" >
                <el-row>
                  <el-col :span="12">
                    <h5>问卷状态</h5>
                    <el-form-item>
                      <el-col :span="5">
                        <el-select :value="survey.status" v-model="survey.status" placeholder="请选择" @change="surveyStateChange" >
                          <el-option key="草稿" :value=0 label="草稿" ></el-option>
                          <el-option key="进行中" :value=1 label="进行中" ></el-option>
                          <el-option key="已结束" :value=2 label="已结束" ></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                    <h5>时间设置</h5>
                    <div style="padding-left: 10px;">
                      <el-form-item v-if="survey.status === '进行中'">
                          开始时间 &nbsp;
                          <el-date-picker
                            v-model="survey.startDate"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            placeholder="选择日期时间" >
                          </el-date-picker>
                          &nbsp;时结束
                      </el-form-item>
                      <el-form-item v-if="survey.status === '进行中'">
                          结束时间 &nbsp;
                          <el-date-picker
                            v-model="survey.endDate"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            placeholder="选择日期时间" >
                          </el-date-picker>
                          &nbsp;时结束
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit"> 保存修改 </el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
            </div>

          </div>
        </div>
      </template>
    </ct-survey-dcs-wrapper>
  </div>
</template>

<script>

import CtSurveyDcsWrapper from '@/components/common/CtSurveyDcsWrapper'
import {ctSurveyInfo, ctSurveyUpdate} from '@/api/ct-survey'

export default {
  name: 'CtSurveyAttr',
  components: {
    CtSurveyDcsWrapper
  },
  data () {
    return {
      labelPosition: 'right',
      value1: '',
      survey: {
      }
    }
  },
  mounted () {
    this.getSurveyInfo()
  },
  methods: {
    getSurveyInfo () {
      ctSurveyInfo(this.$route.params.id).then((response) => {
        const resultData = response.data
        this.survey = resultData
        console.log(this.survey);
      })
    },
    surveyStateChange() {
      var statusMap = {
       0: '草稿',
       1: '进行中',
       2: '已结束' 
      }

      this.survey.status = statusMap[this.survey.status];
      if (this.survey.status === '草稿') {
        this.survey.endDate = null;
        this.survey.startDate = null;
      }
    },
    onSubmit () {
      console.log('submit!')
      const data = {
        startDate: this.survey.startDate,
        endDate: this.survey.endDate,
        status: this.survey.status
      }
      console.log(data)
      ctSurveyUpdate(this.$route.params.id, data).then((response) => {
        console.log(response)
        if (response.status === 200) {
          this.$alert('保存成功', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              location.reload();
            }
          });
        } else {
          this.$message({type: 'error', message: response.message})
        }
      })
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
</style>
