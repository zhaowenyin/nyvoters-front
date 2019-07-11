<template>
  <div>
    <el-dialog
      :title="item.id? '修改' : '登记'"
      :visible="visible"
      width="820px"
      :before-close="comfirmClose">
      <el-form
        label-width="110px"
        :model="form"
        :rules="rules"
        ref="form"
       class="table-obj">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="推荐方式"
              prop="recommendType">
              <el-radio-group
                @change="change"
                :disabled="isDisabled"
                size="medium"
                v-model="form.recommendType">
                <el-radio :label="'1'">团体推荐</el-radio>
                <el-radio :label="'2'">选民联名推荐</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="类型"
              prop="type">
              <el-radio-group size="medium" v-model="form.type">
                <el-radio :label="'1'" :disabled="form.recommendType==='2'&&isDisabled">区县代表</el-radio>
                <el-radio :label="'2'" :disabled="form.recommendType==='2'&&isDisabled">乡镇代表</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="所选区域"
              prop="belongAreaId">
              <DistrictSelect
                :multiple="false"
                :disabled="isDisabled"
                v-model="form.belongAreaId"
                :item='item'
                :data="data"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item
              label="被推选人"
              prop="recommendedPersonId">
               <el-select
               :disabled="isDisabled"
                filterable
                allow-create
                size="medium"
                style="width: 100%;"
                class="item"
                @change="personChange"
                v-model="form.recommendedPersonId"
                clearable placeholder="请选择">
                <el-option
                  v-for="item in recommendedPersonList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="身份证号码"
              :disabled="isDisabled"
              prop="idNum">
              <el-input
                size="medium"
                placeholder="请输入"
                :maxlength="18"
                class="item"
                v-model="form.idNum" />
            </el-form-item>
          </el-col>
            <el-col :span="12">
            <el-form-item
              label="手机号码"
              prop="phoneNum">
              <el-input
               :disabled="isDisabled"
                size="medium"
                placeholder="请输入"
                :maxlength="11"
                class="item"
                v-model="form.phoneNum" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="出生日期"
                prop="birthDay">
                <el-date-picker
                  :disabled="isDisabled"
                  style="width: 100%;"
                  v-model="form.birthDay"
                  type="date"
                  placeholder="请选择">
                </el-date-picker>
              </el-form-item>
            </el-col>

          <el-col :span="12">
            <el-form-item
              label="性别："
              prop="gender">
              <el-radio-group :disabled="isDisabled" size="medium" v-model="form.gender">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label=" 民族："
              prop="nation">
              <el-select
                :disabled="isDisabled"
                size="medium"
                style="width: 100%;"
                class="item"
                v-model="form.nation"
                clearable placeholder="请选择">
                <el-option
                  v-for="(item, key) in nationList"
                  :key="key"
                  :label="item.desc"
                  :value="item.stringCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="学历"
              prop="education">
              <el-select
                :disabled="isDisabled"
                size="medium"
                style="width: 100%;"
                class="item"
                v-model="form.education"
                clearable placeholder="请选择">
                <el-option
                  v-for="(item, key) in educationList"
                  :key="key"
                  :label="item"
                  :value="key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="党派"
              prop="party">
              <el-select
                :disabled="isDisabled"
                size="medium"
                style="width: 100%;"
                class="item"
                v-model="form.party"
                clearable placeholder="请选择">
                <el-option
                  v-for="(item, key) in partyList"
                  :key="key"
                  :label="item"
                  :value="key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="职务"
              prop="education">
              <el-select
                :disabled="isDisabled"
                size="medium"
                style="width: 100%;"
                class="item"
                v-model="form.post"
                clearable placeholder="请选择">
                <el-option
                  v-for="(item, key) in postList"
                  :key="key"
                  :label="item"
                  :value="key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="工作单位"
              prop="workUnit">
              <el-input
                :disabled="isDisabled"
                size="medium"
                placeholder="请输入"
                class="item"
                v-model="form.workUnit" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="职称"
              prop="jobTitle">
              <el-input
                :disabled="isDisabled"
                size="medium"
                placeholder="请输入"
                class="item"
                v-model="form.jobTitle" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="推荐理由"
          prop="recommendReason">
          <el-input
            :disabled="isDisabled"
            size="medium"
            placeholder="请输入"
            class="item"
            v-model="form.recommendReason" />
        </el-form-item>
        <el-form-item
          v-if="form.recommendType==='1'"
          label="推荐单位"
          prop="recommendUnit">
          <el-input
            :disabled="isDisabled"
            placeholder="请输入"
            class="item"
            v-model="form.recommendUnit" />
        </el-form-item>
      </el-form>
      <el-form
        v-if="form.recommendType==='2'"
        label-width="0"
        :model="tableObj"
        :rules="tableRules"
        ref="tableObj"
        class="innerobj"
        >
          <div class="left">
            <el-button size="medium" @click="create" type="primary" icon="el-icon-circle-plus-outline">添加</el-button>
            <el-button size="medium" @click="deleteI" type="primary" icon="el-icon-delete">删除</el-button>
          </div>
          <el-table
            @selection-change="handleSelectionChange"
            :data="list"
            class="add_table">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
            label="推荐人姓名">
              <template slot-scope="scope">
                <el-form-item
                  prop="recommendPersonName">
                    <el-input
                    :disabled="isDisabled"
                    v-if="!scope.row.recommendPersonName"
                    size="medium"
                    placeholder="请输入"
                    class="item"
                    v-model="tableObj.recommendPersonName" />
                  <div v-else>{{scope.row.recommendPersonName}}</div>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
            label="推荐人手机">
              <template slot-scope="scope">
                <el-form-item
                prop="recommendPersonPhone">
                  <el-input
                    :disabled="isDisabled"
                    v-if="!scope.row.recommendPersonPhone"
                    size="medium"
                    placeholder="请输入"
                    class="item"
                    v-model="tableObj.recommendPersonPhone" />
                  <div v-else>{{scope.row.recommendPersonPhone}}</div>
                </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="推荐人工作单位">
            <template slot-scope="scope">
              <el-form-item
                prop="recommendPersonWorkUnit">
                <el-input
                  :disabled="isDisabled"
                  v-if="!scope.row.recommendPersonWorkUnit"
                  size="medium"
                  placeholder="请输入"
                  class="item"
                  v-model="tableObj.recommendPersonWorkUnit" />
                <div v-else>{{scope.row.recommendPersonWorkUnit}}</div>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    <div
      slot="footer"
      class="footer">
      <el-button
        v-if="!isDisabled"
        @click="submitForm()"
        size="medium"
        :loading="loading"
        type="primary">确定</el-button>
        <el-button
          v-if="!isDisabled"
          @click="comfirmClose()"
          size="medium">取消</el-button>
         <el-button
          type="primary"
          v-if="isDisabled"
          @click="comfirmClose()"
          size="medium">确定</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
