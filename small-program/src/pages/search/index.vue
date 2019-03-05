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
        v-model="form.idNum"
        placeholder="请填写身份证号码"
        class="input"/>
    </div>
    <div class="valid">
      <div class="label-width">
        <span>有效验证码</span>
      </div>
      <div class="out-img"><img class="img" src="../../assets/img/code.png"/></div>
      <div class="change" @click="change">换一张</div>
    </div>
    <div class="out-input">
      <div class="label-width">
        <span class="dot">*</span>
        <span>验证码</span>
      </div>
      <input
        v-model="form.valid"
        placeholder="请输入验证码"
        class="input"/>
    </div>
  </div>
  <ul class="button">
    <li @click="cancel" class="btn cancel">取消</li>
    <li @click="comfire" class="btn comfire">查询</li>
  </ul>
</div>

</template>
<script>
import { Toast,Indicator } from 'mint-ui'
import {searchSubmit} from './service.js'
export default {
  data () {
    return {
      form: {
        userName: '',
        idNum: '',
        valid: '',
        type: 1
      },
      error: '',
      loading: false
    }
  },
  components: {

  },
  watch: {
    loading (val) {
      val ? Indicator.open() : Indicator.close()
    }
  },
  methods: {
    cancel () {
      this.$router.push({path:'/'})
    },
    comfire () {
      if (!this.verify()) {
        Toast({
          message: this.error,
          position: 'top',
          duration: 3000
        })
        return
      }
      this.submitSearch()

    },
    change(){

    },
    async submitSearch() {
      this.loading = true
      const {data} = await searchSubmit(this.form)
      this.$router.push({path:'/success',query: {type: 2, id: data.id}})
      this.loading = false
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
      if(!this.form.valid) {
        this.error = '请输入验证码'
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
    padding-top: 20px 0px;
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
    & .input {
      flex:1;
      min-height: 61px;
      font-size: 15px;
    }
  }
  .label-width {
    width: 86px;
    text-align:right;
    font-size: 15px;
    margin-right: 17px;
  }
 .change {
    font-size: 15px;
    color: #333;
    cursor: pointer;
    margin-left: 17px;
  }
  .valid {
    padding: 12px 15px 12px 10px;
    display: flex;
    align-items: center;
  }
.out-img {
  width: 96px;
  height: 45px;
  & .img {
    width: 100%;
    height: 100%;
  }

}

</style>
