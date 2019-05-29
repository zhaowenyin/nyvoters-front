<template>
<div class="register">
  <div class="content">
    <div class="out-input">
      <div class="label-width">
        <span class="dot">*</span>
        <span>姓名</span>
      </div>
      <input
        v-model="form.userName"
        placeholder="请填写姓名"
        class="input"/>
    </div>
    <div class="out-input">
      <div class="label-width">
        <span class="dot">*</span>
        <span>身份证号码</span>
      </div>
      <input
        :maxlength="18"
        v-model="form.idNum"
        placeholder="请填写身份证号码"
        class="input"/>
    </div>
    <div class="out-input">
      <div class="label-width">
        <span class="dot">*</span>
        <span>性别</span>
      </div>
      <Select
        class="input"
        placeholder="请选择性别"
        :options="[{value: '1',label: '男'},{value: '2',label: '女'}]"
        :multiple="false"
        :getItemLabel="(item)=>item.label"
        :getItemValue="(item)=>item.value"
        v-model="form.gender"/>
    </div>
    <div class="out-input">
      <div class="label-width">
        <span class="dot">*</span>
        <span>民族</span>
      </div>
      <Select
        class="input"
        :options="nationList"
        :multiple="false"
        placeholder="请选择民族"
        :getItemLabel="(item)=>item.desc"
        :getItemValue="(item)=>item.stringCode"
        v-model="form.nation"/>
    </div>
    <div class="out-input">
      <div class="label-width">
        <span class="dot">*</span>
        <span>手机号</span>
      </div>
      <input
        v-model="form.phoneNum"
        :maxlength="11"
        placeholder="请填写手机号"
        class="input"/>
    </div>
    <div class="out-input">
      <div class="label-width">
        <!-- <span class="dot">*</span> -->
        <span>联系方式</span>
      </div>
      <input
        v-model="form.contactInformation"
        placeholder="请填写联系方式"
        class="input"/>
    </div>
    <div class="out-input">
      <div class="label-width">
        <span class="dot">*</span>
        <span>户籍地</span>
      </div>
      <input
        v-model="form.householdRegistration"
        placeholder="请填写户籍地"
        class="input"/>
    </div>
    <div class="out-input">
      <div class="label-width">
        <span class="dot">*</span>
        <span>现居住地</span>
      </div>
      <input
        v-model="form.living"
        placeholder="请填写现居住地"
        class="input"/>
    </div>
    <div class="out-input">
      <div class="label-width">
        <span class="dot">*</span>
        <span>参选地类型</span>
      </div>
      <Select
        class="input"
        :options="candidateTypeList"
        :multiple="false"
        placeholder="请选择参选地类型"
        v-model="form.candidateType"
        :getItemLabel="(item)=>item.label"
        :getItemValue="(item)=>item.value"/>
    </div>
  </div>
  <ul class="button">
    <li @click="cancel" class="btn cancel">取消</li>
    <li @click="comfire" class="btn comfire">提交</li>
  </ul>
</div>
</template>
<script>
import { Toast } from 'mint-ui'
import Select from '../../components/Select'
import { mapState, mapMutations, mapActions } from 'vuex'
import {candidateTypeList} from '../../common-data/confiig.js'
export default {
  data () {
    return {
      form: {
        userName: '',
        idNum: '',
        householdRegistration: '',
        living: '',
        candidateType: '',
        nation: '',
        gender: '',
        phoneNum: '',
        contactInformation: '',
        type: 1
      },
      error: '',
      candidateTypeList
    }
  },
  components: {
    Select
  },
  computed: {
    ...mapState('register', {

    }),
    ...mapState('commonData', {
      nationList: state => state.nationList,
    })
  },
  created () {
    this.searchnation()
  },
  methods: {
    ...mapMutations('register', [
      'clearState',
      'saveForm'
    ]),
    ...mapActions('register', [
      'submitForm'
    ]),
    ...mapActions('commonData', [
      'searchnation'
    ]),
    cancel () {
      this.$router.push({path:'/'})
    },
    comfire (){
      if (!this.verify()) {
        Toast({
          message: this.error,
          position: 'top',
          duration: 3000
        })
        return
      }
      this.saveForm(this.form)
      this.$router.push({path:'/comfire'})
    },
    verify() {
      if(!this.form.userName) {
        this.error = '请填写用户名'
        return false
      }
      if(!this.form.idNum) {
        this.error = '请填写身份证号'
        return false
      }
      if(!this.form.gender) {
        this.error = '请选择性别'
        return false
      }
      if(!this.form.nation) {
        this.error = '请选择民族'
        return false
      }
      if(!this.form.phoneNum) {
        this.error = '请填写手机号'
        return false
      }

      if(!this.form.householdRegistration) {
        this.error = '请填写户籍地'
        return false
      }
      if(!this.form.living) {
        this.error = '请填写现居住地'
        return false
      }
      if(!this.form.candidateType === '') {
        this.error = '请选择参选地类型'
        return false
      }
      return true
    }
  }
}
</script>
<style scoped>
  .register {
    width:100%;
    height: 100%;
    padding: 20px 0 0px 0;
    display: flex;
    flex-direction: column;
  }
  .content {
    flex: 1;
    overflow: auto;
  }
  .dot {
    color: #d41c1a;
  }
  .button {
    display: flex;
    padding: 0px 14px 31px 14px;
  }
  .btn {
    width: 155px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .cancel {
    background-color: #ffffff;
    border-radius: 2px;
    border: solid 0.5px #bbbbbb;
    color: #666666;
    font-size: 15px;
    margin-right: 37px;
  }
  .comfire {
    background-color: #d41c1a;
  border-radius: 2px;
   color: #fff;
  }
  .out-input {
    padding: 0px 15px 0px 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;

    & .label-width {
      width: 86px;
      text-align:right;
      font-size: 15px;
    }
    & .input {
      flex:1;
      display: flex;
      align-items: center;
      min-height: 61px;
      margin-left: 17px;
      font-size: 15px;
    }
  }


</style>
