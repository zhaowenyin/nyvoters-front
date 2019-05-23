<template>
  <el-dialog
    title=""
    :visible="visible"
    width="700px"
    :before-close="comfirmClose">
    <div v-loading="loading" class="view">
      <div class="view-left">
          <CommonTree
            show-checkbox
            :expand-on-click-node="false"
            :hasSearch="false"
            :data="data"
            @check="handleClick" />
        </div>
      </div>
    <div
      slot="footer"
      class="footer">
      <el-button
      @click="submitForm()"
      size="medium"
      :loading="loading"
      type="primary">确定</el-button>
      <el-button
      @click="comfirmClose()"
      size="medium">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
// import {drawIn} from './service.js'
import { mapActions } from 'vuex'
import CommonTree from '../../../components/common-tree'
// import func from '../../../utils/func'
export default {
  data () {
    return {
      loading: false,
      filterText: '',
      selectItem: {},
      data: [],
    }

  },
  props:{
    visible: {
      default: false,
      type: Boolean
    },
    ids: {
      default: null,
      type: null
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  computed: {

  },
  created () {
    this.data=[
      {
        name: ' 选民登记',
        type: 1,
        id: '1-1',
        isckeck: false,
        children:[
          {
            name: '选民在线登记',
            id: '1',
            isckeck: false,
          },
          {
            name: '选民批量导入',
            id: '2',
            isckeck: false,
          },
          {
            name: '选民信息查询',
            id: '3',
            isckeck: false,
          }
        ]
      },
      {
        name: ' 选民管理',
        type: 1,
        id: '1-2',
        isckeck: false,
        children:[
          {
            name: '选民资格审查',
            id: '4',
            isckeck: false,
          },
          {
            name: '选民转移管理',
            id: '5',
            isckeck: false,
          },
          {
            name: '选民划入管理',
            id: '6',
            isckeck: false,
          },
          {
            name: '选民划出管理',
            id:'7',
            isckeck: false,
          },
          {
            name: '选民申诉管理',
            id:'8',
            isckeck: false,
          },
          {
            name: '文件资料',
            id: '9',
            isckeck: false,
          }
        ]
      }
    ]
  },
  components: {
    CommonTree
  },
  methods: {
    ...mapActions('votersQualification', [
      'getListData'
    ]),
    close () {
      this.$emit('update:visible', false)
    },

    async submitForm () {
      this.loading = true
      this.close()
      this.getListData()
      this.loading = false
    },
    comfirmClose () {
      this.$confirm('关闭将丢失已编辑的内容，确认关闭？')
        .then(() => {
          this.close()
        })
        .catch(() => {})
    },
    handleClick(data) {
      console.log(data)
      if(data.type) {
        this.data.map(i => {
          if(data.id === i.id) {
            i.isckeck = !i.isckeck
            i.children = i.children.map(item=> {
              item.isckeck = i.isckeck
              return item
            })
          }
          return i
        })
      } else {
        this.data.map(i => {
          let count = 0
          i.children = i.children.map(item=> {
            if(data.id===item.id) {
              item.isckeck = !item.isckeck
            }
            if(item.isckeck) {
              count ++
            }
            return item
          })
          if(count === i.children.length) {
            i.isckeck = true
          } else {
            i.isckeck = false
          }
          return i
        })
      }
      console.log(this.data)
    }
  }

}
</script>
<style scoped>
.view{
    display: flex;
    height: 100%;
  }
  .view-left {
    flex: 1;
    background-color: #ffffff;
  }
</style>
<style>
  .table-obj .el-form-item {
    margin: 15px 0;
  }
</style>
