<template>
  <div>
    <el-dialog
      class="qual"
      v-loading="loading"
      title="资料补充"
      :visible="visible"
      width="90%"
      :before-close="comfirmClose">
      <el-form
        label-width="80px"
        :model="form"
        :rules="rules"
        ref="form"
        class="login-form">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
              label="姓名"
              prop="userName">
              <el-input
                size="medium"
                placeholder="请输入姓名"
                class="item"
                v-model="form.userName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="性别"
              prop="gender">
              <el-radio-group size="medium" v-model="form.gender">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="出生日期"
              prop="birthDay">
              <el-date-picker
                class="item"
                v-model="form.birthDay"
                type="date"
                placeholder="请选择">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label=" 民族"
              prop="nation">
              <el-select
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
          <el-col :span="8">
            <el-form-item
              label="籍贯"
              prop="nativePlace">
              <el-input
                size="medium"
                placeholder="请输入籍贯"
                class="item"
                v-model="form.nativePlace" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="出生地"
              prop="birthPlace">
              <el-input
                size="medium"
                placeholder="请输入出生地"
                class="item"
                v-model="form.birthPlace" />
            </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item
              label="党派"
              prop="party">
              <el-select
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
          <el-col :span="8">
            <el-form-item
              label="入党时间"
              prop="joinPartyTime">
              <el-date-picker
              class="item"
                v-model="form.joinPartyTime"
                type="date"
                placeholder="请选择">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="担任党派职务"
              prop="partyPost">
              <!-- <el-select
                size="medium"
                style="width: 100%;"
                class="item"
                v-model="form.partyPost"
                clearable placeholder="请选择">
                <el-option
                  v-for="item in postList"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select> -->
                <el-input
                size="medium"
                placeholder="请输入担任党派职务"
                class="item"
                v-model="form.partyPost" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="参加工作日期"
              prop="workTime">
              <el-date-picker
                class="item"
                v-model="form.workTime"
                type="date"
                placeholder="请选择参加工作日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item
              label="身份证号码"
              prop="idNum">
              <el-input
                size="medium"
                placeholder="请输入"
                :maxlength="18"
                v-model="form.idNum" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="全日制教育"
              prop="fullTimeEducation">
              <el-input
                size="medium"
                placeholder="请输入"
                v-model="form.fullTimeEducation" />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item
              label="毕业院校系及专业"
              prop="fteGraduatedInstitution">
              <el-input
                size="medium"
                placeholder="请输入"
                v-model="form.fteGraduatedInstitution" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="在职教育"
              prop="inServiceEducation">
              <el-input
                size="medium"
                placeholder="请输入"
                v-model="form.inServiceEducation" />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item
              label="毕业院校系及专业"
              prop="iseGraduatedInstitution">
              <el-input
                size="medium"
                placeholder="请输入"
                v-model="form.iseGraduatedInstitution" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="工作单位"
              prop="workUnit">
              <el-input
                size="medium"
                placeholder="请输入"
                v-model="form.workUnit" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="职务"
              prop="post">
              <el-select
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
          <el-col :span="8">
            <el-form-item
              label="职称"
              prop="jobTitle">
              <el-input
                size="medium"
                placeholder="请输入"
                v-model="form.jobTitle" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="代表阶层"
              prop="repreClass">
              <el-input
                size="medium"
                placeholder="请输入"
                v-model="form.repreClass" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="同任何级人大代表"
              prop="withRepreAnyLevel">
              <el-input
                size="medium"
                placeholder="请输入"
                v-model="form.withRepreAnyLevel" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="同任何级政协委员"
              prop="withAnyMemberCppcc">
              <el-input
                size="medium"
                placeholder="请输入"
                v-model="form.withAnyMemberCppcc" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="工作简历"
          prop="resume">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入"
            class="item"
            v-model="form.resume" />
        </el-form-item>
        <el-form-item
          label="主要表现"
          prop="mainPerformance">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入"
            class="item"
            v-model="form.mainPerformance" />
        </el-form-item>
        <el-form-item
          label="获奖励及荣誉称号情况"
          prop="awardsHonors">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入"
            class="item"
            v-model="form.awardsHonors" />
        </el-form-item>
        <el-form-item
          label="历任代表情况"
          prop="succession">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入"
            class="item"
            v-model="form.succession" />
        </el-form-item>
        <el-form-item
          label="推荐理由"
          prop="recommendReason">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入"
            class="item"
            v-model="form.recommendReason" />
        </el-form-item>
        <el-form-item
          label="提名推荐人签名"
          prop="nominateRecommenderSignature">
           <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入"
            class="item"
            v-model="form.nominateRecommenderSignature" />
        </el-form-item>
        <el-form-item
          label="审查意见"
          prop="reviewOpinion">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入"
            class="item"
            v-model="form.reviewOpinion" />
        </el-form-item>
         <el-row :gutter="20">
          <el-col :span="16">
             <el-form-item
              label="通信地址"
              prop="contactAddress">
              <el-input
                placeholder="请输入"
                class="item"
                v-model="form.contactAddress" />
            </el-form-item>
          </el-col>
           <el-col :span="8">
              <el-form-item
              label="联系方式"
              prop="contactInformation">
              <el-input
                placeholder="请输入"
                class="item"
                v-model="form.contactInformation" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item
          label="备注"
          prop="remarks">
          <el-input
          type="textarea"
          :rows="2"
            placeholder="请输入"
            class="item"
            v-model="form.remarks" />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="footer">
        <el-button
          @click="submitForm()"
          size="medium"
          :loading="loading"
          type="primary">确定</el-button>
          <el-button
          @click="comfirmClose()"
          size="medium">取消</el-button>
      </div>
    </el-dialog>
    <Sign
      v-if="toast"
      :url='form.nominateRecommenderSignature'
      :toast.sync="toast"
      @saveSign="saveSign"/>
 </div>
