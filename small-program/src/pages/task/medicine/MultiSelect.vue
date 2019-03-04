<template>
  <div
    v-if="visible"
    class="out">
    <div class="bg" @click="close"></div>
    <div
      class="content">
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
                src="../../../assets/icon-mulselect.png">
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
    options: {
      default: () => [],
      type: Array
    },
    value: {
      default: '',
      type: String
    }
  },
  computed: {
  },
  created () {
    this.arr = this.options.map((obj) => {
      let checkFlag = false
      if (this.value === obj.value) {
        checkFlag = true
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
      let arr = {}
      this.arr.forEach( i => {
        if (i.checkFlag) {
          arr = i
        }
      })
      this.$emit('comfire', arr)
      this.close()
    },
    change (obj) {
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
