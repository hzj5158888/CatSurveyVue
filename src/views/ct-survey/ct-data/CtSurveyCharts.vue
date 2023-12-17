<template>
  <div>
    <ct-survey-dcs-wrapper :id="id" is-survey-chart="true" >
      <template v-slot:ct-dcs-main-slot="{survey}" >
        <div v-loading="loading" >
          <ct-survey-charts-common v-for="(item,index) in questions" :key="item.id" :id="item.id" :index="index" :question="item" ></ct-survey-charts-common>
        </div>
      </template>
    </ct-survey-dcs-wrapper>
  </div>
</template>
<script>

import CtSurveyDcsWrapper from '@/components/common/CtSurveyDcsWrapper'
import CtSurveyChartsCommon from './CtsurveyChartsCommon'
import {msgInfo} from '@/utils/ct-msg'
import {ctSurveyInfo} from '@/api/ct-survey'

export default {
  name: 'CtSurveyCharts',
  components: {
    CtSurveyDcsWrapper,
    CtSurveyChartsCommon
  },
  data () {
    return {
      questions: [],
      loading: true
    }
  },
  mounted () {
    this.surveyChartData()
  },
  methods: {
    surveyChartData: function () {
      console.log("run chart");
      ctSurveyInfo(this.$route.params.id).then((response) => {
        const resultData = response.data;
        console.log(resultData)
        this.questions = resultData.questionList;
        if (this.questions.length <= 0) {
          msgInfo('问卷还没有任何题目')
          this.loading = false
        }

        console.log(this.questions);
        console.log(this.questions.length);
        for (let i = 0; i < this.questions.length; i++) {
          let questionData = this.questions[i];
          let answerList = questionData.answerDetailList;
          let answerMap = {};

          console.log("set answer 1")

          console.log(questionData);

          let tot_selected = 0;
          let textList = [];
          for (let j = 0; j < answerList.length; j++) {
            let answer = answerList[j];
            let answer_json = eval('(' + answer.jsonAnswer + ')')

            if (questionData.type === '文本' || questionData.type === '单行文本')
            {
              textList.push(answer_json.text);
              continue 
            }

            console.log(questionData.type);
            console.log(answer_json.selected);

            let id_list = answer_json.selected === undefined ? [] : answer_json.selected;
            for (let k = 0; k < id_list.length; k++)
            {
              if (answerMap[id_list[k]] === undefined)
                answerMap[id_list[k]] = [];

              answerMap[id_list[k]].push(answer_json); 
            }
            
            tot_selected += id_list.length;
          }

          console.log("set answer 2")

          let optionStatusList = [];
          if (questionData.type === '单选' || questionData.type === '多选') 
          {
            let optionList = questionData.optionList;
            for (let j = 0; j < optionList.length; j++) {
              const cur_option = optionList[j];
              
              const count = answerMap[cur_option.id] === undefined ? 0 : answerMap[cur_option.id].length;
              const bfbFloat = tot_selected <= 0 ? 0 : count / tot_selected * 100
              const percent = bfbFloat.toFixed(2)
              let optionStatus = {
                'name': cur_option.content, 
                'count': parseInt(count), 
                'percent': parseFloat(percent)
              }
              
              optionStatusList.push(optionStatus)
            }
          }

          this.questions[i].textList = textList;
          this.questions[i].optionStatusList = optionStatusList;
        }

        this.loading = false
      })
    }
  }
}

</script>
