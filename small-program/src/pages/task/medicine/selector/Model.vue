<template>
  <div
    v-if="toast"
    class="out">
    <div class="content">
      <div class="select">
        {{title}}
      </div>
      <ul class="the-icon">
        <li
          class="button"
        >
          <div
            class ="default"
            @click="close">取消</div>
        </li>
        <li class="line" />
        <li
          class="button">
          <div
            class ="default confirm"
            @click="comfire">确定使用</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {

    }
  },
  props: {
    toast: {
      default: false,
      type: Boolean
    },
    title: {
      default: '',
      type: String
    },
    // value: {
    //   default: '',
    //   type: String
    // }
  },
  created () {
  },
  mounted () {

  },
  methods: {
    ...mapMutations('task', [
      'saveMedicine'
    ]),
    close () {
      console.log(9999)
      this.$emit('close')
    },
    comfire () {
      this.$emit('comfire', false)
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
  background: rgba(0,0,0, 0.5);
  z-index: 1000;
  transition: all .3s ease-in-out;
  height: 100%;
  font-size: 13px;
   display: flex;
   justify-content: center;
   align-items: center;
  & .content {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 90%;
    & .the-icon {
      border-top: 1px solid rgba(238,238,238,1);
      display: flex;
      height: 46px;
      line-height: 46px;
      align-items: center;
      text-align: center;
      padding: 0 15px;
      font-size: 15px;
      & .button {
        flex:1;
        & .default {
          cursor: pointer;
          font-size: 14px;
          line-height: 48px;
          text-align: center;
          font-size:14px;
          font-weight:400;
          color:rgba(153,153,153,1);
          line-height:20px;
          &.confirm {
            color:rgba(7,213,213,1);
          }
        }
      }
    }
    & .select {
      padding: 30px 48px;
      text-align: center;
      font-size:16px;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:24px;
    }
  }
}

</style>
