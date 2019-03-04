<template>
  <div :class="['itemView', {label: data.label_default_answer}]">
    <!-- 标题-->
    <div
      v-if="data.name && data.type !== 5"
      :class="['name', {disabled: !data.question.isEdit}]">
      <span
        v-if="data.question.isRequired"
        class="dot">*</span>
      {{ data.name }}
    </div>
    <div class="itemContent">
      <!-- 单选 ，多选-->
      <div
        v-if="data.type === 1 || data.type === 2">
        <Select
          :multiple="data.type===2"
          :options="data.question.options"
          :disabled="!data.question.isEdit"
          v-model="value"/>
      </div>
      <!-- 数字填空 -->
      <div
        v-if="data.type === 4"
        @click="focusInput"
        class="formLine">
        <NumberInput
          ref="number"
          :disabled="!data.question.isEdit"
          :placeholder="data.question.placeholder"
          class="input"
          v-model="value"/>
        <div
          v-if="data.question.postfix"
          class="unit">{{ data.question.postfix }}</div>
      </div>
      <!-- 纯填空 -->
      <div
        v-if="data.type === 3"
        class="formLine">
        <input
          :disabled="!data.question.isEdit"
          class="input"
          :placeholder="data.question.placeholder"
          v-model.trim="value" />
        <div
          v-if="data.question.postfix"
          class="unit">{{ data.question.postfix }}</div>
      </div>
      <!-- 时间 -->
      <div
        v-if="data.type === 7">
        <div class="formLine">
          <div
            @click="openPicker"
            class="timePicker">
            <input
              disabled
              class="input"
              :value="formatDate(value)" />
            <img
              style="width:21px;height:22px; "
              src="../../assets/newVerson-img/icon-time.png">
          </div>
        </div>
        <calendar
          v-model="isshow"
          :default-date="value"
          @closeModel="true"
          @change="handleConfirm"/>
      </div>
       <!-- 药品 -->
      <div
        v-if="data.type === 8">
        <div @click="MedicineClick(data.frontend_id,data.question.isEdit)" class="formLine1">
          {{drugStr}}
        </div>
      </div>
      <!-- 电子签名 -->
      <div
        v-if="data.type === 6"
        @click="signIn"
        class='sign'>
        <div class="xianshi">
          <img
            v-if="value"
            class="signIcon"
            :src="getImgURL(value)">
          <div
            class="placeH"
            v-else>点击签名</div>
        </div>
      </div>
      <!-- 文本 -->
      <div
        v-if="data.type === 5"
        class="text add-html-box">
        <div
          v-if="!data.question.isExpand"
          @click="htmlLink(data.frontend_id)"
          class="linkBox">
          <div class="link">{{ data.question.urlLabel }}</div>
          <div
            class="row"/>
        </div>
        <div
          v-else
          v-html="data.question.html"/>
      </div>
    </div>

    <!--报错提示 -->
    <div
      v-if="data.error"
      class="error">{{ data.error }}</div>
    <Sign
      v-if="toast"
      :url='value'
      :toast.sync="toast"
      @saveSign="saveSign"
    />
  </div>
</template>
<script>
import Sign from './sign'
import NumberInput from '../../components/NumberInput'
import Calendar from '../../components/Calendar'
import Select from './Select'
import { getImgURL } from '../../../config'
import { formatDate } from '../../utils/format.js'

