<template>
  <div>
    <el-table
      align="center"
      :data="list"
      class="tabel1"
      border>
      <el-table-column
        align="center"
        label="姓名"
        prop="name">
          <template slot-scope="scope">
          {{scope.row.a || '画画'}}
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="赞成票">
        <template slot-scope="scope">
          {{scope.row.a || 23}}
        </template>
      </el-table-column>
       <el-table-column
        align="center"
        label="反对票">
        <template slot-scope="scope">
          {{scope.row.a || 23}}
        </template>
      </el-table-column>
       <el-table-column
        align="center"
        label="弃权票">
        <template slot-scope="scope">
          {{scope.row.a || 23}}
        </template>
      </el-table-column>
       <el-table-column
        width="230"
        align="center"
        label="赞成票占投票选民的%">
        <template slot-scope="scope">
          {{scope.row.a || 23}}%
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
.tabel1.el-table th {
  padding: 0px 0;
}
</style>
