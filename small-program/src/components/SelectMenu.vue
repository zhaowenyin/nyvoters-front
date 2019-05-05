<template>
  <div
    v-if="visible"
    class="out">
    <div class="bg" @click="close"></div>
    <div
      class="content">
      <div
        v-if="multiple"
        class="the-icon">
        <div
          class="button"
          @click="close">取消</div>
        <div
          class ="button confirm"
          @click="sure">确定</div>
      </div>
      <div class="selects">
        <div
         v-for="(i, index) in options"
         :key="index"
         @click="onItemPress(i)"
         :class="['check-title', isSelect(i) ? 'check' : '']">
          {{ getItemLabel(i) }}
          <img
            class="the-img"
            src="../assets/img/icon-mulselect.png">
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import {isEqual} from '../utils/validate.js'

export default {
  props: {
    visible: {
      default: false,
      type: Boolean
    },
    multiple: {
      default: false,
      type: Boolean
    },
    options: {
      default: () => [],
      type: Array
    },
    value: {
      default: null, // 初始选择的item,单选为任意类型，多选为数组
      type: null
    },
    onClose: {
      default: () => {},
      type: Function
    },
    getItemLabel: {
      default: item => item,
      type: Function
    },
    getItemValue: {
      default: item => item,
      type: Function
    },
    title: {
      default: '',
      type: String
    },
  },
  data () {
    return {
      newValue: null
    }
  },
  computed: {
  },
  watch: {
    visible () {
      this.newValue = JSON.parse(JSON.stringify(this.value))
    },
    value () {
      this.newValue = JSON.parse(JSON.stringify(this.value))
    }
  },
  created () {
    this.newValue = JSON.parse(JSON.stringify(this.value))
  },
  mounted () {

  },
  methods: {
    close() {
      this.$emit('update:visible', false)
      this.onClose && this.onClose(this)
    },
    sure() {
      this.$emit('input', this.newValue)
      this.close()
    },
    isSelect(item) {
      if(!this.multiple){
        return isEqual(this.getItemValue(item), this.newValue)
      }else{
        if (!this.newValue) return false
        for (const obj of this.newValue) {
          if (isEqual(this.getItemValue(item), obj)) {
            return true
          }
        }
      }
      return false
    },
    onItemPress(item) {
      const value = this.getItemValue(item)
      if(!this.multiple){
        this.newValue = value
        this.sure()
      } else {
        if (this.newValue && this.newValue.length > 0) {
          for (let i = 0, len = this.newValue.length; i < len; i++) {
            const obj = this.newValue[i]
            if (isEqual(value, obj)) {
              this.newValue.splice(i, 1)
              return
            }
          }
          this.newValue.push(value)
        } else {
          this.newValue = [value]
        }
      }
    }
  }
}
</script>
<style scoped>
.out {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  transition: all .3s ease-in-out;
  & .bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0, 0.5);
  }
  & .content {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    background-color: #fff;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-height: 66%;
    border-radius: 4px;
    overflow: hidden;
    & .the-icon {
      display: flex;
      height: 60px;
      line-height: 60px;
      align-items: center;
      background-color: #fafafa;
      justify-content: space-between;
      text-align: center;
      font-size: 15px;
      border-bottom: 1px solid rgba(216,216,216,1);
      & .button {
        font-size:16px;
        font-weight:bold;
        color: #999;
        padding: 0 18px;
        &.confirm {
          color:rgba(60,130,255,1);
        }
      }
    }
    & .selects {
      flex: 1;
      overflow: auto;
    }
  }
}

.check-title {
  font-size:16px;
  font-weight:400;
  color:rgba(51,51,51,1);
  padding: 14px 30px;
  border-bottom: 1px solid rgba(216,216,216,1);
  position: relative;
  text-align: center;
  margin: 0px 12px;
  &:last-of-type{
    border-bottom: none;
  }
  & .the-img {
    width: 18px;
    height: 12px;
    display: none;
    position: absolute;
    right: 6px;
    top: 18px;

  }
  &.check{
    color: rgba(60,130,255,1);
    & .the-img {
      display: block;
    }
  }
}
</style>
