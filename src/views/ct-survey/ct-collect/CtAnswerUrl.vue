<template>
  <div>
    <ct-survey-dcs-wrapper :id="id" is-answer-url="true" >
      <template v-slot:ct-dcs-main-slot="{survey}" >
        <ct-answer-url-main v-if="survey" :survey="survey"></ct-answer-url-main>
      </template>
    </ct-survey-dcs-wrapper>
  </div>
</template>
<script>

import CtSurveyDcsWrapper from '@/components/common/CtSurveyDcsWrapper'
import CtAnswerUrlMain from './CtAnswerUrlMain'

export default {
  name: 'CtAnswerUrl',
  components: {
    CtSurveyDcsWrapper,
    CtAnswerUrlMain
  }
}

</script>
