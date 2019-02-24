<template>
  <div class="service-view">
    <div class="service-name" v-if="serviceBagEntity.serves.length">
      <el-input v-model="serviceBagEntity.serves[index].name" placeholder="请输入服务名称" maxlength="18"></el-input>
    </div>
    <div class="flow-chart">
      <template v-if="serviceBagEntity.serves.length">
        <el-form :model="serviceBagEntity.serves[index]">
          <h2 class="title">服务范围：</h2>
          <el-row>
            <el-col :span="12">
              <el-form-item label="居民入组条件:">
                <el-button>点击添加自定义条件</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="执行医生资质:">
                <el-select placeholder="请选择执行医生资质" v-model="serviceBagEntity.serves[index].doctor_qualification"></el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="同一居民服务触发次数限制:">
                每<el-select class="rate" v-model="serviceBagEntity.serves[index].time_limit.unit">
                <el-option label="天" :value="1"></el-option>
                <el-option label="周" :value="2"></el-option>
                <el-option label="月" :value="3"></el-option>
                <el-option label="季" :value="4"></el-option>
                <el-option label="年" :value="5"></el-option>
              </el-select>
                <el-input-number
                  :controls="false"
                  :min="0"
                  v-model="serviceBagEntity.serves[index].time_limit.time"
                  class="rate"></el-input-number>次
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="认证方式:"
                prop="ways"
                :rules="{required: true, message: '请选择认证方式'}">
                <el-select
                  multiple
                  v-model="serviceBagEntity.serves[index].verify_type"
                  placeholder="请选择认证方式">
                  <el-option label="拍照" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="add-handle">
          <h2 class="title">添加操作</h2>
          <el-button @click="addOperation" icon="el-icon-plus" circle size="mini"></el-button>
        </div>
        <div class="table-container">
          <el-table
            :data="serviceBagEntity.serves[index].operations"
            border
            style="width: 100%;">
            <el-table-column
              prop="name"
              label="操作名称"></el-table-column>
            <el-table-column
              prop="type"
              label="操作类型"></el-table-column>
            <el-table-column
              prop="gauge_id"
              label="操作内容"></el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="delOperationHandle(scope.$index)" type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <h2 class="title">配置流程</h2>
        <div class="add-handle">
          <h3 class="title">触发本服务内操作</h3>
          <el-button @click="addFlows" icon="el-icon-plus" circle size="mini"></el-button>
        </div>
        <div class="table-container">
          <el-table :data="serviceBagEntity.serves[index].sequence_flows" border style="width: 100%;">
            <el-table-column label="前序操作" prop="from_operation_name"></el-table-column>
            <el-table-column label="触发条件" prop="expression"></el-table-column>
            <el-table-column label="后续操作" prop="to_operation_name"></el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="delFlowsHandle(scope.$index)" type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="add-handle">
          <h3 class="title">触发服务包内其他服务</h3>
          <el-button @click="addServeOrder" icon="el-icon-plus" circle size="mini"></el-button>
        </div>
        <div class="table-container">
          <el-table :data="serviceBagEntity.serves[index].serve_order_operations" border style="width: 100%;">
            <el-table-column label="前序操作" prop="from_operation_name"></el-table-column>
            <el-table-column label="触发条件" prop="expression"></el-table-column>
            <el-table-column label="间隔时间" prop="time_delay"></el-table-column>
            <el-table-column label="后续服务" prop="serve_name"></el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="delServerHandle(scope.$index)" type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: '起始服务'
    }
  },
  data () {
    return {
      index: 0
    }
  },
  watch: {
    '$route' (val) {
      this.index = val.query.index
    }
  },
  computed: {
    ...mapState('service', {
      serviceBagEntity: state => state.serviceBagEntity
    }),
    serviceEntity () {
      const {index, serviceBagEntity} = this
      return serviceBagEntity.serves[index]
    }
  },
  methods: {
    delFlowsHandle (index) {
      this.serviceBagEntity.serves[this.index].sequence_flows.splice(index, 1)
    },
    delServerHandle (index) {
      this.serviceBagEntity.serves[this.index].serve_order_operations.splice(index, 1)
    },
    delOperationHandle (index) {
      this.serviceBagEntity.serves[this.index].operations.splice(index, 1)
    },
    addOperation () {
      let obj = {
        name: '',
        type: '',
        gauge_id: ''
      }
      this.serviceBagEntity.serves[this.index].operations.push(obj)
    },
    addFlows () {
      let obj = {
        from_operation_name: '',
        expression: '',
        to_operation_name: ''
      }
      this.serviceBagEntity.serves[this.index].sequence_flows.push(obj)
    },
    addServeOrder () {
      let obj = {
        from_operation_name: '',
        expression: '',
        time_delay: 0,
        serve_name: ''
      }
      this.serviceBagEntity.serves[this.index].serve_order_operations.push(obj)
    }
  }
}
</script>
<style scoped>
  .service-view {
    display: flex;
    height: 100%;
    flex-direction: column;
    overflow: auto;
  }
  .service-name {
    margin-bottom: 10px;
  }
  .title {
    margin-bottom: 10px;
    color: #000;
  }
  .rate {
    margin: 0 10px;
  }
  .add-handle {
    display: flex;
    flex-direction: row;
    align-items: center;
    & h2 {
      margin-bottom: 0;
      margin-right: 10px;
    }
  }
  .table-container {
    margin-top: 10px;
    padding: 10px;
  }
  .flow-chart {
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    flex: 1;
    padding: 10px;
  }
</style>
