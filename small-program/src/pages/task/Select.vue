<template>
  <div
    class="multiple">
    <ul
      ref="select"
       @click="showselect"
      class="select-input">
      <input class="selectContent" :value="valueStr" disabled/>
      <li
        class="show-icon">
        <div
          :class="['down', {up: isup}]"/>
      </li>
    </ul>
     <MulSelect
      :multiple="multiple"
      :visible.sync="selectToast"
      :options="options"
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
    multiple: {
      default: false,
      type: Boolean
    },
    options: {
      default: () => [],
      type: Array
    },
    value: {
      default: () => [],
      type: Array
    },
    disabled: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    valueStr () {
      return this.value && this.value.join(',')
    },
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
      this.$emit('input', val)
    },
    showselect () {
      if (this.disabled) {
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
input[disabled],input:disabled,input.disabled{
  color: #666;
  -webkit-text-fill-color: #666;
  -webkit-opacity:1;
  opacity: 1;
}
.multiple {
  & .select-input {
    display: flex;
    align-items: center;
    min-height: 44px;
    & .selectContent {
      flex: 1;
      color:#666;
      font-size: 16px;
      background: #fff;
    }
    & .show-icon {
      width: 40px;
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
</style>
