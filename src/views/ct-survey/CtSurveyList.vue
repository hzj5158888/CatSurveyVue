<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="ct-table-form" style="padding-left: 60px;">
          <el-form :inline="true" :model="formInline" class="ct-form-inline" size="medium" >
            <el-form-item label="问卷标题">
              <el-input v-model="formInline.title" placeholder="请输入查询的问卷标题" clearable></el-input>
            </el-form-item>
            <el-form-item label="问卷状态" style="margin-left: 40px;">
              <el-select v-model="formInline.status" placeholder="请选择问卷状态" clearable>
                <el-option label="草稿" value="草稿"></el-option>
                <el-option label="进行中" value="进行中"></el-option>
                <el-option label="已结束" value="已结束"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left: 40px;">
              <el-button @click="onReset">重置</el-button>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="ct-table">
          <div class="ct-table-title">
            <el-row :span="24" type="flex" justify="space-between" align="middle">
              <el-col :span="4"><h3>我的问卷</h3></el-col>
              <el-col :span="20" style="text-align: right;">
                <el-button type="primary" size="medium" @click="form.id=null;form.name=null;dialogTitle = '创建问卷';dialogFormVisible = true" >新建问卷</el-button>
              </el-col>
            </el-row>
          </div>
          <el-table
            :data="tableData"
            stripe
            @row-click="handleRow"
            style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="问卷" >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p v-html="scope.row.title" ></p>
                  <div slot="reference" class="name-wrapper">
                    <div v-if="scope.row.title != null" v-text="scope.row.title"></div>
                    <div v-else v-html="scope.row.title"></div>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="答卷数" width="80" >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.responseList != null ? scope.row.responseList.length : 0 }}&nbsp;份</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="80" >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status === '草稿'" >草稿</el-tag>
                <el-tag v-else-if="scope.row.status === '进行中'" type="success" >进行中</el-tag>
                <el-tag v-else-if="scope.row.status === '已结束'" type="info" >已结束</el-tag>
                <el-tag v-else disable-transitions style="margin-left: 10px" >未知</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" width="180" >
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="280">
              <template slot-scope="scope">
                <el-button-group>
                  <el-tooltip effect="dark" content="编辑问卷" placement="top">
                    <el-button size="mini" content="编辑问卷" icon="el-icon-edit" @click="handlePush(`/ct/survey/d/edit/${scope.row.id}`)" ></el-button>
                  </el-tooltip>
                  <el-tooltip v-if="scope.row.status === '进行中'" effect="dark" content="答卷详情" placement="top">
                    <el-button size="mini" icon="el-icon-share" @click="handlePush(`/ct/survey/c/url/${scope.row.id}`)"></el-button>
                  </el-tooltip>
                  <el-tooltip v-if="scope.row.status !== '进行中'" effect="dark" content="答卷详情" placement="top">
                    <el-button size="mini" icon="el-icon-setting" @click="handlePush(`/ct/survey/c/attr/${scope.row.id}`)"></el-button>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="答卷数据" placement="top">
                    <el-button size="mini" icon="el-icon-s-data" @click="handlePush(`/ct/survey/d/chart/${scope.row.id}`)"></el-button>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="删除问卷" placement="top">
                    <el-button size="mini" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"></el-button>
                  </el-tooltip>
                  <el-tooltip v-if="scope.row.status === '草稿' || scope.row.status==='已结束'" effect="dark" content="发布问卷" placement="top">
                    <el-button size="mini" type="success" @click="handlePost(scope.$index, scope.row, '进行中')">发布问卷</el-button>
                  </el-tooltip>
                  <el-tooltip v-if="scope.row.status === '进行中'" effect="dark" content="停止收集" placement="top">
                    <el-button size="mini" type="info" @click="handlePost(scope.$index, scope.row, '已结束')">停止收集</el-button>
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
        </div>
      </el-col>
    </el-row>

    <div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" append-to-body width="40%" >
        <el-form :model="form" label-position="top">
          <el-form-item :label-width="formLabelWidth" label="问卷标题" >
            <el-input v-model="form.title" autocomplete="off" placeholder="请输入问卷标题" ></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="问卷描述" >
            <el-input v-model="form.description" autocomplete="off" placeholder="请输入问卷描述" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleDialogConfirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>

