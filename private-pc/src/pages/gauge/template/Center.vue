<template>
  <div>
    <div class="view">
      <el-form
        ref="form2"
        :model="renderTree"
        class="form2">
        <el-form-item
          prop="name"
          :rules="{
            required: true, validator: nameVali, trigger: 'blur'
          }"
          label="">
          <el-input
            maxlength="16"
            class="item"
            placeholder="请输入量表标题"
            @input="nameInput"
            v-model="renderTree.name" />
        </el-form-item>
      </el-form>

      <el-tabs
        class="tabs"
        v-model="currentIndexStr"
        type="border-card"
        addable
        :closable="renderTree.pages.length > 1"
        @edit="handleTabsEdit">
        <el-tab-pane
          :key="index"
          class="tab"
          v-for="(item, index) in renderTree.pages"
          :label="`第${index + 1}页`"
          :name="`${index}`"
        >
          <el-table
            :data="item"
            :border="true"
            :show-header="false"
            style="width: 100%">
            <el-table-column
              prop="frontend_id"
              width="60px"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              label="操作"
              width="250">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="editItemFn(scope.row.frontend_id, scope.row.type)"
                  size="small">编辑</el-button>
                <el-button
                  type="text"
                  v-if="scope.$index !== 0"
                  @click="up(item, scope.$index)"
                  size="small">上移</el-button>
                <el-button
                  type="text"
                  v-if="scope.$index !== item.length - 1"
                  @click="down(item, scope.$index)"
                  size="small">下移</el-button>
                <el-button
                  type="text"
                  @click="delItemFn(item, scope.$index)"
                  size="small">删除</el-button>
                <el-button
                  type="text"
                  @click="save(scope.row)"
                  size="small">保存至题库</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <CreateQuestion
      v-if="createVisible"
      :id="currentId"
      handleType="edit"
      :type="type"
      :visible.sync="createVisible"/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import CreateQuestion from './CreateQuestion'
import {saveQuestion} from '../service'

export default {
  data () {
    return {
      currentIndexStr: '0',
      createVisible: false,
      currentId: '',
      type: 1
    }
  },
  computed: {
    ...mapState('gauge', {
      renderTree: state => state.renderTree,
    })
  },
  components: {
    CreateQuestion
  },
  watch: {
    currentIndexStr (val) {
      this.renderTree.currentIndex = +val
    }
  },
  created () {

  },
  methods: {
    async save (item) {
      const {name, question, label_id, type, default_answer_config, default_answer_type} = item
      let params = {
        name,
        question: JSON.stringify(question),
        label_id,
        type
      }
      if (default_answer_config) {
        params.default_answer_config = default_answer_config
      }
      if (default_answer_type) {
        params.default_answer_type = default_answer_type
      }
      await saveQuestion(params)
      this.$notify.success({
        title: '提示',
        message: '保存题库成功'
      })
      this.$emit('callback')
    },
    down (item, index) {
      item[index] = item.splice(index + 1, 1, item[index])[0]
    },
    up (item, index) {
      item[index - 1] = item.splice(index, 1, item[index - 1])[0]
    },
    nameInput (value) {
      setTimeout(() => {
        this.renderTree.name = value.replace(/\s/g, '')
      })
    },
    nameVali (rule, value, callback) {
      if (!value.length) {
        callback(new Error('量表标题不能为空'))
      } else if (/select|update|delete|exec|count|'|"|=|;|>|<|%/gi.test(value)) {
        callback(new Error('请勿输入非法字符和SQL关键字！'))
      } else {
        callback()
      }
    },
    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        this.renderTree.pages.splice((this.renderTree.currentIndex + 1), 0, [])
      }
      if (action === 'remove') {
        let activeName = this.currentIndexStr
        let tabs = this.renderTree.pages
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }
        this.currentIndexStr = `${+activeName - 1}`
        this.renderTree.pages.splice(targetName, 1)
      }
    },
    editItemFn(id, type) {
      this.createVisible = true
      this.type = type
      this.currentId = id
    },
    delItemFn(item, index) {
      item.splice(index, 1)
      // for (let page of this.renderTree.pages) {
      //   for (let i = 0, len = page.length; i < len; i++) {
      //     if (page[i].frontend_id === id) {
      //       page.splice(i, 1)
      //       return
      //     }
      //   }
      // }
    }
  }
}
</script>
<style scoped>
  .view{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .tabs{
    flex: 1;
    height: 100%;
    box-shadow: inherit;
    overflow: auto;
  }
  .item{
    width: 100%;
  }
</style>
