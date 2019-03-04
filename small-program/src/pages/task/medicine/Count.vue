<template>
  <div class="jishu">
    <div
      @click="munus"
      :class="['jiajian',{diasbled: disabled || (!data.value)}]">-</div>
    <div :class="['number',{diasbled: disabled }]">{{ data.value }}</div>
    <div
      @click="add"
      :class="['jiajian',{diasbled: disabled}]">+</div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      // number: 0
    }
  },
  props: {
    data: {
      default: {},
      type: null
    },
    validate: {
      default: {},
      type: null
    },
    disabled: {
      default: false,
      type: Boolean
    }
  },
  components: {

  },
  created () {
  },
  methods: {
    munus () {
      this.data.value = this.data.value ? this.data.value : 0
      if (this.disabled || (this.data.value <= +this.validate.minNumber)) {
        return
      }
      this.data.value = +this.data.value - 1
    },
    add () {
      if (this.disabled || this.validate.maxNumber&&(this.data.value >= +this.validate.maxNumber)) {
        return
      }
      this.data.value = this.data.value ? this.data.value : 0
      this.data.value = +this.data.value + 1
    }
  }
}
</script>
<style scoped>
.jishu {
  display: flex;
  & .jiajian {
    width: 48px;
    height: 48px;
    text-align: center;
    line-height: 48px;
    background:rgba(6,211,211,1);
    border-radius:2px;
    color: rgba(255,255,255,1);
  }
  & .number {
    border-radius:2px;
    border:1px solid rgba(6,211,211,1);
    margin: 0 5px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:16px;
    font-weight:400;
    color:rgba(153,153,153,1);;
  }
   & .diasbled {
    background:rgba(216,216,216,1);
    border:1px solid rgba(216,216,216,1);
  }
}
</style>
