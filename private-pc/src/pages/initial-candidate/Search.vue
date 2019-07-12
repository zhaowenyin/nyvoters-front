<template>
  <div class="search-box">
    <div class="left">
      <el-button size="medium" @click="create" type="primary" icon="el-icon-circle-plus-outline">增加初步候选人</el-button>
      <el-button @click="repealI" size="medium" type="primary" icon="el-icon-delete">撤销资格</el-button>
      <el-button @click="sort" size="medium" type="primary" icon="el-icon-sort">排序调整</el-button>
    </div>
    <el-form
      ref="form"
      :model="searchForm"
      :inline="true"
      class="from">
      <el-form-item
        prop="state">
        <el-select
          v-model="type"
          size="medium"
          style="width: 108px;"
          placeholder="请选择">
          <el-option label="姓名" :value="1"></el-option>
          <el-option label="推荐方式" :value="2"></el-option>
          <el-option label="类型" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="type === 1"
        prop="recommendedPerson">
        <el-input
          class="item"
          size="medium"
          placeholder="请输入关键字"
          v-model.trim="searchForm.recommendedPerson" />
      </el-form-item>
      <el-form-item
        v-if="type === 2"
        prop="recommendType">
         <el-select  size="medium" v-model.trim="searchForm.recommendType" placeholder="请选择推荐方式">
        <el-option
          v-for="item in methodList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </el-form-item>
      <el-form-item
        v-if="type === 3"
        prop="type">
        <el-select  size="medium" v-model.trim="searchForm.type" placeholder="请选择推荐类型">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="submitForm()"
          size="medium"
          icon="el-icon-search"
          type="primary"></el-button>
      </el-form-item>
    </el-form>
    <CreateDialog
      v-if="createDialogVisible"
      :visible.sync='createDialogVisible'
      />
    <Sort
      @updateList="updateList"
      v-if="visible"
      :status="status"
      :visible.sync='visible'
    />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import CreateDialog from './CreateDialog'
import {repeal} from './service.js'
import Sort from '../../components/Sort'

export default {
  data () {
    return {
      type: 1,
      searchForm: {
        recommendedPerson: '',
        recommendType: '',
        type: '',
        item: {}
      },
      methodList: [
        {
          value: 1,
          label: '团体推荐'
        },
        {
          value: 2,
          label: '选民联名推荐'
        }
      ],
      typeList: [
        {
          value: 1,
          label: '区县代表'
        },
        {
          value: 2,
          label: '乡镇代表'
        }
      ],
      createDialogVisible: false,
      visible: false,
      status:'PRELIMINARY_CANDIDATE',
      list1: []
    }
  },
  computed: {
    ...mapState('initialCandidate', {
      multipleSelection: state=>state.multipleSelection,
      list: state => state.list
    }),
  },
  components: {
    CreateDialog,
    Sort
  },
  watch: {
    type () {
      let value={
        recommendedPerson: '',
        recommendType: '',
        type: '',
        item: {}
      }
      this.searchForm = {...value}
    }
  },
  created () {
    // this.getList({statusList:['PRELIMINARY_CANDIDATE']})
  },
  methods: {
    ...mapActions('initialCandidate', [
      'getListData',
    ]),
    // 搜索
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.searchForm))
          params.pageNum = 1
          this.getListData(params)
        }
      })
    },
    create () {
      this.createDialogVisible = true
    },
    repealI () {
      if(this.multipleSelection.length === 0) {
        this.$notify({
          title: '',
          message: '请勾选数据后再操作！',
          type: 'warning'
        });
        return
      }
      if(this.multipleSelection.length > 1) {
        this.$notify({
          title: '',
          message: '请勾选一条数据进行操作！',
          type: 'warning'
        });
        return
      }
      for (let i of this.multipleSelection) {
        if(i.status !== 'PRELIMINARY_CANDIDATE') {
          this.$notify({
            title: '',
            message: '该人员已作为正式候选人/正式代表，不允许撤销！',
            type: 'warning'
          });
          return
        }
      }
      this.$confirm('确认撤销初步候选人资格 。撤销后，人员不显示在初步候选人列表中')
        .then(() => {
          this.repealItem()
        })
        .catch(() => {})

    },
    sort () {
      this.visible = true
    },
    updateList() {
      this.getListData()
    },
    async repealItem() {
      let idList = []
      for (let i of this.multipleSelection) {
        idList.push(i.id)
      }
      let params = {idList}
      await repeal(params)
      const param = JSON.parse(JSON.stringify(this.searchForm))
      param.pageNum = 1
      this.getListData(param)
    }
  }
}
</script>
<style scoped>
  .search-box{
    display: flex;
    margin-bottom: -8px;
    & .left {
      flex: 1;
    }
    & .form {

    }
  }
  .item {
    width: 200px;
  }
</style>
