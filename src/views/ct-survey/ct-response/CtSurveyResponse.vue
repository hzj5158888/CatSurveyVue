<template>
  <div>
    <div class="ct-answer-content">
      <el-row type="flex" class="row-bg">
        <el-col :span="16" :push="4">
          <div style="background: white;">
            <el-descriptions :column="1" border>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-price-tag"></i> 截至日期
                </template>
                {{ survey.endDate }}
              </el-descriptions-item>
            </el-descriptions>
            <div class="ct-answer-title"
              style="padding-top: 30px;padding-bottom: 0px; text-align:center; font-size:larger">{{ survey.title }}</div>
            <div class="ct-answer-title"
              style="padding-top: 30px;padding-bottom: 0px; text-align:center; font-size:x-small">{{ survey.description }}
            </div>
            <div style="padding: 0px 20px 30px 20px;">
              <div>
                <el-form ref="form" label-width="80px" label-position="left" v-model="survey">
                  <el-form-item>
                    <div class="ct-qu-item" v-for="(question, index) in survey.questionList">
                      <div class="ct-qu-item-title">
                        <span>{{ index + 1 }}、</span>
                        <span v-html="question.content"></span>
                        <span>【{{ question.type }}】</span>
                      </div>
                      <div class="ct-qu-item-body">
                        <div v-if="question.type === '单选'">
                          <div>
                            <el-radio-group v-model="selectedVal[idMap[question.id]]">
                              <el-radio v-for="option in question.optionList" :key="option.id" :label="option.id">{{
                                option.content }}
                              </el-radio>
                            </el-radio-group>
                          </div>
                        </div>
                        <div v-if="question.type === '多选'">
                          <el-checkbox v-for="(option) in question.optionList" :key="option.id" :label="option.id">{{
                            option.content }}
                          </el-checkbox>
                        </div>
                        <div v-if="question.type === '文本'">
                          <el-row>
                            <el-col :span="13">
                              <el-input type="textarea" v-model="textVal[idMap[question.id]]" rows="4"
                                clearable></el-input>
                            </el-col>
                          </el-row>
                        </div>
                        <div v-if="question.type === '单行文本'">
                          <el-row>
                            <el-col :span="13">
                              <el-input v-model="textVal[idMap[question.id]]" clearable></el-input>
                            </el-col>
                          </el-row>
                        </div>
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" native-type="button" style="width: 85%;" @click="submit()">提交</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>

import CtSurveyDcsWrapper from '@/components/common/CtSurveyDcsWrapper'
import { ctSurveyInfo, addResponse } from '@/api/ct-survey'

export default {
  name: 'CtSurveyResponse',
  components: {
    CtSurveyDcsWrapper
  },
  data() {
    return {
      survey: {
        questionList: []
      },
      pageSize: 10,
      currentPage: 1,
      total: 0,
      radio: 3,
      formSize: 'medium',
      rateValue: 3.7,
      selectedVal: new Array(),
      textVal: new Array(),
      idMap: {},
      value: ''
    }
  },
  created() {
    this.querySurvey(1);
  },
  mounted() {
    //this.querySurvey(1)
  },
  methods: {
    submit() {
      console.log(this.$refs.form);

      let response = {};
      response.surveyId = this.survey.id;
      response.answerDetailList = [];

      // option -> checked
      // text -> value
      let form_idx = 0;
      let formElem = this.$refs.form.$el;
      let questionList = this.survey.questionList;
      for (let i = 0; i < questionList.length; i++) {
        let answerDetail = {
          questionId: questionList[i].id
        };

        if (questionList[i].type === '文本' || questionList[i].type === '单行文本') {
          let value = formElem[form_idx].value;
          let json_answer = JSON.stringify({
            selected: null,
            text: value
          });
          answerDetail.jsonAnswer = json_answer;
          response.answerDetailList.push(answerDetail);
          form_idx++;
          continue;
        }

        let selectedList = [];
        let optionList = questionList[i].optionList;
        for (let j = 0; j < optionList.length; j++) {
          if (formElem[form_idx].checked)
            selectedList.push(optionList[j].id);

          form_idx++;
        }

        let json_answer = JSON.stringify({
          text: null,
          selected: selectedList
        });
        answerDetail.jsonAnswer = json_answer;
        response.answerDetailList.push(answerDetail);
      }

      addResponse(response).then((res) => {
        if (res.status === 200) {
            this.$alert('提交成功', '提示')
        }
      })
    },
    goBack() {
      this.$router.back()
    },
    handleInfo(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    querySurvey() {
      ctSurveyInfo(this.$route.params.surveyId).then((response) => {
        const resultData = response.data
        this.survey = resultData

        let selected_idx = 0, text_idx = 0;
        let questionList = this.survey.questionList;
        for (let i = 0; i < questionList.length; i++) {
          let cur_question = questionList[i];
          if (cur_question.type === '单选' || cur_question.type === '多选') {
            this.idMap[cur_question.id] = selected_idx;
            selected_idx++;
          } else if (cur_question.type === '文本' || cur_question.type === '单行文本') {
            this.idMap[cur_question.id] = text_idx;
            text_idx++;
          }
        }

        this.survey.questionList = questionList;
        this.selectedVal = new Array(selected_idx + 1);
        this.textVal = new Array(text_idx + 1);
        this.selectedVal.fill(0);
        this.textVal.fill("");
        console.log(this.survey);
      })
    },
    handleCurrentChange: function (val) {

    }
  }
}

</script>
<style scoped>
.ct-page-header {
  padding: 20px;
  background-color: white;
}

.ct-answer-title {
  font-size: 16px;
  padding: 10px;
}

.ct-answer-content {
  padding: 20px;
}

.margin-top {
  margin-top: 20px;
}

.ct-qu-item {
  margin-top: 10px;
}

.ct-qu-item-title {
  padding: 20px 0px;
  color: grey;
}

.ct-qu-item-body {
  margin-left: 10px;
}
</style>
