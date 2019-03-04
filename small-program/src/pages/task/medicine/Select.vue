<template>
  <div
    class="multiple">
    <ul
      ref="select"
       @click="showselect"
      class="select-input">
      <input class="selectContent" placeholder="请选择药品" disabled :value="value"/>
      <li
        class="show-icon">
        <div
          :class="['down', {up: isup}]"/>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isup: false
    }
  },
  props: {
    data: {
      default: '',
      type: String
    }
  },
  computed: {
    value () {
      return this.data
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
    // MulSelect
  },
  methods: {
    showselect () {
      this.isup = !this.isup
    }

  }
}
</script>
<style scoped>
/* ios兼容 */
/* input[disabled],input:disabled,input.disabled{
  color: #999;
  -webkit-text-fill-color: #999;
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