import {setSubmit,getTree,getPeople,getDetail,modifySubmit} from './service.js'
import { mapActions,mapState } from 'vuex'
import DistrictSelect from '../../../components/DistrictSelect'
import {educationList, postList,partyList} from '../../../common-data/config.js'
import {cardVali} from '../../../utils/format'
export default {
  data () {
    let validate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else {
        if (!/^1[34578]\d{9}$/.test(value)) {
          callback(new Error('请输入正确手机号'))
        }
        callback()
      }
    }
    const validate1 = (rule, value, callback) => {
      let val = this.cardVali(value)
      if (val.status !== 1) {
        callback(new Error(val.message))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: {
        recommendType: '1',
        type: '',
        belongAreaId: '',
        idNum: '',
        recommendedPersonId: '',
        recommendedPerson: '',
        phoneNum: '',
        birthDay: '',
        gender: '',
        nation: '',
        education: '',
        party:'',
        post: '',
        workUnit: '',
        jobTitle: '',
        recommendReason: '',
        recommendUnit: '',
        recommendPersonList: [],
      },
      tableObj: {
        "recommendPersonName": "",
        "recommendPersonPhone": null,
        "recommendPersonWorkUnit": ""
      },
      tableRules: {
        recommendPersonName: [
          { required: true, message: '请输入推荐人姓名！', trigger: 'blur' }
        ],
        recommendPersonPhone:  [
          { required: true, message: '请输入推荐人手机！', trigger: 'blur' }
        ],
        recommendPersonWorkUnit: [
          { required: true, message: '请输入推荐人工作单位！', trigger: 'blur' }
        ],
      },
      multipleSelection: [],
      rules: {
        recommendType: [
          { required: true, message: '请选择推荐方式！', trigger: 'change' }
        ],
        type:  [
          { required: true, message: '请选择类型！', trigger: 'change' }
        ],
        belongAreaId: [
          { required: true, message: '请选择被推荐人！', trigger: 'blur' }
        ],
        idNum: [
          { validator: validate1, required: true, trigger: 'blur' }
        ],
        nation: [
          { required: true, message: '请选择民族', trigger: 'change' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        phoneNum: [
          { required: true,  validator: validate, trigger: 'blur' }
        ],
        birthDay: [
          { required: true, message: '请选择出生日期', trigger: 'change' }
        ],
        recommendedPersonId:[
          { required: true, message: '请选择出生日期', trigger: 'change' }
        ]
      },
      educationList,
      recommendedPersonList: [],
      partyList,
      postList,
      list: [{}],
      createDialogVisible: false,
      data: []
    }

  },
  computed: {
    ...mapState('commonData', {
      nationList: state => state.nationList,
      belongAreaId: state => state.belongAreaId
    })
  },
  components: {
    DistrictSelect
  },
  props:{
    visible: {
      default: false,
      type: Boolean
    },
    item: {
      default: () => {},
      type: Object
    },
    isDisabled: {
      default: false,
      type: Boolean
    }
  },
  created () {
    if(this.item.id){
      this.getDetail()
    }

    this.searchnation()
    this.searchTree({type: 0, id: ''})
    this.searchPeople({statusList: [1,7],precinctId: this.belongAreaId})
  },
  methods: {
    ...mapActions('commonData', [
      'searchnation',
    ]),
    ...mapActions('behalfCommended', [
      'getListData'
    ]),
    close () {
      this.$emit('update:visible', false)
    },
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.sumitData()
        }
      })
    },
    async sumitData () {
      try {
        this.loading = true
        let data1 = {}
        if(this.item.id) {
          const {data} = await modifySubmit(this.handerparam())
          data1 = data
        } else {
          const {data} = await setSubmit(this.handerparam())
          data1 = data
        }
        if(data1.content) {
          this.$notify({
            title: '',
            message: '保存成功！',
            type: 'success'
          });
          this.getListData()
          this.close()
        } else {
          this.$notify({
            title: '',
            message: data1.message,
            type: 'error'
          });
        }

      } catch (error) {
        console.log(error)
      }finally{
        this.loading = false
      }


    },
    handerparam() {
      let params = {...this.form}
      if  (params.birthDay !== null && params.birthDay!==0){
        params.birthDay = new Date(params.birthDay).getTime()
      }
      return params
    },
    async searchPeople (val) {
      const {data} = await getPeople(val)
      this.recommendedPersonList = data.content.data
    },
    comfirmClose () {
      this.close()
    },
    change (val) {
      if(val==='2') {
        this.form.type = '2'
      }

    },
    personChange (val) {
      for(let i of this.recommendedPersonList) {
        if(val === i.id) {
          this.form.phoneNum = i.phoneNum
          this.form.birthDay = i.birthDay || null
          this.form.nation = i.nation
          this.form.belongAreaId = i.precinctId
          this.form.gender = i.gender
          this.form.idNum = i.idNum
          this.form.recommendedPerson = i.name
          break
        }
      }
    },
    create () {
      this.$refs.tableObj.validate((valid) => {
        if (valid) {
          for(let i of this.list) {
            if(i.recommendPersonPhone === this.tableObj.recommendPersonPhone) {
              this.$notify({
                title: '',
                message: '已经添加重复推荐人',
                type: 'warning'
              })
              return
            }
          }

          this.list.unshift(this.tableObj)
          this.tableObj = {
            "recommendPersonName": "",
            "recommendPersonPhone": null,
            "recommendPersonWorkUnit": ""
          }
          let list  = JSON.parse(JSON.stringify(this.list))
          for(let i of list) {
            if (i.recommendPersonName) {
              this.form.recommendPersonList.push(i)
            }
          }
        }
      })

    },
    deleteI () {
      if(this.multipleSelection.length === 0) {
        this.$notify({
          title: '',
          message: '请选择数据后再删除！',
          type: 'warning'
        });
        return
      }
      this.tableObj = {
        "recommendPersonName": "",
        "recommendPersonPhone": null,
        "recommendPersonWorkUnit": ""
      }
      let list  = JSON.parse(JSON.stringify(this.list))
      this.list = list.filter(i => {
        let isI = false
        for(let obj of this.multipleSelection) {
          if(obj.recommendPersonPhone&&(!obj.recommendPersonPhone===i.recommendPersonPhone)) {
            isI = true
          }
        }
        if(!i.recommendPersonPhone) {
          isI = true
        }
        return isI
      })
      for(let i of this.list) {
        if (i.recommendPersonName) {
          this.form.recommendPersonList.push(i)
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    select () {
      this.createDialogVisible = true
    },
    async searchTree (val) {
      const{data} = await getTree(val)
      this.data = [data.content]
    },
    async getDetail () {
      const {data} = await getDetail({id: this.item.id})
      this.form = {...this.form, ...data.content}
    },
    cardVali
  }

}

</script>
<style scoped>
.left {
  margin: 10px 0;
}
</style>
<style>
  .innerobj .el-form-item {
    margin-bottom: 15px;
    margin-top: 15px;
  }
</style>
