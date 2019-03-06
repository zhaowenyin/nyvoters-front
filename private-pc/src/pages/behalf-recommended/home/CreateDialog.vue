<template>
  <el-dialog
    title="在线登记"
    :visible="visible"
    width="820px"
    :before-close="comfirmClose">
      <el-form
        label-width="110px"
        :model="form"
        :rules="rules"
        ref="form"
        class="login-form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="姓名："
              prop="userName">
              <el-input
                size="medium"
                placeholder="请输入户姓名"
                class="item"
                v-model="form.userName" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="身份证号码："
                prop="idNum">
                <el-input
                  size="medium"
                  placeholder="请输入身份证号码"
                  :maxlength="18"
                  class="item"
                  v-model="form.idNum" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item
              label="性别："
              prop="gender">
              <el-radio-group size="medium" v-model="form.gender">
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
               size="medium"
                style="width: 100%;"
                class="item"
                v-model="form.nation"
                clearable placeholder="请选择民族">
                <el-option
                  v-for="item in nationList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item
              label=" 手机号："
              prop="phoneNum">
              <el-input
                size="medium"
                placeholder="请输入电话号码"
                class="item"
                v-model="form.phoneNum" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item
              label="联系方式："
              prop="phoneNum">
              <el-input
                size="medium"
                placeholder="请输入联系方式"
                class="item"
                v-model="form.contactInformation" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="户籍地："
          prop="householdRegistration">
          <el-input
            size="medium"
            placeholder="请输入户籍地"
            class="item"
            v-model="form.householdRegistration" />
        </el-form-item>
        <el-form-item
          label="现居住地："
          prop="living">
          <el-input
            placeholder="请输入现居住地"
            class="item"
            v-model="form.living" />
        </el-form-item>
         <el-form-item
          label="参选地类型："
          prop="candidateType">
          <el-select
            class="item"
            v-model="form.candidateType"
            clearable placeholder="请选择参选地类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    <div
      slot="footer"
      class="footer">
      <el-button
        @click="submitForm()"
        size="medium"
        type="primary">确定</el-button>
        <el-button
        @click="comfirmClose()"
        size="medium">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      form: {
        userName: '',
        idNum: '',
        householdRegistration: '',
        living: '',
        valid: '',
        candidateType: '',
        nation: '',
        gender: '',
        phoneNum: '',
        contactInformation: '',
        type: 1
      },
      rules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        idNum: [
          { required: true, message: '请输入身份证号', trigger: 'blur' }
        ],
        nation: [
          { required: true, message: '请选择民族', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        phoneNum: [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
        ],
        householdRegistration: [
          { required: true, message: '请输入户籍地', trigger: 'blur' }
        ],
        living: [
          { required: true, message: '请输入现居住地', trigger: 'blur' }
        ],
        valid: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        candidateType: [
          { required: true, message: '请输入参选地址类型', trigger: 'blur' }
        ]
      },
      options: [{
        value: '1',
        label: '居住地'
      }, {
        value: '2',
        label: '外地'
      }],
      nationList: [{
        value: '1',
        label: '居住地'
      }, {
        value: '2',
        label: '外地'
      }]
    }
  },
  props:{
    visible: {
      default: false,
      type: Boolean
    }
  },
  created () {
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(valid)
        }
      })
    },
    comfirmClose () {
      this.$confirm('关闭将丢失已编辑的内容，确认关闭？')
        .then(() => {
          this.close()
        })
        .catch(() => {})
    }
  }

}
</script>
<style scoped>

</style>
