<template>
  <div class="label">
    <div class="search">
      <el-input
        placeholder="输入标签名称"
        maxlength="24"
        v-model="labelName"></el-input>
      <el-button style="margin-left: 5px"
                 :disabled="canSave"
                 type="primary" @click="save">保存</el-button>
    </div>
    <ul>
      <li v-for="(item, index) in labelList" :key="'label' + index">
        {{item.label}}
      </li>
    </ul>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {saveLabel} from '../service'
export default {
  data () {
    return {
      labelName: ''
    }
  },
  computed: {
    ...mapState('gauge', {
      tagList: state => state.tagList
    }),
    allLabel () {
      const {tagList} = this
      return tagList.map((tag) => {
        return tag.label
      })
    },
    canSave () {
      const {allLabel, labelName} = this
      if (!labelName) return true
      return allLabel.indexOf(labelName) !== -1
    },
    labelList () {
      const {labelName, tagList} = this
      if (labelName) {
        return tagList.filter((tag) => {
          return tag.label.indexOf(labelName) !== -1
        })
      } else {
        return tagList
      }
    }
  },
  methods: {
    async save () {
      const {labelName} = this
      const {data} = await saveLabel({label: labelName})
      let obj = {value: data.id, label: data.label}
      this.tagList.push(obj)
    }
  }
}
</script>
<style scoped>
  .search {
    display: flex;
    flex-direction: row;
  }
  .label {
    & ul {
      padding: 10px 0;
      & li {
        border: 1px solid #dcdfe6;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
</style>