export default {
  data () {
    return {
      toast: false,
      isshow: false
    }
  },
  props: {
    data: {
      default: () => {},
      type: Object
    }
  },
  computed: {
    value: {
      get: function () {
        return this.data.value
      },
      set: function (v) {
        if (this.data.question.isRequired) {
          if (!v || (toString.call(v) === '[object Array]' && v.length === 0)) {
            this.data.error = '该题为必填项'
          } else if (this.data.error === '该题为必填项') {
            this.data.error = ''
          }
        }
        this.data.value = v
      }
    },
    drugStr () {
      if (this.data.type === 8) {
        if (this.data.value && this.data.value.name) {
          const {name, type, pow_label, spec_label, dosage_num, dosage_label, frequency_num, frequency_label} = this.data.value
          if (type === '1') {
            return `${name}；${pow_label}；${spec_label}；${frequency_num}次/${frequency_label}；每次${dosage_num}${dosage_label}`
          } else if (type === '2'){
            return `${name}；${dosage_num}${dosage_label}/次；${frequency_num}次/${frequency_label}`
          }
        }
      }
      return null
    },
  },
  components: {
    Sign,
    NumberInput,
    Select,
    Calendar
  },
  watch: {
    data () {

    }
  },
  created () {

  },
  destroyed () {

  },
  mounted () {

  },
  methods: {
    htmlLink (id) {
      this.$router.push({
        path: '/html',
        query: {
          id,
          title: this.$route.query.title
        }
      })
    },
    openPicker () {
      if (!this.data.question.isEdit) return
      this.isshow = true
    },
    formatDate,
    handleConfirm (val) {
      this.value = val
    },
    signIn () {
      if (!this.data.question.isEdit) return
      this.toast = true
    },
    saveSign (val) {
      this.value = val.png
      this.toast = false
    },
    focusInput () {
      this.$refs.number && this.$refs.number.$refs.number.focus()
    },
    getImgURL,
    MedicineClick (val,edit) {
      if (!edit) {
        return
      }
      this.$router.push({path: '/medicine',query: {
        frontend_id: val,
        ...this.$route.query
      }})
    }
  }
}
</script>
<style>
  .add-html-box{
    & img {
      max-width: 100%;
    }
  }
</style>
<style scoped>
/* ios兼容 */
  input[disabled],input:disabled,input.disabled{
    color: #666;
    -webkit-text-fill-color: #666;
    -webkit-opacity:1;
    opacity: 1;
  }
  .itemView{
    background: #fff;
    margin-top: 8px;
    &.label{
      border: 1px solid #FFBC50;
    }
  }
  .itemContent{
    padding: 0px 18px;
  }
  .name{
    font-size: 16px;
    font-weight: 500;
    line-height: 1;
    color:#333;
    position: relative;
    padding: 12px 18px 0px;
    &.disabled{
      color: #999;
    }
    & .dot {
      color: red;
      position: absolute;
      left: 8px;
    }
  }
  .error {
    font-size: 13px;
    background: #FF5F6F;
    color: #fff;
    line-height: 28px;
    padding: 0px 18px;
  }
  .formLine{
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #666;
    & .input{
      flex: 1;
      height: 44px;
      color: #666;
      background: #fff;
    }

    & .timePicker{
      display: flex;
      flex: 1;
      align-items: center;
      color: #666;
    }
    & .unit{
      margin-left: 20px;
    }
  }
  .text{
    padding: 16px 0px;
    font-size: 16px;
  }
  .linkBox {
    display: flex;
    align-items: center;
    & .link{
      font-size:16px;
      color: #06D3D3;
      text-decoration: underline;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    & .row {
      width:0;
      height:0;
      border-left:8px solid #444;
      border-top:7px solid transparent;
      border-bottom:7px solid transparent;
      position: relative;
      &:after{
        content: '';
        display: block;
        position: absolute;
        top: -7px;
        left: -10px;
        border-left:8px solid #fff;
        border-top:7px solid transparent;
        border-bottom:7px solid transparent;
      }
    }
  }
  .sign {
    padding: 16px 0px;
   & .xianshi {
      height: 160px;
      background: #f2f2f2;
      display: flex;
      justify-content: center;
      align-content: center;
    }
    & .placeH{
      line-height: 160px;
      font-size:16px;
      color: #999;
      font-weight:400;
    }
    & .signIcon {
      max-height: 100%;
      max-width: 100%;
    }
  }
.formLine1 {
  padding: 16px 0px;
  font-size: 16px;
  color: #666;
}
</style>
