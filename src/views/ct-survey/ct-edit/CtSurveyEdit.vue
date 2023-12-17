<template>
    <div class="container">
        <el-form ref="form" :model="form" label-width="80px" style="width: 60% !important;">
            <el-form-item label="标题">
                <el-input v-model="form.title" style="width: 100% !important;"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="form.description" type="textarea" style="width: 100% !important;"></el-input>
            </el-form-item>
            <el-form-item label="创建日期">
                <el-date-picker v-model="form.createDate" style="width: 100% !important;" disabled></el-date-picker>
            </el-form-item>

            <!-- 遍历已创建的选项渲染 -->
            <div class="item" v-for="(item, index) in form.questionList" :key="index">
                <el-form-item>
                    <div class="item_title">
                        <span>{{ index + 1 }}、</span>
                        <span v-html="item.content" ></span>
                        <span>【{{ item.type }}】</span>
                    </div>
                    <!-- 单项填空 -->
                    <div v-if="item.type === '文本'">
                        <el-input type="textarea" class="disabled" placeholder="禁止输入" disabled></el-input>
                    </div>
                    <!-- 单项填空 -->
                    <div v-if="item.type === '单行文本'">
                        <el-input class="disabled" placeholder="禁止输入" disabled></el-input>
                    </div>
                    <!-- 单选 -->
                    <div v-else-if="item.type === '单选'">
                        <div class="warp" v-for="(elm, i) in item.textList" :key="i">
                            <el-radio :label="(i + 1) + '、'"></el-radio>
                            <el-input v-model="item.textList[i]"></el-input>
                        </div>
                    </div>
                    <!-- 多选 -->
                    <div v-else-if="item.type === '多选'">
                        <div class="warp" v-for="(elm, i) in item.textList" :key="i">
                            <el-checkbox :label="(i + 1) + '、'"></el-checkbox>
                            <el-input v-model="item.textList[i]"></el-input>
                        </div>
                    </div>
                    <!-- 上移、下移、删除 -->
                    <div style="margin-top: 10px">
                        <el-button @click="handleItem('up', item)" v-if="index != 0">上移</el-button>
                        <el-button @click="handleItem('down', item)" v-if="index != form.questionList.length - 1">下移</el-button>
                        <el-button @click="handleItem('del', item)">删除</el-button>
                        <el-button @click="edit(item, index)">编辑</el-button>
                    </div>
                </el-form-item>
            </div>

            <!-- 添加选项 -->
            <el-form-item>
                <el-button @click="add('单选')">单选</el-button>
                <el-button @click="add('多选')">多选</el-button>
                <el-button @click="add('文本')">文本</el-button>
                <el-button @click="add('单行文本')">单行文本</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存题目</el-button>
            </el-form-item>

            <!-- 添加选项弹出框 -->
            <div>
                <el-dialog :modal-append-to-body="false" :title="questItem.type" :visible.sync="showItem" width="50%">
                    <el-form-item label="标题">
                        <el-input v-model="itemContent"></el-input>
                    </el-form-item>
                    <el-form-item label="添加选项" v-if="questItem.type !== '文本' && questItem.type !=='单行文本'">
                        <el-input-number v-model="num" @change="handleChange" :min="1" :max="10"></el-input-number>
                    </el-form-item>
                    <el-form-item label="选项" v-for="(text, i) in itemText" :key="i" v-if="questItem.type !== '文本' && questItem.type !=='单行文本'">
                        <el-input v-model="itemText[i]"></el-input>
                    </el-form-item>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="clearItem">取 消</el-button>
                        <el-button type="primary" @click="determine">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        </el-form>
    </div>
</template>

