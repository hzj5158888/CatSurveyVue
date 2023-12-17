<template>
  <div>
    <el-page-header content="答卷详情" class="ct-page-header" @back="goBack" ></el-page-header>
    <div class="ct-answer-content">
      <el-row type="flex" class="row-bg">
        <el-col :span="16" :push="4">
          <div style="background: white;">
            <el-descriptions :column="3" border>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-timer"></i>
                  答卷时间
                </template>
                {{ tableData.submitDate }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-monitor"></i>
                  答题数
                </template>
                {{ tableData.completeCnt }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-price-tag"></i> 答卷ID
                </template>
                {{ tableData.id }}
              </el-descriptions-item>
            </el-descriptions>
            <div class="ct-answer-title" style="padding-top: 30px;padding-bottom: 0px;">答卷结果信息</div>
            <div style="padding: 0px 20px 30px 20px;">
              <ct-survey-answer-qu-common v-for="(item,index) in survey.questionList" :key="item.id" :id="item.id" :index="index" :question="item" ></ct-survey-answer-qu-common>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>

import CtSurveyDcsWrapper from '@/components/common/CtSurveyDcsWrapper'
import CtSurveyAnswerQuCommon from './CtSurveyAnswerQuCommon'
import {ctSurveyInfo} from '@/api/ct-survey'

export default {
  name: 'CtSurveyAnswerInfo',
  components: {
    CtSurveyDcsWrapper,
    CtSurveyAnswerQuCommon
  },
  data () {
    return {
      survey: {
        questionList: []
      },
      tableData: {},
      pageSize: 10,
      currentPage: 1,
      total: 0,
      radio: 3,
      formSize: 'medium',
      rateValue: 3.7,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      value: ''
    }
  },
  mounted () {
    this.querySurveyAnswer(1)
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    handleInfo (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    querySurveyAnswer () {
      ctSurveyInfo(this.$route.params.id).then((response) => 
      {
        const resultData = response.data
        this.survey = resultData

        let tableData = {};
        let responseList = response.data.responseList;
        for (let i = 0; i < responseList.length; i++)
        {
          if (parseInt(responseList[i].id) !== parseInt(this.$route.params.answerId))
            continue;

          tableData = {
            id: responseList[i].id,
            surveyId: responseList[i].surveyId,
            completeCnt: responseList[i].answerDetailList.length,
            submitDate: responseList[i].submitDate
          }
          break;
        }
        this.tableData = tableData;

        let questionList = this.survey.questionList;
        for (let i = 0; i < questionList.length; i++) {
          let questionData = questionList[i];
          let answerList = questionData.answerDetailList;
          let optionList = questionData.optionList;
          let optionMap = {};

          for (let j = 0; j < optionList.length; j++)
          {
            optionMap[optionList[j].id] = j;
            optionList[j].selected = false;
          }

          let text = "";
          for (let j = 0; j < answerList.length; j++) {
            let answer = answerList[j];
            let answer_json = eval('(' + answer.jsonAnswer + ')')
            if (parseInt(answer.responseId) !== parseInt(this.$route.params.answerId))
              continue;

            console.log(questionData.type);
            if (questionData.type === '文本' || questionData.type === '单行文本')
            {
                console.log(answer_json)
                text = answer_json.text;
                break
            }

            let id_list = answer_json.selected === undefined ? [] : answer_json.selected;
            for (let k = 0; k < id_list.length; k++)
            {
              optionList[ optionMap[id_list[k]] ].selected = true;
            }
          }

          this.survey.questionList[i].text = text;
        }
      })
    },
    handleCurrentChange: function (val) {

    }
  }
}

</script>
<style scoped>
.ct-page-header{
  padding: 20px;
  background-color: white;
}
.ct-answer-title{
  font-size: 16px;
  padding: 10px;
}
.ct-answer-content{
  padding: 20px;
}
.margin-top{
  margin-top: 20px;
}
.ct-qu-item{
  margin-top: 10px;
}
.ct-qu-item-title{
  padding: 20px 0px;
  color: grey;
}
.ct-qu-item-body{
  margin-left: 10px;
}
</style>
