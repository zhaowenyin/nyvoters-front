<template>
  <div class="show-view">
    <div class="page-content" v-for="(item, index) in selectQuestions" :key="'page' + index">
      <h2>第{{index + 1}}页</h2>
      <ul>
        <li
          v-for="(question, key) in item"
          :class="{checked: question.frontend_id === checkItem.item.frontend_id}"
          @click="select(question, index)"
          :key="'question' + key">{{question.name}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  props: {
    checkItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('gauge', {
      renderTree: state => state.renderTree
    }),
    selectQuestions () {
      const {renderTree} = this
      return renderTree.pages.map((arr) => {
        return arr.filter((obj) => {
          return obj.type === 1 || obj.type === 2
        })
      })
    }
  },
  methods: {
    select (item, index) {
      let k = this.renderTree.pages[index].indexOf(item)
      this.$emit('update:checkItem', {item, index, key: k})
      this.$emit('callback')
    }
  }
}
</script>
<style scoped>
  .show-view {
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    height: 100%;
    overflow: auto;
  }
  .page-content {
    padding: 10px;
    & ul {
      margin-top: 10px;
      & li {
        border: 1px solid #dcdfe6;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 10px;
        &.checked {
          background-color: rgb(6, 211, 211);
          border-color: transparent;
          color: #fff;
        }
      }
    }
  }
</style>
