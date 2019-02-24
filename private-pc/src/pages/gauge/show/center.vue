<template>
  <div class="center-view">
    <div class="content">
      <div class="left">
        <h2 class="title">选项</h2>
        <div class="left-content">
          <ul>
            <li v-for="(item, index) in checkItem.item.question.options"
                :class="{checked: checkedIndex === index}"
                @click="check(item, index)"
                :key="'options' + index">{{item.label}}</li>
            <li
              :class="{checked: checkedIndex === 'hasNoknow'}"
              @click="check(noKnow, 'hasNoknow')"
              v-if="checkItem.item.question.hasNoknow">不清楚</li>
            <li
              :class="{checked: checkedIndex === 'hasNoAll'}"
              @click="check(noAll, 'hasNoAll')"
              v-if="checkItem.item.question.hasNoAll">以上都不是</li>
          </ul>
        </div>
      </div>
      <div class="right">
        <h2 class="title">显示题目</h2>
        <div class="right-content">
          <template v-if="checkedIndex || checkedIndex === 0">
            <div v-for="(item, index) in showQuestions" :key="'question' + index">
              <h3 v-if="item.length">第{{index + 1}}页</h3>
              <ul v-if="item.length">
                <li v-for="(ques, key) in item"
                    @click="addShow(ques)"
                    :class="{checked: checkOption && checkOption.indexOf(ques.frontend_id) !== -1}"
                    :key="'ques' + key">
                  {{ques.name}}
                </li>
              </ul>
            </div>
          </template>
          <p v-else>请选中选项或选中题目后无隐藏题目</p>
        </div>
      </div>
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
        return {
          item: {
            question: {
              options: []
            }
          },
          index: -1,
          key: -1
        }
      }
    }
  },
  data () {
    return {
      checkedIndex: '',
      checkOption: null,
      noAll: {
        label: '以上都不是',
        value: '以上都不是',
        visibles: []
      },
      noKnow : {
        label: '不清楚',
        value: '不清楚',
        visibles: []
      }
    }
  },
  watch: {
  },
  computed: {
    ...mapState('gauge', {
      renderTree: state => state.renderTree
    }),
    showQuestions () {
      const {renderTree, checkItem} = this
      if (checkItem.index === -1 || checkItem.key === -1) {
        return []
      }
      let list = []
      renderTree.pages.forEach((arr, index) => {
        let ques = []
        if (index >= checkItem.index) {
          arr.forEach((obj, key) => {
            if (!obj.question.isVisible) {
              if (index === checkItem.index) {
                if (key > checkItem.key) {
                  ques.push(obj)
                }
              } else {
                ques.push(obj)
              }
            }
          })
        }
        list.push(ques)
      })
      return list
    }
  },
  methods: {
    clear () {
      this.checkedIndex = ''
      this.checkOption = null
      this.noAll = {
        label: '以上都不是',
        value: '以上都不是',
        visibles: []
      }
      this.noKnow = {
        label: '不清楚',
        value: '不清楚',
        visibles: []
      }
    },
    check (item, index) {
      this.checkedIndex = index
      if (item.value === '不清楚') {
        if (!this.checkItem.item.question.hasNoknow_visibles) this.checkItem.item.question.hasNoknow_visibles = []
        this.checkOption = this.checkItem.item.question.hasNoknow_visibles
      } else if (item.value === '以上都不是') {
        if (!this.checkItem.item.question.hasNoAll_visibles) this.checkItem.item.question.hasNoAll_visibles = []
        this.checkOption = this.checkItem.item.question.hasNoAll_visibles
      } else {
        if (!item.visibles) item.visibles = []
        this.checkOption = item.visibles
      }
    },
    addShow (item) {
      let index = this.checkOption.indexOf(item.frontend_id)
      if (index === -1) {
        this.checkOption.push(item.frontend_id)
      } else {
        this.checkOption.splice(index, 1)
      }
    }
  }
}
</script>
<style scoped>
  .center-view{
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    padding: 20px;
  }
  .content {
    display: flex;
    flex-direction: row;
    flex: 1;
    & .left {
      width: 400px;
    }
    & .right {
      flex: 1;
    }
    & .left, & .right {
      display: flex;
      margin: 0 10px;
      flex-direction: column;
    }
  }
  .left-content {
    padding: 10px;
    & ul {
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
  .right-content {
    padding: 10px;
    & h3 {
      margin-bottom: 10px;
    }
    & ul {
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
  .right-content, .left-content {
    overflow: auto;
    border: 1px solid #dcdfe6;
    flex: 1;
    margin-top: 10px;
    border-radius: 5px;
  }
</style>