</template>
<script>
import {setSubmit,getDetail} from './service.js'
import Sign from './sign'
import { mapActions,mapState } from 'vuex'
import {partyList,postList} from '../../../common-data/config.js'
export default {
  data () {
    return {
      loading: false,
      form: {
        userName: '',
        gender: '',
        birthDay: '',
        nation: '',
        nativePlace: '',
        birthPlace: '',
        party: '',
        joinPartyTime: '',
        partyPost: '',
        workTime: '',
        idNum: '',
        fullTimeEducation: '',
        fteGraduatedInstitution: '',
        inServiceEducation: '',
        iseGraduatedInstitution: '',
        workUnit: '',
        post: '',
        jobTitle: '',
        repreClass: '',
        withRepreAnyLevel: '',
        withAnyMemberCppcc: '',
        resume: '',
        mainPerformance: '',
        awardsHonors: '',
        succession: '',
        recommendReason: '',
        nominateRecommenderSignature: '',
        reviewOpinion: '',
        contactAddress: '',
        contactInformation: '',
        remarks: ''
      },
      multipleSelection: [],
      rules: {
        userName: [
          { required: true, message: '请输入姓名！', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别！', trigger: 'change' }
        ],
        nation: [
          { required: true, message: '请选择民族！', trigger: 'blur' }
        ],
        birthDay: [
          { required: true, message: '请选择出生日期！', trigger: 'change' }
        ],
      },
      partyList,
      postList,
      toast: false,
    }

  },
  props:{
    visible: {
      default: false,
      type: Boolean
    },
    item: {
      default: () => {},
      type: Object
    }
  },
  components: {
    Sign
  },
  computed: {
    ...mapState('commonData', {
      nationList: state => state.nationList,
    })
  },
  created () {
    this.getDetail()
    this.searchnation()

  },
  methods: {
    ...mapActions('commonData', [
      'searchnation'
    ]),
    ...mapActions('qualReview', [
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
      this.loading = true
      await setSubmit(this.handerParams())
      this.close()
      this.getListData()
      this.loading = false
    },
    comfirmClose () {
      this.$confirm('关闭将丢失已编辑的内容，确认关闭？')
        .then(() => {
          this.close()
        })
        .catch(() => {})
    },
    handerParams () {
      let params = {...this.form}
      if(params.birthDay&&params.birthDay !==null) {
        params.birthDay = new Date(params.birthDay).getTime()
      }
      if(params.workTime&&params.workTime !==null) {
        params.workTime = new Date(params.workTime).getTime()
      }
      if(params.joinPartyTime&&params.joinPartyTime !==null) {
        params.joinPartyTime = new Date(params.joinPartyTime).getTime()
      }
      return params
    },
    saveSign (val) {
      this.form.nominateRecommenderSignature = val.png
      this.toast = false
    },
    select () {
      this.toast = true
    },
    async getDetail () {
      const {data} = await getDetail({id: this.item.id})
      this.form = {...this.form, ...data.content}
    }
  },

}
</script>
<style scoped>
.left {
  margin: 10px 0;
}
.item {
  width: 100%;
}

</style>
<style>
  .qual .el-form-item__label {
    line-height: 18px;
    display: block;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 40px;
}
</style>
