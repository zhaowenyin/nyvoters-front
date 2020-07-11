<template>
<div class="register">
  <div class="content">
    <div class="out-input">
      <div class="label-width">
        <span class="dot">*</span>
        <span>姓名</span>
      </div>
      <input
        @blur="blur"
        v-model.trim="form.userName"
        placeholder="请填写姓名"
        :maxlength="20"
        class="input"/>
    </div>
    <div class="out-input">
      <div class="label-width">
        <span class="dot">*</span>
        <span>身份证号码</span>
      </div>
      <input
        @blur="blurCard"
        :maxlength="18"
        v-model.trim="form.idNum"
        placeholder="请填写身份证号码"
        class="input"/>
    </div>
    <div class="out-input">
      <div class="label-width">
        <span class="dot">*</span>
        <span>性别</span>
      </div>
      <mt-radio
        class="g-radio"
        v-model="form.gender"
        :options="[{value: '2',label: '女',disabled:true},{value: '1',label: '男',disabled:true}]">
      </mt-radio>
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
        v-model.trim="form.phoneNum"
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
        v-model.trim="form.contactInformation"
        placeholder="请填写联系方式"
        class="input"/>
    </div>
    <div class="out-input">
      <div class="label-width">
        <span class="dot">*</span>
        <span>户籍地</span>
      </div>
      <input
        @blur="blur"
        @input="housechange"
        v-model.trim="form.householdRegistration"
        placeholder="请填写户籍地"
        class="input"/>
    </div>
    <div class="out-input">
      <div class="label-width">
        <span>户籍详细</span>
      </div>
      <input
        @blur="blur"
        v-model.trim="form.householdRegistrationDetail"
        @input="detailchange"
        placeholder="请填写户籍详细地址"
        class="input"/>
    </div>
    <div class="out-input">
      <div class="label-width">
        <span class="dot">*</span>
        <span>现居住地</span>
      </div>
      <input
        v-model="form.living"
        @input="livingChange"
        placeholder="请填写现居住地"
        class="input"/>
    </div>
    <div class="out-input">
      <div class="label-width">
        <span>现居详细</span>
      </div>
      <input
        v-model="form.livingDetail"
        @input="livingDetailChange"
        placeholder="请填写现居住详细地址"
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
        @change="change"
        placeholder="请选择参选地类型"
        v-model="form.candidateType"
        :getItemLabel="(item)=>item.label"
        :getItemValue="(item)=>item.value"/>
    </div>
    <div class="out-input" v-if="+form.candidateType !== 0">
      <div class="label-width">
        <span class="dot">*</span>
        <span>持资格转移证明</span>
      </div>
      <Select
        class="input"
        :options="list"
        :multiple="false"
        placeholder="请选择持资格转移证明"
        v-model="form.isProve"
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
import {resolveBug,cardVali} from '../../utils/format'
export default {
  data () {
    return {
      form: {
        userName: '',
        idNum: '',
        householdRegistration: '',
        householdRegistrationDetail: '',
        living: '',
        livingDetail: '',
        candidateType: '',
        nation: '',
        phoneNum: '',
        contactInformation: '',
        type: 2,
        isProve: ''
      },
      error: '',
      candidateTypeList,
      timer: null,
      list: [{
        value: 0,
        label: '否'
      },{
        value: 1,
        label: '是'
      }],
      livingDetail: false,
      living: false
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
  destroyed() {
    clearTimeout(this.timer)
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
    change() {
      this.form.isProve=""
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
      if(cardVali(this.form.idNum).status !== 1) {
        this.error = this.cardVali(this.form.idNum).message
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
      if(this.form.candidateType === '') {
        this.error = '请选择参选地类型'
        return false
      }
      if(this.form.isProve === ''&& +this.form.candidateType===1) {
        this.error = '请选择持资格转移证明'
        return false
      }
      return true
    },
    blur () {
      clearTimeout(this.timer)
      this.timer=setTimeout(function(){
        resolveBug()
      },10)
    },
    blurCard () {
      if(cardVali(this.form.idNum).status !== 1) {
        this.form.gender = '2'
        this.error = this.cardVali(this.form.idNum).message
        Toast({
          message: this.error,
          position: 'top',
          duration: 3000
        })
        return false
      }
      //18位身份证取倒数第二位，15位身份证取最后一位
      let genderVal = 0;
      let value = this.form.idNum;
      if(value.length === 18){
        genderVal = value.substring(value.length-2, value.length-1)
      } else {
        genderVal = value.substring(value.length-1, value.length)
      }
      if (genderVal % 2 === 0) {
        //女
        this.form.gender = '2'
      }else{
        //男
        this.form.gender = '1'
      }
    },
    cardVali,
    housechange () {
      if(!this.living) {
        this.$nextTick(() => {
          console.log(this.form.householdRegistration)
          this.form.living = this.form.householdRegistration
        })
      }
    },
    detailchange() {
      if(!this.livingDetail) {
        this.$nextTick(() => {
          console.log(this.form.householdRegistrationDetail)
          this.form.livingDetail = this.form.householdRegistrationDetail
        })
      }

    },
    livingChange () {
      this.living = true
    },
    livingDetailChange () {
      this.livingDetail = true
    }
  }
}
</script>
<style>
  .g-radio .mint-cell{
    display: inline-block;
    margin-top: -2px;
  }
  .g-radio .mint-cell-wrapper, .g-radio .mint-cell{
    background: none;
  }
</style>
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
