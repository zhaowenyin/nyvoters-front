<template>
  <input
    ref="number"
    @input="input"
    :class="{input:ismedicine}"
    :placeholder="placeholder"
    :value="value"
     @blur="blur"
    type="number">
</template>
<script>

export default {
  props: {
    value: { // 设置值
      default: '',
      type: null
    },
    integerDigits: { // 小数点前几位
      default: 11,
      type: Number
    },
    decimalDigits: { // 小数点后几位
      default: 4,
      type: Number
    },
    placeholder: { // 设置默认值
      default: '',
      type: String
    }
  },
  data () {
    return {
      oldValue: this.value,
      isDel: false, // 是否是删除操作
      isDot: false // 是否是小数点输入操作
    }
  },
  computed: {
  },
  components: {
  },
  created () {

  },
  destroyed() {
    clearTimeout(this.timer)
  },
  methods: {
    input (event) {
      this.isDel = false
      this.isDot = false
      if (event.data === null) this.isDel = true
      if (event.data === '.') this.isDot = true

      let reg
      if (this.decimalDigits > 0) {
        reg = new RegExp(`(?!^0\\d)^(\\d{1,${this.integerDigits}}(\\.\\d{0,${this.decimalDigits}})?)?$`, 'g')
      } else {
        reg = new RegExp(`(?!^0\\d)^(\\d{1,${this.integerDigits}})?$`, 'g')
      }

      if (reg.test(event.target.value)) {
        if (event.target.value !== '' || this.isDel) { // 如果不是因为后退，让值变空，就不改变旧值
          this.oldValue = event.target.value
        }
      }
      if (this.isDot) {
        if ((event.target.value && /\./g.test(event.target.value)) || this.decimalDigits === 0) {
          event.target.value = null // 多余的.强制刷新
        }
      }
      event.target.value = this.oldValue
      this.$emit('input', this.oldValue)
    },
    blur () {
      this.resolveBug()
    },
    resolveBug(){
      clearTimeout(this.timer)
      this.timer=setTimeout(function(){
        if(document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA'){
          return
        }
        let result = 'pc';
        if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { // 判断iPhone|iPad|iPod|iOS
          result = 'ios'
        }else if(/(Android)/i.test(navigator.userAgent)) {  // 判断Android
          result = 'android'
        }
        if(result === 'ios' ){
          document.activeElement.scrollIntoViewIfNeeded(true);
        }
      },10)
    }
  }
}
</script>
<style scoped>
.input::placeholder {
  color: #999;
}
</style>
