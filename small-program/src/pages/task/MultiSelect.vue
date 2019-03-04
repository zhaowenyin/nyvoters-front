<template>
  <div
    v-if="visible"
    class="out">
    <div class="bg" @click="close"></div>
    <div
      class="content">
      <ul
        v-if="multiple"
        class="the-icon">
        <li
          class="button"
          style = "text-align: left;"
        >
          <div
            class ="default"
            @click="close">取消</div>
        </li>
        <li
          class="button">
          <div
            class ="default confirm"
            @click="comfire">确定</div>
        </li>
      </ul>
      <div class="selects">
        <ul
         v-for="(i, index) in arr"
         :key="index"
         @click="change(i)"
         :class="['check-title', i.checkFlag ? 'check' : '']">
            <li
              class="list label">{{ i.label }}</li>
            <li
              class="list"
              style="width: 18px;"
            >
              <img
                v-if="i.checkFlag"
                class="the-img"
                src="../../assets/icon-mulselect.png">
            </li>
        </ul>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      arr: []
    }
  },
  props: {
    visible: {
      default: false,
      type: Boolean
    },
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
    }
  },
  computed: {
  },
  created () {
    this.arr = this.options.map((obj) => {
      let checkFlag = false
      if (this.value && this.value.length > 0) {
        for(let item of this.value) {
          if (item === obj.value) {
            checkFlag = true
            break
          }
        }
      }
      return {
        ...obj,
        checkFlag: checkFlag
      }
    })
  },
  mounted () {

  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    comfire () {
      let arr = []
      this.arr.forEach( i => {
        if (i.checkFlag) {
          arr.push(i.value)
        }
      })
      this.$emit('comfire', arr)
      this.close()
    },
    change (obj) {
      if(this.multiple) {
        console.log(obj.value)
        if (obj.value === '以上都不是' || obj.value === '不清楚') {
          this.arr = this.arr.map((item) => {
            if (item.value === obj.value) {
              item.checkFlag = true
            } else {
              item.checkFlag = false
            }
            return item
          })
        } else {
          obj.checkFlag = !obj.checkFlag
          this.arr = this.arr.map((item) => {
            if (item.value === '以上都不是' || item.value === '不清楚') {
              item.checkFlag = false
            }
            return item
          })
        }

      } else {
        this.arr = this.arr.map((item) => {
          if (item.value === obj.value) {
            item.checkFlag = !item.checkFlag
          } else {
            item.checkFlag = false
          }
          return item
        })
        this.comfire()
      }
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
  z-index: 1000;
  transition: all .3s ease-in-out;
  & .bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0, 0.5);
  }
  & .content {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    background-color: #fff;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 60%;
    border-radius: 4px;
    & .the-icon {
      display: flex;
      height: 56px;
      line-height: 56px;
      align-items: center;
      text-align: center;
      padding: 0 18px;
      font-size: 15px;
      border-bottom: 1px solid rgba(216,216,216,1);
      & li {
        flex: 1;
      }
      & .button {
        & .default {
          cursor: pointer;
          font-size:16px;
          font-weight:500;
          color:rgba(153,153,153,1);
          &.confirm {
            color:rgba(6,211,211,1);
            float: right;
          }
        }
      }
    }
    & .selects {
      flex: 1;
      overflow: auto;
    }
  }
}
.the-img {
  width: 18px;
  height: 12px;
}
.check-title {
  display: flex;
  font-size:16px;
  font-weight:400;
  color:rgba(51,51,51,1);
  padding: 14px 20px;
  border-bottom: 1px solid rgba(216,216,216,1);
  &.check{
    color: rgba(6,211,211,1);
  }
}
.list {
  display: flex;
  align-items: center;
}
.label {
  flex: 1;
  justify-content: center;
}
</style>
