<template>
  <el-dialog
    title=""
    :visible="visible"
    width="700px"
    :before-close="comfirmClose">
    <div v-loading="loading" class="view">
      <div class="view-left">
          <el-tree
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="item.powers"
            :expand-on-click-node="false"
            ref="tree"
            :data="data" />
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
import {setPower} from './service.js'
import { mapActions } from 'vuex'
import {dataList} from './config'
export default {
  data () {
    return {
      loading: false,
      filterText: '',
      selectItem: {},
      data: dataList,
    }

  },
  props:{
    visible: {
      default: false,
      type: Boolean
    },
    item: {
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
  },
  components: {

  },
  methods: {
    ...mapActions('authority', [
      'getListData'
    ]),
    close () {
      this.$emit('update:visible', false)
    },

    async submitForm () {
      let list = this.$refs.tree.getCheckedKeys()
      let params = list.filter(i=>{
        return i
      })
      this.loading = true
      await setPower({powers: params,userId: this.item.id})
      this.close()
      this.getListData()
      this.loading = false
    },
    comfirmClose () {
      this.close()
    }
  },

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
