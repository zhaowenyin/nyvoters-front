<template>
<div class="register">
   <div class="valid">
    <div class="label-width">
      <span>有效验证码</span>
    </div>
    <div class="out-img"><img class="img" :src="captchaImg"/></div>
    <div class="change" @click="change">换一张</div>
  </div>
   <div class="out-input">
    <div class="label-width">
      <!-- <span class="dot">*</span> -->
      <span>验证码</span>
    </div>
    <input
      @blur="blur"
      v-model.trim="form.captcha"
      placeholder="请输入验证码"
      class="input"/>
  </div>
  <ul class="button">
    <li @click="cancel" class="btn cancel">取消</li>
    <li @click="comfire" class="btn comfire">提交</li>
  </ul>
</div>

</template>
<script>
import { Toast,Indicator } from 'mint-ui'
import { mapState, mapMutations, mapActions } from 'vuex'
import {resolveBug} from '../../../utils/format'
export default {
  data () {
    return {
      form: {
        captcha: ''
      },
      error: '',
      timer: null
    }
  },
  components: {

  },
  watch: {
    loading (val) {
      val ? Indicator.open() : Indicator.close()
    }
  },
  created () {
    this.searchCode()
  },
  destroyed() {
    clearTimeout(this.timer)
  },
  computed: {
    ...mapState('register', {
      formData: state => state.formData,
      loading: state => state.loading,
      captchaImg: state => state.captchaImg,
      captchaId: state => state.captchaId
    })
  },
  methods: {
    ...mapMutations('register', [
      'clearState',
    ]),
    ...mapActions('register', [
      'submitForm',
      'searchCode'
    ]),
    cancel () {
      this.$router.push({path:'/register'})
    },
    comfire () {
      if (!this.captchaId) {
        Toast({
          message: '请输入验证码',
          position: 'top',
          duration: 3000
        })
        return
      }
      this.submitForm({...this.formData, ...this.form,captchaId: this.captchaId})

    },
    change(){
      this.searchCode()
    },
    blur () {
      clearTimeout(this.timer)
      this.timer=setTimeout(function(){
        resolveBug()
      },10)
    },
  }
}
</script>
<style scoped>
  .register {
    width:100%;
    height: 100%;
    padding-top: 33px;
  }
  .dot {
    color: #d41c1a;
  }
  .button {
    display: flex;
    padding: 31px 14px;
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
