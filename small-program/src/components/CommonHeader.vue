<template>
  <div class="header-wrapper">
    <div class="left">
      <div
        @click="onBack"
        class="back">
        <img src="../assets/newVerson-img/back.png" >
      </div>
    </div>
    <div class="title">
      {{ title }}
    </div>
    <div class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      default: '',
      type: String
    },
    back: {
      default: () => {},
      type: Function
    }
  },
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {
    onBack () {
      this.back && this.back()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header-wrapper {
    display: flex;
    align-items: center;
    height: 45px;
    box-shadow: 0px 1px 2px #eee;
    z-index: 2;
    background-color: #fff;
    & .left, & .right {
      /* width: 30%; */
    }
    & .back {
      padding: 0px 12px;
      & img {
        width: 21px;
        height: 21px;
      }
    }
    & .title {
      flex: 1;
      /* text-align: center; */
      font-size: 18px;
      color: #333;
      text-overflow: ellipsis;
      white-space:nowrap;
      overflow:hidden;
    }
    & .right {
      text-align: right;
    }
  }
</style>