import {ctSurveyCreate, ctSurveyList} from '@/api/ct-survey'
import {ctSurveyCopy, ctSurveyDelete, ctSurveyUpdate} from '../../api/ct-survey'
import CtAuthorized from '../../utils/ct-authorized'

export default {
  name: 'SurveyList',
  data () {
    return {
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      dialogTitle: '创建问卷',
      formInline: {
        title: null,
        status: null
      },
      surveyList: [],
      dialogFormVisible: false,
      form: {
        name: '',
        id: null
      },
      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.queryList(1);
  },
  methods: {
    buttonClickA (href) {
      window.location.href = href
    },
    handlePush: function (to) {
      this.$router.push(to)
    },
    handleRow(row, row_attr) {
      if (row_attr.label === '操作')
        return;

      if (row.status === '进行中')
        this.handlePush('/ct/survey/c/url/' + row.id)
      else
        this.handlePush('/ct/survey/c/attr/' + row.id)
    },
    handleDelete (index, row) {
      this.$msgbox.confirm('确认删除此问卷吗？', '删除警告', {type: 'warning', confirmButtonText: '确认删除'}).then(() => {
        ctSurveyDelete(row.id).then((response) => {
          console.log(response)
          if (response.status === 200) {
            this.$message.success('删除成功，即将刷新数据。')
            this.queryList(1)
          } else {
            this.$message.error('删除问卷失败')
          }
        })
      }).catch(() => {})
    },
    handlePost (index, row, status) {
      this.$msgbox.confirm('确认发布此问卷吗？', '确认发布', {confirmButtonText: '确认发布'}).then(() => {
        let new_info = {
          status,
          endDate: '',
          startDate: ''
        };
        console.log(new_info);
        ctSurveyUpdate(row.id, new_info).then((response) => {
          console.log(response)
          if (response.status === 200) {
            if (status === '进行中')
            {
              this.handlePush(`/ct/survey/c/url/${row.id}`)
            } else {
              this.$message.success('状态更新成功，即将刷新数据。')
            }
            this.queryList(1)
          } else {
            this.$message.error('状态更新失败')
          }
        })
      }).catch((res) => { console.log(res) })
    },
    onSubmit () {
      console.log('submit!')
      const {title, status} = this.formInline
      if (title === null && status === null)
      {
        this.tableData = this.surveyList;
        return;
      }

      var res = [];
      for (var i = 0; i < this.surveyList.length; i++)
      {
          if (this.surveyList[i].title.indexOf(title) === -1 && this.surveyList[i].status !== status)
            continue;

          res.push(this.surveyList[i]);
      }

      this.tableData = res;
    },
    onReset() {
      this.formInline = {
        title: null,
        status: null
      };
      this.tableData = this.surveyList;
    },  
    handleCurrentChange (val) {
      this.queryList(val)
    },
    queryList () {
      //const {surveyName, surveyState} = this.formInline
      ctSurveyList().then((response) => {
        console.log(response);
        if (response.status !== 200)
        {
          console.log("queryList: " + resultData.message);
          return; 
        }

        this.surveyList = response.data;
        this.tableData = response.data
        this.total = response.data.length
        this.currentPage = response.data.current
        this.pageSize = response.data.pageSize
      }).catch((res) => {
        console.log(res); 
      })
    },
    handleDialogConfirm () {
        this.createSurvey()
    },
    createSurvey () {
      const data = {title: this.form.title, description: this.form.description, status: "草稿"};
      ctSurveyCreate(data).then((response) => 
      {
        if (response.status === 200) 
        {
          let data = response.data;
          this.dialogFormVisible = false
          this.handlePush('/#/ct/survey/d/edit/' + data)
          this.queryList(1)
        } else {
          this.$message.error('创建问卷失败')
        }
      })
    },
  }
}
</script>
<style scoped>
.ct-table-form{
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
}
.ct-table{
  background: white;
  padding: 20px;
}
.ct-table .ct-table-title{
  padding-bottom: 20px;
  border-bottom: 1px solid #f3f3f3;
}
.ct-table .ct-table-title h3{
  padding: 0px;
  margin: 0px;
}
.el-form-item{
  margin-bottom: 0px;
}
.ct-pagination{
  padding-top: 20px;
  text-align: right;
}
</style>
