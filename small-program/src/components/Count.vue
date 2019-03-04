<template>
  <div class="jishu">
    <div
      @click="munus"
      class="jiajian">-</div>
    <div class="number">{{ data.value }}</div>
    <div
      @click="add"
      class="jiajian">+</div>
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
    }
  },
  components: {
  },
  created () {
  },
  methods: {
    munus () {
      if (this.data.value <= +this.validate.minNumber) {
        return
      }
      this.data.value = +this.data.value - 1
    },
    add () {
      if (this.data.value >= +this.validate.maxNumber) {
        return
      }
      this.data.value = +this.data.value + 1
    }
  }
}
</script>
<style scoped>
.jishu {
  display: flex;
  & .jiajian {
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border: 1px solid #D8D8D8;
  }
  & .number {
    border: 1px solid #D8D8D8;
    border-right: none;
    border-left: none;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
