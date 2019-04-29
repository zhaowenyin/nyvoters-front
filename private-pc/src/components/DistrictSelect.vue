<template>
  <div :class="['multiple',{'isfocus': valueStr},{'diabled': disabled}]">
    <ul
      ref="select"
      @click="showselect"
      class="select-input">
      <div class="value">{{valueStr}}</div>
      <input
        :placeholder="valueStr ? '' : '请选择'"
        class="selectContent" disabled/>
    </ul>
     <div
        v-if="!disabled"
        @click="close"
        class="show-icon">
        <i/>
    </div>
     <PrecinctList
     style="z-index: 10000"
      @saveData="saveData"
      :multiple="multiple"
      :item="item"
      v-if="createDialogVisible"
      :visible.sync='createDialogVisible'
      :labels="labels"
      :data="data"
      />
  </div>
</template>
<script>
import PrecinctList from './PrecinctList'
export default {
  data () {
    return  {
      createDialogVisible: false,
      nameList: []
    }
  },
  computed: {
    valueStr () {
      console.log(99,this.value)
      // if(this.multiple) {
      //   return this.labels&&this.labels.join(',')
      // } else {
      //   return this.labels
      // }
      if(toString.call(this.value) === '[object Array]') {
        for(let i of this.value) {
          this.func(this.data,i)
        }
      } else {
        this.func(this.data,this.value)
      }
      return this.nameList.join(',')

    }
  },
  components: {
    PrecinctList
  },
  props: {
    value: {
      default: null,
      type: [String, Array,Number]
    },
    labels: {
      default: null,
      type: [String, Array]
    },
    disabled: {
      default: false,
      type: Boolean
    },
    item: {
      default: () => {},
      type: Object
    },
    multiple: {
      default: false,
      type: Boolean
    },
    data: {
      default: () => [],
      type: Array
    }

  },
  methods: {
    func (list,i) {
      console.log(8888,list,i)
      let defaultValue = i
      const re = (array) => {
        if (!array || array.length === 0) return false
        for (let i = 0; i < array.length; i++) {
          if (array[i].id === defaultValue) {
            this.nameList.push(array[i].name)
            console.log(9, this.nameList)
            return true
          }
          const bol = re(array[i].children)
          if (bol) return true
        }
        return false
      }
      re(list, [])
    },
    showselect () {
      if (this.disabled) {
        return
      }
      this.createDialogVisible = true
    },
    close () {
      let value = []
      if(this.multiple) {
        value = []
      } else {
        value = ''
      }
      this.$emit('input', value)
      this.$emit('clear',value)
    },
    saveData (val) {
      let value = []
      let name=[]
      if(this.multiple) {
        for(let i of val) {
          value.push(i.id)
          name.push(i.name)
        }
      } else {
        value = val.id
        name = val.name
      }
      this.$emit('input', value)
      this.$emit('setData', name)
    }

  }
}
</script>
<style scoped>
  .multiple {
    display: flex;
    align-items: center;
    border:1px solid #D8D8D8;
    border-radius:4px;
    min-height: 36px;
     &.isfocus {
      border:1px solid green;
    }
    &.iserror {
      border:1px solid #FB2B4E;
    }
    &.diabled {
      border: none;
      min-height: 16px;

    }
  & .select-input {
    display: flex;
    flex: 1;
    align-items: center;
    position: relative;
    border-radius:4px;
    padding: 0 9px;

    & .selectContent {
      position: absolute;
      color:#666;
      left:15px;
      width: 100%;
      height: 100%;
      background: transparent;
      &::placeholder {
        color: #cac1d1;
      }
    }
  }
  & .show-icon {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    & i:after {
      content: "";
      display: inline-block;
      background: url("../assets/img/icon-close.png") center center no-repeat;
      background-size: 100% 100%;
      width: 20px;
      height: 20px;
      /* margin-right: 0 4px 0 4px; */
      transform: translateY(4px);
      right: 10px;
    }
  }
}
.value {
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 14px;
  width: 100%;
  min-height: 30px;
  margin-right:10px;
  color:#333;

}
</style>
