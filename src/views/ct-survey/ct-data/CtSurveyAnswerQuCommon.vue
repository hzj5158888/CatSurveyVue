<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" label-position="left" >
      <div class="ct-qu-item">
        <div class="ct-qu-item-title">
          <span>{{ index + 1 }}、</span>
          <span v-html="question.content" ></span>
          <span>【{{ question.type }}】</span>
        </div>
        <div class="ct-qu-item-body">
          <div v-if="question.type === '单选'">
            <div>
              <el-radio-group v-model="singleSelected">
                  <el-radio v-for="item in question.optionList" :key="item.id" :label="item.id">{{ item.content }}</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div v-if="question.type === '多选'">
            <el-checkbox v-for="(item) in question.optionList" :key="item.id" :label="item.id" :checked="item.selected" >{{ item.content }}</el-checkbox>
          </div>
          <div v-if="question.type === '文本'">
            <el-row><el-col :span="12"><el-input v-model="question.text" type="textarea" readonly ></el-input></el-col></el-row>
          </div>
          <div v-if="question.type === '单行文本'">
            <el-row><el-col :span="12"><el-input v-model="question.text" readonly ></el-input></el-col></el-row>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>

export default {
  name: 'CtSurveyAnswerInfo',
  props: {
    question: {
      type: Object,
      default: () => []
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      radio: 3,
      formSize: 'medium',
      rateValue: 3.7,
      singleSelected: 0,
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
      value: '',
      ctResourceUrl: ''
    }
  },
  mounted () {
    console.debug(process.env.CT_RESOURCE_URL)
    console.log('mounted:');
    console.log(this.question)
    for (let i = 0; i < this.question.optionList.length; i++)
    {
        if (this.question.optionList[i].selected)
        {
          this.singleSelected = this.question.optionList[i].id;
          break; 
        } 
    }

    this.ctResourceUrl = process.env.CT_RESOURCE_URL
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
    handleCurrentChange: function (val) {
      //this.queryList(val)
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
