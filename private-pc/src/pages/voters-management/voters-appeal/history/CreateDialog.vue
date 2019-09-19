<template>
  <el-dialog
    title="详情"
    :visible="visible"
    width="800px"
    :close-on-click-modal="false"
    :before-close="comfirmClose">
    <el-form
      label-width="110px"
      ref="form"
      class="login-form">
      <div class="appeal">申诉内容</div>
      <el-row>
         <el-col :span="12">
          <el-form-item
            label="申述人："
            :rules="[{required: true}]">
            {{data.name}}
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item
            label="身份证号码："
            :rules="[{required: true}]">
            {{data.idNum}}
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item
            label="联系电话："
            :rules="[{required: true}]">
            {{data.phoneNum}}
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item
            label="申诉时间："
            :rules="[{required: true}]">
            {{formatDate(data.createTime)}}
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item
            label="申诉书："
            :rules="[{required: true}]">
            {{data.docName}}
          </el-form-item>
        </el-col>
      </el-row>
       <div class="appeal">处理详情</div>
       <el-row>
         <el-col :span="12">
          <el-form-item
            label="处理结论："
            :rules="[{ required: true}]">
            {{data.status==1?'接受':'驳回'}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="处理人："
            :rules="[{required: true}]">
            {{data.auditer}}
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item
            label="处理时间："
            :rules="[{required: true}]">
             {{formatDate(data.auditTime)}}
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item
            label="处理意见："
            :rules="[{required: true}]">
            {{data.remark}}
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
     <div
        slot="footer"
        class="footer">
          <el-button
          @click="close()"
          size="medium">关闭</el-button>
      </div>
  </el-dialog>
</template>
<script>
import {getDetail} from './service.js'
import { formatDate } from '../../../../utils/format.js'
export default {
  data () {
    return {
      loading: false,
      data: {}
    }

  },
  props:{
    visible: {
      default: false,
      type: Boolean
    },
    id: {
      default: '',
      type: String
    }
  },
  components: {

  },
  created () {
    this.searchDetail({id: this.id})
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    async searchDetail(val) {
      this.loading = true
      const {data} = await getDetail(val)
      this.data = data.content
      this.loading = false
    },
    comfirmClose () {
      this.$confirm('关闭将丢失已编辑的内容，确认关闭？')
        .then(() => {
          this.close()
        })
        .catch(() => {})
    },
    formatDate
  }
}
</script>
<style scoped>
.appeal {
 height: 40px;
 line-height: 40px;
 padding-left: 15px;
 background-color: #f2f2f2;
 color: #d9840d;
}
</style>
<style>
  .table-obj .el-form-item {
    margin: 15px 0;
  }
</style>
