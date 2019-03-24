<template>
  <div class="out-line">
    <div
      v-if="toast"
      class="out">
      <div
        class="content">
        <ul class="the-icon">
          <li
            class="button"
            style = "text-align: left;"
          >
            <div
              class ="default"
              @click="close">取消</div>
          </li>
          <li
            class="button"
            style = "display: flex;justify-content: center;"
          >
            <div
              class ="default"
              @click="clear">清除</div>
          </li>
          <li
            class="button">
            <div
              class ="default confirm"
              v-if="!buLoading"
              @click="comfire">确定</div>
            <div
              v-if="buLoading"
              class ="default confirm"
              :disabled="buLoading">加载中...</div>
          </li>
        </ul>
        <div class="sign">
          <canvas
            ref="canvas"
            class="canvas"
          />
        </div>

      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      buLoading: false,
      signaturePad: null,
      signUrl: '',
      canvas: null
    }
  },
  props: {
    toast: {
      default: false,
      type: Boolean
    },
    url: {
      default: '',
      type: String
    }
  },
  watch: {
  },
  created () {
  },
  mounted () {
    this.canvas = this.$refs.canvas
    window.addEventListener('resize', this.resizeCanvas)
    this.signaturePad = new SignaturePad(this.canvas)
    this.initData()
  },
  destroyed (){
    window.removeEventListener('resize', this.resizeCanvas)
  },
  methods: {
    async initData() {
      this.signUrl = this.url
      this.resizeCanvas()
    },
    close () {
      this.$emit('update:toast', false)
    },
    clear () {
      this.signaturePad.clear()
      this.signUrl = ''
    },
    comfire () {
      let iskong = this.signaturePad.isEmpty()
      let png = iskong ? this.signUrl : this.signaturePad.toDataURL()
      this.$emit('saveSign', {png})
    },
    resizeCanvas () {
      let ratio = Math.max(window.devicePixelRatio || 1, 1)
      this.canvas.width = this.canvas.offsetWidth * ratio
      this.canvas.height = this.canvas.offsetHeight * ratio
      console.log(this.canvas.offsetWidth, ratio)
      this.canvas.getContext('2d').scale(ratio, ratio)
      // this.canvas.getContext('2d').translate(50, 50) // 控制比例不变，可设置
      this.signUrl && this.signaturePad.fromDataURL(this.signUrl, {
        // width: 200,
        // height: 200
      })
    }

  }
}
</script>
<style scoped>
.out-line {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3000;
}
.out {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0, 0.5);
  transition: all .3s ease-in-out;
  height: 100%;
  font-size: 13px;
   display: flex;
   justify-content: center;
   align-items: center;
   overflow: hidden;
  & .content {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 80%;
    width: 95%;
    & .the-icon {
      display: flex;
      height: 46px;
      line-height: 46px;
      align-items: center;
      text-align: center;
      padding: 0 15px;
      font-size: 15px;
      border-bottom: 1px solid rgba(195,195,195,1);
      & li {
        flex: 1;
      }
      & .button {
        & .default {
          cursor: pointer;
          font-size: 13px;
          width:64px;
          height:30px;
          line-height: 30px;
          text-align: center;
          background:rgba(255,255,255,1);
          border-radius: 50px;
          border: 1px solid rgba(195,195,195,1);
          &.confirm {
            color: rgba(90,125,251,1);
            border: 1px solid rgba(90,125,251,1);
            float: right;
          }
        }
      }
    }
    & .sign {
      flex: 1;
      position: relative;
      & .canvas {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
}
</style>
