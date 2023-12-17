<template>
  <div style="width: 100%;" >
    <div style="font-size: 16px;font-weight: bold;">
      <span>{{ index+1 }}、</span>
      <span v-html="question.content" ></span>
      <span>【{{ question.type }}】</span>
    </div>
    <div v-if="question.type === '文本' || question.type==='单行文本'" style="padding: 30px;">
      填写回答：{{ question.textList.length }} 份
    </div>
    <div v-if="question.type === '单选' || question.type === '多选'">
      <el-table
        :data="question.optionStatusList"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="题目选项">
        </el-table-column>
        <el-table-column
          :label="'频次比例'"
          width="330" >
          <template slot-scope="scope">
            <el-progress :text-inside="true" :stroke-width="26" :percentage="scope.row.percent"></el-progress>
          </template>
        </el-table-column>
        <el-table-column
          v-if="question.type === '单选' || question.type === '多选' "
          label="频次"
          width="130"
          align="center">
          <template slot-scope="scope">{{ scope.row.count }} 次</template>
        </el-table-column>
        <el-table-column
          v-if="question.type === '文本' || question.type==='单行文本'"
          label="填写次数"
          width="130"
          align="center">
          <template slot-scope="scope">{{ scope.row.count }} 次</template>
        </el-table-column>
      </el-table>
      <div>
        <el-tabs v-model="activeName" style="width: 100%;" @tab-click="handleClick" >
          <el-tab-pane label="柱状图" name="bar">
            <div class="ctsurveyMain" style="width: 100%;height:400px;" ></div>
          </el-tab-pane>
          <el-tab-pane label="拆线图" name="line">
            <div class="ctsurveyMain" style="width: 100%;height:400px;" ></div>
          </el-tab-pane>
          <el-tab-pane label="拼状图" name="pie">
            <div class="ctsurveyMain" style="width: 100%;height:400px;" ></div>
          </el-tab-pane>
          <el-tab-pane label="条形图" name="barY">
            <div class="ctsurveyMain" style="width: 100%;height:400px;" ></div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>

import * as echarts from 'echarts/core'
import {GridComponent, TitleComponent, TooltipComponent, LegendComponent} from 'echarts/components'
import {LineChart, BarChart, PieChart} from 'echarts/charts'
import {UniversalTransition, LabelLayout} from 'echarts/features'
import {CanvasRenderer} from 'echarts/renderers'

echarts.use([GridComponent, LineChart, BarChart, CanvasRenderer, UniversalTransition, TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  LabelLayout])

export default {
  name: 'CtsurveyChartsCommon',
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
      activeName: 'bar'
    }
  },
  mounted () {
    console.debug('this.question')
    console.debug(this.question)
    // document.getElementsByClassName('ctsurveyMainBar')
    // this.loadChart('ctsurveyMainBar', 'bar')
    const questionObj = document.getElementById(this.question.id)
    const ctsurveyMains = questionObj.getElementsByClassName('ctsurveyMain')
    this.loadChart(ctsurveyMains[0], 'bar')
  },
  methods: {
    handleClick: function (tab, event) {
      console.log(tab, event)
      console.debug(this.activeName)
      tab.$el.style.display = 'block'
      const ctsurveyMain = tab.$el.getElementsByClassName('ctsurveyMain')
      const curChartType = this.activeName
      // 构建option data, xAxisData
      this.loadChart(ctsurveyMain[0], curChartType)
    },
    loadChart: function (chartDom, type) {
      const myChart = echarts.init(chartDom)
      const option = this.buildOption(this.question, type)
      option && myChart.setOption(option)
    },
    buildOption: function (questionData, type) {
      const items = []
      const itemValues = []
      const itemNameValues = []
      const optionStatusList = questionData.optionStatusList;

      for (let i = 0; i < optionStatusList.length; i++)
      {
        items.push(optionStatusList[i].name);
        itemValues.push(optionStatusList[i].count); 
        itemNameValues.push({
          'value': optionStatusList[i].percent,
          'name': optionStatusList[i].name
        })
      }

      console.debug(items)
      let yAxisShow = true
      let option
      if (type === 'line' || type === 'bar') {
        option = {
          xAxis: {
            nameTextStyle: {

            },
            nameGap: 20,
            axisLabel: {
              rotate: -10,
              interval: 0
            },
            type: 'category',
            // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            data: items
          },
          yAxis: {
            type: 'value',
            show: yAxisShow
          },
          series: [
            {
              // data: [150, 230, 224, 218, 135, 147, 260],
              data: itemValues,
              type: type
            }
          ]
        }
      } else if (type === 'barY') {
        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {},
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            show: yAxisShow
          },
          yAxis: {
            type: 'category',
            // data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
            data: items
          },
          series: [
            {
              type: 'bar',
              // data: [18203, 23489, 29034, 104970, 131744, 630230]
              data: itemValues
            }
          ]
        }
      } else if (type === 'pie') {
        option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: itemNameValues,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
      return option
    }
  }
}

</script>

<style scoped>

</style>
