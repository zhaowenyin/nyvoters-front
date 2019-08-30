<template>

  <div :class="['multiple',{'isfocus': valueStr},{'diabel': disabled}]">
    <ul
      ref="select"
      @click="showselect"
      class="select-input">
      <div :class="['value',{'disab': !valueStr || disabled}]">{{valueStr ? valueStr : '请选择'}}</div>
    </ul>
     <div
        @click="close"
        class="show-icon">
        <i/>
    </div>
     <PrecinctList
     :noallow="noallow"
     style="z-index: 10000"
      @saveData="saveData"
      :multiple="multiple"
      :item="item"
      :list="list"
      v-if="createDialogVisible"
      :visible.sync='createDialogVisible'
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
      list: []
    }
  },
  computed: {
    valueStr () {
      if(this.multiple) {
        if(this.value.length===0) {
          return ''
        }
        this.handerlist()
        for(let i of this.value) {
          this.func(this.data,i)
        }
      } else {
        if(this.value==='') {
          return ''
        }
        this.handerlist()
        this.func(this.data,this.value)
      }
      let str = []
      for(let i of this.list) {
        str.push(i.name)
      }
      return str.join(',')

    },
  },
  components: {
    PrecinctList
  },
  watch: {
    valueStr (val) {
      if(!val) {
        this.list = []
      }
    }

  },
  props: {
    value: {
      default: null,
      type: [String, Array,Number]
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
    },
    noallow: {
      default: false,
      type: Boolean
    }
  },
  created() {

  },
  methods: {
    func (list,i) {
      let defaultValue = i
      const re = (array) => {
        if (!array || array.length === 0) return false
        for (let i = 0; i < array.length; i++) {
          if (array[i].id === defaultValue) {
            this.list.push(array[i])
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
      if (this.disabled) {
        return
      }
      let value = []
      if(this.multiple) {
        value = []
      } else {
        value = ''
      }
      this.list = []
      this.$emit('input', value)
      this.$emit('change')
    },
    handerlist () {
      this.list = []
    },
    saveData (val) {
      let value = []
      for(let i of val) {
        value.push(i.id)
      }
      if(!this.multiple) {
        if (value.length > 0) {
          value = value[0]
        } else {
          value = ''
        }
      }
      this.list = []
      this.$emit('input', value)
      this.$emit('change')
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
    &.diabel {
      background-color: #f5f7fa;
      border-color: #E4E7ED;
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
  /* min-height: 30px; */
  padding: 5px 0;
  margin-right:10px;
  color:#333;
  &.disab{
    color: #C0C4CC;
  }
}
</style>
