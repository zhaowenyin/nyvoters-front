<template>
  <div>
    <div
      ref="select"
       @click="showselect"
      :class="['select-input']">
      <div :class="['value',{'grey9': value === ''}]">{{valueStr().text}}</div>
      <div
        v-if="!disabled"
        :class="['down', {up: visible}]"/>
    </div>
     <SelectMenu
      :visible.sync="visible"
      :options="options"
      :value="value"
      @input='comfire'
      :multiple="multiple"
      :getItemLabel="getItemLabel"
      :getItemValue="getItemValue"
      />
  </div>
</template>
<script>
import SelectMenu from './SelectMenu'
import {isEqual} from '../utils/validate.js'
export default {
  data () {
    return {
      visible: false
    }
  },
  props: {
    multiple: {
      default: false,
      type: Boolean
    },
    options: {
      default: () => [],
      type: Array
    },
    value: {
      default: null,
      type: null
    },
    disabled: {
      default: false,
      type: Boolean
    },
    placeholder: {
      default: '',
      type: String
    },
    getItemLabel: {
      default: item => item,
      type: Function
    },
    getItemValue: {
      default: item => item,
      type: Function
    },
  },
  computed: {
  },
  created () {
  },
  components: {
    SelectMenu
  },
  methods: {
    compare () {
      if (!this.options) return []
      if(!this.multiple){
        for (const item of this.options) {
          if (isEqual(this.getItemValue(item), this.value)) {
            return [item]
          }
        }
      }else{
        if (!this.value) return []
        let newlist = []
        for (const obj of this.value) {
          for (const item of this.options) {
            if (isEqual(this.getItemValue(item), obj)) {
              newlist.push(item)
              break
            }
          }
        }
        return newlist
      }
      return []
    },
    valueStr () {
      const selectList = this.compare()
      if (selectList && selectList.length > 0) {
        const textArr = []
        selectList.forEach((item) => {
          const text = this.getItemLabel(item)
          textArr.push(text)
        })
        return {
          text: textArr.join('、'),
          haveSelectData: true
        }
      } else {
        return {text: this.placeholder, haveSelectData: false}
      }
    },
    comfire (val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
    showselect () {
      if (this.disabled) {
        return
      }
      this.visible = true
    }
  }
}
</script>
<style scoped>
.select-input {
  width:100%;
  display: flex;
  min-height: 48px;
  align-items: center;
  border-radius:4px;
  padding: 0 9px;
  &.diabled {
    border: none;
    min-height: 16px;
  }
}
.value {
  font-size: 16px;
  width: 100%;
  height: 100%;
  margin-right:10px;
  color:#333;
  &.grey9{
    color:#999;
  }
}
.down {
    width:0;
    height:0;
    border-top:8px solid #444;
    border-left:7px solid transparent;
    border-right:7px solid transparent;
    position: relative;
    &:after{
      content: '';
      display: block;
      position: absolute;
      top: -10px;
      left: -7px;
      border-top:8px solid #fff;
      border-left:7px solid transparent;
      border-right:7px solid transparent;
    }
    &.up{
      transform: rotate(180deg);
    }
  }
</style>
