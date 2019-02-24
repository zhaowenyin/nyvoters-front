<template>
  <div class="service-edit">
    <div class="left">
      <el-button class="start-btn" @click="viewFlow">流程图</el-button>
      <p class="flow-title">起始服务</p>
      <el-button
        class="start-btn"
        v-if="serviceBagEntity.serves.length === 0"
        @click="serviceSetting">点击配置起始服务</el-button>
      <p v-else
         @click="showStart"
         class="service-name">{{serviceBagEntity.serves[0].name}}</p>
      <div class="follow-up">
        <p class="flow-title">后续服务</p>
        <el-button icon="el-icon-plus" circle size="mini" @click="add"></el-button>
      </div>
      <ul>
        <template v-for="(item, index) in serviceBagEntity.serves">
          <li
            v-if="index !== 0"
            :key="'service' + index">
            <p>{{item.name}}</p>
            <el-button type="text" @click.stop="del(index)" icon="el-icon-close"></el-button>
          </li>
        </template>
      </ul>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {serviceEntity} from '../config'
export default {
  data () {
    return {
      index: 0
    }
  },
  computed: {
    ...mapState('service', {
      serviceBagEntity: state => state.serviceBagEntity
    })
  },
  methods: {
    serviceEntity,
    del (index) {
      this.serviceBagEntity.serves.splice(index, 1)
    },
    viewFlow () {
      this.$router.push('/serviceEdit')
    },
    add () {
      let serviceEntity = this.serviceEntity()
      this.serviceBagEntity.serves.push(serviceEntity)
      this.index = this.serviceBagEntity.serves.length - 1
      this.$router.push({path: '/serviceEdit/service', query: {index: this.index}})
    },
    serviceSetting () {
      let serviceEntity = this.serviceEntity()
      this.serviceBagEntity.serves.unshift(serviceEntity)
      this.index = 0
      this.$router.push({path: '/serviceEdit/service', query: {index: 0}})
    },
    showStart () {
      this.$router.push({path: '/serviceEdit/service', query: {index: 0}})
    }
  }
}
</script>
<style scoped>
  .service-name {
    border: 1px solid #dcdfe6;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    text-align: center;
  }
  .follow-up {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    & .flow-title {
      margin-bottom: 0;
      flex: 1;
    }
  }
  .flow-title {
    text-align: center;
    margin-bottom: 10px;
  }
  .start-btn {
    width: 100%;
    margin-bottom: 10px;
  }
  .left {
    & ul {
      padding: 10px 0;
      margin-top: 10px;
      & li {
        border: 1px solid #dcdfe6;
        padding: 5px 10px;
        border-radius: 5px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
  .service-edit {
    display: flex;
    flex: 1;
    flex-direction: row;
    & .left {
      width: 300px;
      border: 1px solid #dcdfe6;
      border-radius: 5px;
      padding: 10px;
      justify-content: center;
    }
    & .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 20px;
    }
  }
  .flow-chart {
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    flex: 1;
    margin-top: 20px;
  }
</style>
