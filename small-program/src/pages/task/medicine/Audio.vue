<template>
  <div
    class="multiple">
    <ul
      ref="select"
       @click="showselect"
      class="select-input">
      <input class="selectContent" :value="valueStr" disabled :placeholder="placeholder"/>
      <li
        class="show-icon">
        <div
          :class="['down', {up: isup}]"/>
      </li>
    </ul>
     <MulSelect
      :visible.sync="selectToast"
      :options="options"
      :currentItem="currentItem"
      :value="value"
      @comfire="comfire"
      v-if="selectToast"/>
  </div>
</template>
<script>
import MulSelect from './MultiSelect'
export default {
  data () {
    return {
      selectToast: false,
      isup: false
    }
  },
  props: {
    options: {
      default: () => [],
      type: Array
    },
    value: {
      default: '',
      type: String
    },
    disabled: {
      default: false,
      type: Boolean
    },
    isclick: {
      default: false,
      type: Boolean
    },
    placeholder: {
      default: '',
      type: String
    },
    currentItem:{
      default: () => {},
      type: Object
    },
    label: {
      default: '',
      type: String
    }
  },
  computed: {
    valueStr () {
      for(let i of this.options) {
        if(this.value === i.value) {
          return i.label
        }
      }
      return ''
    }
  },
  created () {

  },
  watch: {
    selectToast (val) {
      this.isup = val
    }
  },
  components: {
    MulSelect
  },
  methods: {
    comfire (val) {
      let value = val.value ? val.value : ''
      this.currentItem.value[this.label] = val.label
      this.$emit('input', value)
    },
    showselect () {
      if (this.disabled) {
        return
      }
      if(!this.currentItem.value.id&&this.isclick) {
        return
      }
      this.selectToast = true
      this.isup = !this.isup
    }
  }
}
</script>
<style scoped>
/* ios兼容 */
/* input[disabled],input:disabled,input.disabled{
  color: #999999;
  -webkit-text-fill-color: #999999;
  -webkit-opacity:1;
  opacity: 1;
} */
.multiple {
  & .select-input {
    display: flex;
    align-items: center;
    min-height: 44px;
     & .selectContent {
      flex: 1;
      width: 100%;
      color:#333;
      font-size: 16px;
      background: #fff;
      -webkit-text-fill-color: #333;
      -webkit-opacity:1;
      opacity: 1;
    }
    & .selectContent::placeholder {
      color:#999;
      -webkit-text-fill-color: #999;
      -webkit-opacity:1;
      opacity: 1;
    }
    & .show-icon {
      width: 20px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
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
  .disabled {

  }
</style>
