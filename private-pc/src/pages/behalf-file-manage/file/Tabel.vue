<template>
  <div>
    <el-table
      align="center"
      :data="list"
      class="tabel1"
      border>
      <el-table-column
        width="80"
        align="center"
        label="姓名"
        prop="recommendedPerson" />
      <el-table-column
        align="center"
        label="性别"
        prop="gender">
        <template slot-scope="scope">
          {{handlegender(scope.row.gender)}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="年龄"
        prop="age">
      </el-table-column>
      <el-table-column
        label="民族"
        align="center"
        prop="nation">
      </el-table-column>
      <el-table-column
        label="党派"
        align="center"
         width="90"
        prop="party">
        <template slot-scope="scope">
          {{handlepath(scope.row.path)}}
        </template>
      </el-table-column>
      <el-table-column
        min-width="110"
        align="center"
        label="文化程度">
        <template slot-scope="scope">
          {{handleeducation(scope.row.education)}}
        </template>
      </el-table-column>
      <el-table-column
        width="130"
        align="center"
        label="单位及职务">
          <template slot-scope="scope">
          {{scope.row.workUnit+scope.row.post}}
        </template>
      </el-table-column>
      <el-table-column
        width="90"
        align="center"
        label="推荐者">
        <template slot-scope="scope">
          {{scope.row.recommendedPerson}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { formatDate } from '../../../utils/format.js'

export default {
  data () {
    return {

    }
  },
  computed: {
  },
  props: {
    list: {
      defaut: () => [],
      type: Array
    }
  },
  components: {

  },
  created () {

  },
  methods: {
    formatDate,
    handlegender(module) {
      let text = ""
      switch(module) {
      case 0:
        text = '未设置'
        break
      case 1:
        text = '男'
        break
      case 2:
        text = '女'
        break
      default:
        text = '其他'
      }
      return text
    },
    handlepath(module){
      let text = ""
      switch(module) {
      case 1:
        text = '共产党'
        break
      case 2:
        text = '民革党'
        break
      case 3:
        text = '民盟党'
        break
      default:
        text = '民进党'
      }
      return text
    },
    handleeducation(module){
      let text = ""
      switch(module) {
      case 1:
        text = '大学以上'
        break
      case 2:
        text = '大专'
        break
      case 3:
        text = '中专及高中'
        break
      default:
        text = '初中及以下'
      }
      return text
    }
  }
}
</script>
<style scoped>
  .tabel1 {
    height: 100%;
  }
</style>
<style>
 .tabel1.el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid #55585f;
    font-size: 16px;
    color: #55585f;
  }
  .tabel1 {
    & th.is-leaf {
    border-bottom: 1px solid #55585f;
    }
    &.el-table--border {
      border: 1px solid #55585f;
    }
  }
  .tabel1.el-table th.is-leaf {
    font-weight: bold;
  }


  .tabel1.el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
      border-right: 1px solid #55585f;
  }
</style>
