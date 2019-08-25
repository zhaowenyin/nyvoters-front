<template>
<div class="register">
  <div class="content">
    <div class="out-input">
    <div class="label-width">
      <span class="dot">*</span>
      <span>申诉人</span>
    </div>
    <input
      @blur="blur"
      v-model.trim="form.userName"
      placeholder="请填写申诉人"
      class="input"/>
    </div>
    <div class="out-input">
      <div class="label-width">
        <span class="dot">*</span>
        <span>身份证号码</span>
      </div>
      <input
        @blur="blur"
        :maxlength="18"
        v-model.trim="form.idNum"
        placeholder="请填写身份证号码"
        class="input"/>
    </div>
    <div class="out-input">
      <div class="label-width">
        <span class="dot">*</span>
        <span>联系电话</span>
      </div>
      <input
        @blur="blur"
        v-model.trim="form.phoneNum"
        :maxlength="11"
        placeholder="请填写联系电话"
        class="input"/>
    </div>
    <div class="out-input">
      <div class="label-width">
        <span class="dot">*</span>
        <span>申诉书</span>
      </div>
    <div class="a-upload">
        <div class="text">
            <VueUploadComponent
              style="width: 100%; text-align: left;"
              ref="upload"
              v-model="files"
              :post-action="allUrl"
              @input-file="inputFile"
            >
            <span v-if="files.length===0" >请上传申请书</span>
            </VueUploadComponent>
            <span class="load-file" v-if="files.length > 0">
                {{file.name}}<img @click.prevent="remove(files[0])" style="width: 20px;height: 20px; margin-left: 8px;" src="../../assets/img/icon-close.png"/>
              <mt-progress style="width: 100%;" v-if="!(file.response&&file.response.content)" :value="+progress">
              </mt-progress>
            </span>
          <!-- 请上传申请书 -->
        </div>
      </div>
    </div>
    <div class="out-input">
      <div class="label-width">
        <span></span>
      </div>
      <div class="template">请根据<span @click="download" class="complait-label">《公民申诉书》</span>模板，填写相应内容后，上传文件</div>
    </div>

    <div class="valid">
      <div class="label-width">
        <span>有效验证码</span>
      </div>
      <div class="out-img"><img class="img" :src="captchaImg"/></div>
      <div class="change" @click="change">换一张</div>
    </div>
    <div class="out-input">
      <div class="label-width">
        <span class="dot">*</span>
        <span>验证码</span>
      </div>
      <input
        @blur="blur"
        v-model.trim="form.captcha"
        placeholder="请输入验证码"
        class="input"/>
    </div>
  </div>
  <ul class="button">
    <li @click="cancel" class="btn cancel">取消</li>
    <li @click="comfire" class="btn comfire">提交</li>
  </ul>
</div>

</template>
<script>
import { Toast,Indicator } from 'mint-ui'
import output from '../../utils/output.js'
import {complaitSubmit,getCode} from './service.js'
import VueUploadComponent from 'vue-upload-component'
import { baseURL } from '../../utils/api.js'
import {resolveBug,cardVali} from '../../utils/format'
export default {
  data () {
    return {
      form: {
        userName: '',
        idNum: '',
        captcha: '',
        captchaId: '',
        phoneNum: '',
        appealDocumentId: '',
        type: 2
      },
      error: '',
      captchaImg: '',
      files: [],
      progress: '0',
      file: {},
      baseURL,
      timer: null
    }
  },
  components: {
    VueUploadComponent
  },
  created () {
    this.searchCode()
  },
  computed: {
    allUrl () {
      let param = {
        module: 4,
        fileName: '公民申诉书'
      }
      let paramStr = ''
      for (const k in param) {
        if (param[k] !== undefined &&
            param[k] !== null &&
            param[k] !== '') {
          paramStr += `&${k}=${param[k]}`
        }
      }
      paramStr = paramStr.substr(1)
      return `${baseURL}/doc/upload/?${paramStr}`
    }
  },
  watch: {
    loading (val) {
      val ? Indicator.open() : Indicator.close()
    }
  },
  destroyed() {
    clearTimeout(this.timer)
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
    async submitSearch() {
      try {
        this.loading = true
        const {data} = await complaitSubmit(this.form)
        if(data.content) {
          setTimeout(()=>{
            this.$router.push({path:'/success',query: {type: 3,info: data.content.info}})
          },500)
        } else {
          Toast({
            message: data.message,
            position: 'top',
            duration: 3000
          })
          this.searchCode()
        }
      } catch (e) {
        console.log(e)
        this.searchCode()
      }finally{
        this.loading = false
      }
    },
    change () {
      this.searchCode()
    },
    async searchCode () {
      const {data} = await getCode()
      this.captchaImg = 'data:imagepng;base64,' + data.content.captcha
      this.form.captchaId = data.content.captchaId
    },
    verify() {
      if(!this.form.userName) {
        this.error = '请填写申诉人'
        return false
      }
      if(cardVali(this.form.idNum).status !== 1) {
        this.error = this.cardVali(this.form.idNum).message
        return false
      }
      if(!this.form.appealDocumentId) {
        this.error = '请上传申述书'
        return false
      }
      if(!this.form.phoneNum) {
        this.error = '请填写联系电话'
        return false
      }
      if(!this.form.captcha) {
        this.error = '请输入验证码'
        return false
      }

      return true
    },
    async download () {
      try {
        output({url: '/doc/download', param: {fileName: '公民申诉书', module: 4}})
      } catch (err) {
        console.log(err)
      }
    },
    inputFile (newFile) {
      if(!newFile) {
        return
      }
      // 自动上传
      this.$refs.upload.active = true
      this.file = newFile
      if (newFile.progress) {
        this.progress=newFile.progress
      }
      if (newFile.error) {
        Toast({
          message: newFile.error,
          position: 'top',
          duration: 3000
        })
        return
      }

      if (newFile.success) {
        console.log('success', newFile.success, newFile)
        this.form.appealDocumentId = this.file.response.content
      }
      if (newFile.response.message) {
        Toast({
          message: newFile.response.message,
          position: 'top',
          duration: 3000
        })
        return
      }

    },
    remove(file) {
      this.form.appealDocumentId = ''
      this.$refs.upload.remove(file)
      this.progress = '0'
    },
    blur () {
      clearTimeout(this.timer)
      this.timer=setTimeout(function(){
        resolveBug()
      },10)
    },
    cardVali
  }
}
</script>
<style scoped>
  .register {
    width:100%;
    height: 100%;
    padding-top: 20px;
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
  .template {
    flex:1;
    padding: 10px 0;
    font-size: 15px;
    color: #333;
    & .complait-label {
      color: #d02626;
    }
  }
.out-img {
  width: 96px;
  height: 45px;
  & .img {
    width: 100%;
    height: 100%;
  }

}
.file {
  width: 100%;
  position: relative;
  & input {
    position: absolute;/*相对定位*/
    right: 0;
    top: 0;
    opacity: 0;/*将上传组件设置为透明的*/
    font-size: 100px;
  }
}
.a-upload {
  display: flex;
  align-items: center;
  flex:1;
  font-size: 15px;
  color: #999;
  & .text {
    padding: 20px 0;
    width: 100%;
  }
}
.file-uploads {
  display: initial;
}
.load-file {
  color: #333;
}

</style>
