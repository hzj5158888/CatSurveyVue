<template>
  <div>
    <ct-survey-dcs-wrapper :id="id" is-answer-data="true" >
      <template v-slot:ct-dcs-main-slot="{survey}" >
        <div class="ct-dcs-main-title">
          <el-row type="flex">
            <el-col :span="18"><div style="font-size: 14px;padding: 10px;"><strong>原始数据列表</strong></div></el-col>
          </el-row>
        </div>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="回答的题数" >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.completeCnt != undefined ? scope.row.completeCnt : 0 }}&nbsp;题</span>
            </template>
          </el-table-column>
          <el-table-column label="回答时间" >
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.submitDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160" >
            <template slot-scope="scope">
              <el-button-group>
                <el-tooltip effect="dark" content="查看数据" placement="top">
                  <el-button size="mini" icon="el-icon-view" @click="handleGo(`/no-top/ct-survey/d/data/${scope.row.surveyId}/${scope.row.id}`)"></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="删除数据" placement="top">
                  <el-button size="mini" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"></el-button>
                </el-tooltip>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <div class="ct-pagination">
          <el-pagination
            :page-size="pageSize"
            :current-page="currentPage"
            :total="total"
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </template>
    </ct-survey-dcs-wrapper>
  </div>
</template>
<script>

import CtSurveyDcsWrapper from '@/components/common/CtSurveyDcsWrapper'
import {ctSurveyInfo, ctSurveyAnswerDelete} from '@/api/ct-survey'
import API from '@/api/index'

export default {
  name: 'CtSurveyAnswer',
  components: {
    CtSurveyDcsWrapper
  },
  data () {
    return {
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      dialogFormVisible: false,
      expUpQu: 0
    }
  },
  mounted () {
    this.queryList(1)
  },
  methods: {
    handleGo (to) {
      this.$router.push(to)
    },
    handlePush: function (to) {
      this.$router.push(to)
    },
    handleDelete (index, row) {
      console.log(index, row)
      this.$msgbox.confirm('确认删除此条答卷吗？', '删除警告', {type: 'warning', confirmButtonText: '确认删除'}).then(() => {
        ctSurveyAnswerDelete(row.id).then((response) => {
          console.log(response)
          if (response.status === 200) {
            this.$message.success('删除成功，即将刷新数据。')
            location.reload();
          } else {
            this.$message.error('删除答卷失败: ' + response.message)
          }
        })
      }).catch(() => {})
    },
    handleCurrentChange (val) {
      this.queryList(val)
    },
    handleExport () {
      this.dialogFormVisible = true
    },
    queryList () {
      ctSurveyInfo(this.$route.params.id).then((response) => {
        console.log(response);
        let tableData = [];
        let responseList = response.data.responseList;
        for (let i = 0; i < responseList.length; i++)
        {
          tableData.push({
            id: responseList[i].id,
            surveyId: responseList[i].surveyId,
            completeCnt: responseList[i].answerDetailList.length,
            submitDate: responseList[i].submitDate
          })
        }

        this.tableData = tableData;
      })
    }
  }
}

</script>
<style scoped>
.ct-pagination{
  padding-top: 20px;
  text-align: right;
}
</style>
