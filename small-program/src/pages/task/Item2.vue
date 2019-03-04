<template>
  <div class="itemView">
    <!-- 标题-->
    <div
      v-if="data.name && data.type !== 5"
      :class="['name']">
      <span
        v-if="data.question.isRequired"
        class="dot">*</span>
      {{ data.name }}
    </div>

    <!-- 单选 ，多选-->
    <div
      v-if="data.type === 1 || data.type === 2"
      class="formLine">
      <input
        disabled
        class="input"
        :value="(data.value && data.value.join(',')) || ''" />
    </div>
    <!-- 数字填空, 纯填空 -->
    <div
      v-if="data.type === 3 || data.type === 4"
      class="formLine">
      <input
        disabled
        class="input"
        v-model.trim="data.value" />
      <div
        v-if="data.question.postfix"
        class="unit">{{ data.question.postfix }}</div>
    </div>
    <!-- 时间 -->
    <div
      v-if="data.type === 7">
      <div class="formLine">
        <div
          class="timePicker">
          <input
            disabled
            class="input"
            :value="formatDate(data.value)" />
        </div>
      </div>
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
      class='sign'>
      <div class="xianshi">
        <img
          v-if="data.value"
          class="signIcon"
          :src="getImgURL(data.value)">
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
</template>
<script>
import { formatDate } from '../../utils/format.js'
import { getImgURL } from '../../../config'

export default {
  data () {
    return {
      toast: false
    }
  },
  props: {
    data: {
      default: () => {},
      type: Object
    }
  },
  computed: {
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
    }
  },
  components: {
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
    formatDate,
    getImgURL,
    htmlLink (id) {
      this.$router.push({
        path: '/html',
        query: {
          id,
          title: this.$route.query.title
        }
      })
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
    color: #333;
    -webkit-text-fill-color: #333;
    -webkit-opacity:1;
    opacity: 1;
  }
  .itemView{
    background: #fff;
    padding: 0px 18px;
    position: relative;
    &:after{
      position: absolute;
      left: 18px;
      right: 0px;
      bottom: 0px;
      content: '';
      display: block;
      height: 1px;
      background: #EAEAEA;
    }
    &:last-of-type{
      &:after{
        display: none;
      }
    }
  }
  .name{
    font-size: 16px;
    font-weight: 500;
    line-height: 1;
    color:#666;
    position: relative;
    padding-top: 12px;
    & .dot {
      color: red;
      position: absolute;
      left: -10px;
    }
  }
  .formLine{
    display: flex;
    align-items: center;
    font-size: 16px;
    & .input{
      flex: 1;
      height: 44px;
      color: #333;
      background: #fff;
    }
    & .timePicker{
      display: flex;
      flex: 1;
      align-items: center;
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
  color: #333;
}
</style>