<script>
import {ctSurveyInfo, ctSurveyUpdate} from '@/api/ct-survey'
export default {
    name: 'CtSurveyEdit',
    data() {
        return {
            num: 2,
            form: {
                questionList: [],
                title: '',
                description: '',
                createDate: ''
            },
            itemContent: '',
            itemText: new Array(2),
            questItem: {},
            showItem: false,
            editIndex: ''
        }
    },
    watch: {
        showItem() {
            if (!this.showItem) {
                this.clearItem()
            }
        }
    },
    mounted() {
        this.querySurvey();
    },  
    methods: {
        // 创建选项
        add(type) {
            this.questItem.type = type
            this.showItem = true
        },
        querySurvey() 
        {
            ctSurveyInfo(this.$route.params.id).then((response) => 
            {
                console.log(response);
                const resultData = response.data
                let survey = resultData

                let questionList = survey.questionList;
                for (let i = 0; i < questionList.length; i++) 
                {
                    let cur_question = questionList[i];
                    if (cur_question.type === '文本' || cur_question.type === '单行文本') {
                        continue;
                    }

                    let textList = [];
                    for (let j = 0; j < cur_question.optionList.length; j++)
                        textList.push(cur_question.optionList[j].content)

                    questionList[i].textList = textList;
                }

                survey.questionList = questionList;
                this.form.title = survey.title;
                this.form.createDate = survey.createDate;
                this.form.description = survey.description;
                this.form.questionList = survey.questionList;
                console.log(survey);
            })
        },
        // 增加/减少 子选项
        handleChange(val) {
            this.itemText.length = val
        },
        // 确定将选项添加进列表中进行渲染
        determine() 
        {
            if (this.itemContent == '') 
            {
                this.$message('请输入题目的标题内容');
                return
            }

            this.questItem.content = this.itemContent
            if (this.questItem.type === '文本' || this.questItem.type === '单行文本') 
            {
                if (this.editIndex !== '')
                    this.form.questionList.splice(this.editIndex, 1, this.questItem)
                else
                    this.form.questionList.push(this.questItem);
            } else if (this.questItem.type == '单选' || this.questItem.type == '多选') 
            {
                // 单选
                for (var i = 0; i < this.itemText.length; i++) {
                    if (this.itemText[i] == '' || this.itemText[i] == undefined) {
                        this.$message('请完整输入每个选项内容');
                        return
                    }
                }

                this.questItem.textList = this.itemText;
                if (this.editIndex !== '')
                    this.form.questionList.splice(this.editIndex, 1, this.questItem)
                else
                    this.form.questionList.push(this.questItem);
            }

            this.clearItem()
        },
        // 编辑
        edit(item, editIndex) 
        {
            console.log(item);
            this.editIndex = editIndex

            this.showItem = true
            this.questItem = item
            this.itemContent = item.content
            if (item.type === '单选' || item.type === '多选') {
                this.num = item.textList.length
                this.itemText = []
                this.itemText.push(...item.textList)
            }
        },
        // 关闭弹窗，清空数据
        clearItem() {
            this.showItem = false
            this.num = 2
            this.itemContent = ''
            this.itemText = ['', '']
            this.questItem = {}
            this.editIndex = '';
        },
        // 判断上移、下移、删除
        handleItem(val, item) {
            switch (val) {
                case 'up':
                    this.moveUp(item);
                    break;
                case 'down':
                    this.moveDown(item);
                    break;
                case 'del':
                    this.$confirm('删除后将无法找回, 确认删除？', '确认删除', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(() => {
                        this.delItem(item)
                    })
                    break;
                default:
                    throw new Error("该操作不存在！")
            }
        },
        // 上移
        moveUp(item) {
            let index = this.form.questionList.indexOf(item)
            this.form.questionList.splice(index, 1)
            this.form.questionList.splice(index - 1, 0, item)
        },
        // 下移
        moveDown(item) {
            let index = this.form.questionList.indexOf(item)
            this.moveUp(this.form.questionList[index + 1])
        },
        // 删除
        delItem(item) {
            let index = this.form.questionList.indexOf(item)
            this.form.questionList.splice(index, 1)
        },
        // 提交
        onSubmit() {
            if (this.form.title == '') {
                this.$message('请输入标题内容');
                return
            }

            console.log(this.form);

            let survey = {};
            let questionList = [];
            survey.title = this.form.title;
            survey.description = this.form.description;

            let form_questionList = this.form.questionList;
            for (let i = 0; i < form_questionList.length; i++)
            {
                let cur_question = form_questionList[i];

                let optionList = [];
                if (cur_question.type === '单选' || cur_question.type === '多选')
                {
                    for (let j = 0; j < cur_question.textList.length; j++)
                    {
                        optionList.push({
                            content: cur_question.textList[j]
                        })   
                    }
                }   
                
                questionList.push({
                    content: cur_question.content,
                    type: cur_question.type,
                    optionList   
                })
            }
            survey.questionList = questionList;

            console.log(survey);
            ctSurveyUpdate(this.$route.params.id, survey).then((res) =>
            {
                if (res.status === 200)
                {
                    this.$alert('保存成功', '提示').then(() => {
                        window.history.back();
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.warp {
    display: flex;
    align-items: center;
}

.disabled {
    background: #F5F7FA;
}

input {
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    color: #606266;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    margin: 10px 0 0;
}

.el-radio {
    color: #606266;
    cursor: pointer;
    margin-right: 0;
}
</style>