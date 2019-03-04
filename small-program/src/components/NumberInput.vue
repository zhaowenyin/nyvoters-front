<template>
  <input
    ref="number"
    @input="input"
    :class="{input:ismedicine}"
    @textInput="textInput"
    :placeholder="placeholder"
    :value="value"
    type="number">
</template>
<script>

export default {
  props: {
    value: {
      default: '',
      type: null
    },
    integerDigits: {
      default: 11,
      type: Number
    },
    decimalDigits: {
      default: 4,
      type: Number
    },
    placeholder: {
      default: '',
      type: String
    },
    ismedicine: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      oldValue: this.value,
      isDel: true,
      isDot: false
    }
  },
  computed: {
  },
  components: {
  },
  created () {
  },
  methods: {
    textInput (event) {
      if (event.data === '.' && event.target.value && !/\./g.test(event.target.value)) {
        this.isDot = true
      }
      this.isDel = false
    },
    input (event) {
      const reg = new RegExp(`(?!^0\\d)^(\\d{1,${this.integerDigits}}(\\.\\d{0,${this.decimalDigits}})?)?$`, 'g')
      // const reg = /^[1-9]{0,10}([0-9](\.[0-9]{0,4})?)?$/g
      if (event.target.value === '') {
        if (this.isDot) return
        if (this.isDel) this.oldValue = ''
        event.target.value = this.oldValue
      } else if (reg.test(event.target.value)) {
        this.oldValue = event.target.value
      } else {
        event.target.value = this.oldValue
      }
      this.$emit('input', this.oldValue)
      this.isDel = true
      this.isDot = false
    }
  }
}
</script>
<style scoped>
.input::placeholder {
  color: #999;
}
</style>
