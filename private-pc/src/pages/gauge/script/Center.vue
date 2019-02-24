<template>
  <div class="center-view">
    <el-card class="card">
      <el-form :model="renderTree">
        <el-form-item
          prop="name"
          :rules="{
            required: true, validator: nameVali, trigger: 'blur'
          }">
          <el-input
            @input="nameInput"
            v-model="renderTree.name"
            placeholder="请输入量表标题"
            maxlength="16"></el-input>
        </el-form-item>
        <el-form-item>
          <div
            v-for="(item, index) in extremeList"
            :key="'extreme' + index">
            <el-card style="margin-bottom: 10px">
              <div slot="header" class="clearfix">
                <span>极值校验</span>
                <el-button style="float: right; padding: 3px 0" @click="del(item)" type="text">删除</el-button>
              </div>
              <div class="option-box">
                <el-select v-model="item.items[0]" style="margin-right: 10px" placeholder="请选择题目">
                  <el-option
                    v-for="(val, key) in numberList"
                    :label="val.name"
                    :value="val.frontend_id"
                    :key="'extreme' + index + key"></el-option>
                </el-select>
                <el-input-number
                  style="margin-right: 10px"
                  :controls="false"
                  :min="0"
                  v-model="item.items[1]"
                  placeholder="请输入最大值"></el-input-number>
                <el-input-number
                  :controls="false"
                  :min="0"
                  v-model="item.items[2]"
                  placeholder="请输入最小值"></el-input-number>
              </div>
            </el-card>
          </div>
          <div v-for="(item, index) in bmiList" :key="'bmi' + index">
            <el-card style="margin-bottom: 10px">
              <div slot="header" class="clearfix">
                <span>BMI</span>
                <el-button style="float: right; padding: 3px 0" @click="del(item)" type="text">删除</el-button>
              </div>
              <div class="option-box">
                <h3>输入</h3>
                <el-select clearable v-model="item.items[0]" style="margin-right: 10px" placeholder="请选择题目">
                  <template v-for="(val, key) in numberList">
                    <el-option
                      v-if="item.items.indexOf(val.frontend_id) === -1 || val.frontend_id === item.items[0]"
                      :label="val.name"
                      :value="val.frontend_id"
                      :key="key"></el-option>
                  </template>
                </el-select>
                <el-select clearable v-model="item.items[1]" style="margin-right: 10px" placeholder="请选择题目">
                  <template v-for="(val, key) in numberList">
                    <el-option
                      v-if="item.items.indexOf(val.frontend_id) === -1 || val.frontend_id === item.items[1]"
                      :label="val.name"
                      :value="val.frontend_id"
                      :key="key"></el-option>
                  </template>
                </el-select>
              </div>
              <div class="option-box">
                <h3>输出</h3>
                <el-select
                  v-model="item.items[2]"
                  clearable
                  style="margin-right: 10px" placeholder="请选择题目">
                  <template v-for="(val, key) in numberList">
                    <el-option
                      v-if="item.items.indexOf(val.frontend_id) === -1 || val.frontend_id === item.items[2]"
                      :label="val.name"
                      :value="val.frontend_id"
                      :key="key"></el-option>
                  </template>
                </el-select>
              </div>
            </el-card>
          </div>
          <div
            v-for="(item, index) in compareList"
            :key="'compare' + index">
            <el-card style="margin-bottom: 10px">
              <div slot="header" class="clearfix">
                <span>数值比较</span>
                <el-button style="float: right; padding: 3px 0" @click="del(item)" type="text">删除</el-button>
              </div>
              <div class="option-box">
                <h3>输入</h3>
                <el-select clearable v-model="item.items[0]" style="margin-right: 10px" placeholder="请选择题目">
                  <template v-for="(val, key) in numberList">
                    <el-option
                      v-if="item.items.indexOf(val.frontend_id) === -1 || val.frontend_id === item.items[0]"
                      :label="val.name"
                      :value="val.frontend_id"
                      :key="key"></el-option>
                  </template>
                </el-select>
                <el-select clearable v-model="item.items[1]" style="margin-right: 10px" placeholder="请选择题目">
                  <template v-for="(val, key) in numberList">
                    <el-option
                      v-if="item.items.indexOf(val.frontend_id) === -1 || val.frontend_id === item.items[1]"
                      :label="val.name"
                      :value="val.frontend_id"
                      :key="key"></el-option>
                  </template>
                </el-select>
              </div>
              <div class="option-box">
                <h3>校验失败提示</h3>
                <div class="valid-input">
                  A&gt;B:
                  <el-input v-model="item.items[2]" placeholder="请输入提示文字" maxlength="18"></el-input>
                </div>
                <div class="valid-input">
                  A=B:
                  <el-input v-model="item.items[3]" placeholder="请输入提示文字" maxlength="18"></el-input>
                </div>
                <div class="valid-input">
                  A&lt;B:
                  <el-input v-model="item.items[4]" placeholder="请输入提示文字" maxlength="18"></el-input>
                </div>
              </div>
            </el-card>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState('gauge', {
      renderTree: state => state.renderTree
    }),
    bmiList () {
      const {renderTree} = this
      return renderTree.validate.filter(item => item.type === 2)
    },
    extremeList () {
      const {renderTree} = this
      return renderTree.validate.filter(item => item.type === 1)
    },
    compareList () {
      const {renderTree} = this
      return renderTree.validate.filter(item => item.type === 3)
    },
    numberList () {
      const {renderTree} = this
      let list = []
      renderTree.pages.forEach((arr) => {
        arr.forEach(item => {
          if (item.type === 4) {
            list.push(item)
          }
        })
      })
      return list
    }
  },
  methods: {
    del (item) {
      const {validate} = this.renderTree
      validate.splice(validate.indexOf(item), 1)
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
    }
  }
}
</script>
<style scoped>
  .center-view{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .card {
    height: 100%;
    overflow: auto;
  }
  .option-box {
    margin-bottom: 10px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
