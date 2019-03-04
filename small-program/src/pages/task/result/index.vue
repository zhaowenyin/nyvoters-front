<template>
  <div class="result">
    <CommonHeader
      :back="onBack"
      :title="$route.query.title || ''"/>
    <div class="content">
      <div
        @click="userinfo(citizen.id)"
        class="name-card">
        <ul class="name-content">
          <li>
            <span class="name">姓&nbsp;&nbsp;名</span>{{citizen.id_name}}
          </li>
          <li>
            <span class="name">性&nbsp;&nbsp;别</span>{{citizen.gender_label}}
          </li>
          <li>
            <span class="name">证件号码</span>{{citizen.id_no}}
          </li>
        </ul>
        <div
          class="row"/>
      </div>
      <ul class="result-content">
        <li
          class="item-content"
          v-for="(value, index) in list"
          @click="nextTask(value)"
          :key="index">
            <div class="left">
              <div class="item-result">{{value.result}}</div>
              <div
                v-if="value.task_index"
                class="item-next">继续{{value.task_name}}任务</div>
            </div>
            <div
              v-if="value.task_index"
              class="row"/>
        </li>
      </ul>
      <div
        class="self"
        v-if="hasNextTask">
        <div class="small-title">
          <div class="line"/>
          <div class="text">系统检测到您还可以继续完成以下服务</div>
        </div>
        <div class="out">
          <ul :style="{width:`${self_serve_orders.length*120}px`}" class="near-residents" >
            <li
              @click="itemService(i)"
              :key="index"
              class="residents-item"
              v-for="(i,index) in self_serve_orders">
              <div class="name">{{i.name}}</div>
              <div :class="['date',{'date2':i.color}]">{{i.label}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="self similar"
        v-if="hasNextTask">
         <div class="small-title">
          <div class="line"/>
          <div class="text">您还可以为附近居民继续服务</div>
        </div>
        <ul
          :key="index"
          class="info"
          v-for="(i,index) in family_serve_orders">
          <li class="top-content">
            <ul>
              <li class="top"><span class="label">{{i.id_name}}</span><span class="label1" v-if="i.age">{{i.age}}岁</span>{{i.gender_label}}<li>
              <li class="id_no">{{i.id_no}}</li>
              <li class="crowds">
                <div
                  class="crowds-item"
                  v-for="(item,key) in i.crowds_short"
                  :key="key"
                >
                  {{item.label}}
                </div>
              </li>
            </ul>
            <img v-if="i.follow_state ===2 || i.follow_state ===3" style="width: 50px;height: 50px;" src="../../../assets/newVerson-img/shifang.png"/>
          </li>
          <li
            v-if="i.serve_orders.length>0"
            @click="waitTo(i)"
            class="task">待办任务{{i.serve_orders.length}}<img style="width: 12px;margin-left: 5px;" src="../../../assets/newVerson-img/down.png"/></li>
          <div
            v-if="i.isshow"
            class="out">
          <ul :style="{width:`${i.serve_orders.length*120}px`}" class="near-residents" >
            <li
              @click="itemService(el)"
              :key="elKey"
              class="residents-item"
              v-for="(el,elKey) in i.serve_orders">
              <div class="name">{{el.name}}</div>
              <div :class="['date',{'date2':el.color}]">{{el.label}}</div>
            </li>
          </ul>
        </div>
        </ul>

      </div>
      <div
        @click="jup"
        v-if="hasNextTask && citizen.location_id" class="more">查询更多相同自然村的居民 >></div>
    </div>
     <Model
      @close="close"
      @comfire="comfire"
      v-if="toast"
      :toast.sync="toast"
      :value="''"
      :comfireTitle="'确定'"
      :title="error_message"
    />
  </div>
</template>
<script>
import CommonHeader from '../../../components/CommonHeader'
import { mapState, mapMutations, mapActions } from 'vuex'
import { Indicator, MessageBox, Toast } from 'mint-ui'
import {getOrderVerifyType,verify} from '../service.js'
import Model from '../medicine/selector/Model'
export default {
  data () {
    return {
      loading1: false,
      error_message: '',
      toast: false
    }
  },
  components: {
    CommonHeader,
    Model
  },
  async beforeRouteLeave (to, from, next) {
    if (to.path === '/task') {
      return next()

    }
    let hasNextTask = false
    for (let obj of this.list) {
      if (obj.task_index) {
        hasNextTask = true
        break
      }
    }
    if (hasNextTask) {
      const data = await MessageBox({
        title: '',
        message: '还有后续任务需要完成，确认是否要退出？',
        showCancelButton: true,
        confirmButtonText: '确认退出'
      })
      if (data === 'confirm') {
        window.postMessage(JSON.stringify({
          name: 'goBack'
        }))
      }
      next(false)
    } else {
      window.postMessage(JSON.stringify({
        name: 'goBack'
      }))
      next(false)
    }
  },
  created () {
    let {resultId, serve_order_id, task_index, citizen_id, source = 'app'} = this.$route.query
    if(resultId) {
      this.searchResultList({
        gauge_result_id: resultId,
        serve_order_id,
        task_index,
        citizen_id,
        source
      })
    }
  },
  watch: {
    loading (val) {
      val ? Indicator.open() : Indicator.close()
    }
  },
  computed: {
    ...mapState('task', {
      resultData: state => state.resultData,
      loading: state => state.loading
    }),

    list () {
      return this.resultData.script_result || []
    },
    citizen () {
      return this.resultData.citizen || {}
    },
    recommend () {
      return this.resultData.recommend || {}
    },

    family_serve_orders () {
      let current_time = new Date().getTime()
      for(let item of this.recommend.family_serve_orders || []) {
        for(let i of item.serve_orders) {
          if(i.validity_begin <= current_time){
            i.label = this.getDaysBetween(current_time,i.validity_end)+"天后截止"
            i.color = true
          }else{
            i.label = this.getDaysBetween(current_time,i.validity_begin)+"天后开始"
            i.color = false
          }
        }
      }
      return this.recommend.family_serve_orders
    },
    self_serve_orders () {
      let current_time = new Date().getTime()
      for(let i of this.recommend.self_serve_orders || []) {
        if(i.validity_begin <= current_time){
          i.label = this.getDaysBetween(current_time,i.validity_end)+"天后截止"
          i.color = true
        }else{
          i.label = this.getDaysBetween(current_time,i.validity_begin)+"天后开始"
          i.color = false
        }
      }
      return this.recommend.self_serve_orders || []
    },
    hasNextTask () {
      let hasNextTask = false
      for (let obj of this.list) {
        if (obj.task_index) {
          hasNextTask = true
          break
        }
      }
      return !hasNextTask && this.resultData.recommend
    },
  },
  methods: {
    ...mapMutations('task', [

    ]),
    ...mapActions('task', [
      'searchResultList'
    ]),
    userinfo (id) {
      window.postMessage(JSON.stringify({
        name: 'pushStack',
        url: 'PatientInfo',
        params: {
          patientId: id
        }
      }))
    },
    nextTask (obj) {
      if (!obj.task_index) return
      this.$router.push({
        path: '/task',
        query: {
          title: this.$route.query.title,
          serve_id: obj.serve_order_id,
          task_index: obj.task_index,
          source: this.$route.query.source
        }
      })

    },
    async onBack () {
      let hasNextTask = false
      for (let obj of this.list) {
        if (obj.task_index) {
          hasNextTask = true
          break
        }
      }
      if (hasNextTask) {
        const data = await MessageBox({
          title: '',
          message: '还有后续任务需要完成，确认是否要退出？',
          showCancelButton: true,
          confirmButtonText: '确认退出'
        })
        if (data === 'confirm') {
          window.postMessage(JSON.stringify({
            name: 'goBack'
          }))
        }
      } else {
        window.postMessage(JSON.stringify({
          name: 'goBack'
        }))
      }
    },
    getDaysBetween(start,end) {
      const seconds = end - start
      if(seconds>86400000)return Math.floor(seconds/86400000)+'天';
      if(seconds>3600000) return Math.floor(seconds/3600000)+'小时';
      if(seconds>60000)return Math.floor(seconds/60000)+'分钟';
      if(seconds>1000)return Math.floor(seconds/1000)+'秒';
    },
    jup () {
      window.postMessage(JSON.stringify({
        name: 'pushStack',
        url: 'MyPatient',
        params: {
          patientFilter:{villageSelected:{value:this.citizen.location_id,count:1}}
        }
      }))
    },
    waitTo (val) {
      this.recommend.family_serve_orders = this.recommend.family_serve_orders.map(i => {
        if(val.id_no === i.id_no) {
          i.isshow = !i.isshow
        }
        return i
      })
    },
    async itemService(val) {
      if(!val.color) {
        return
      }
      try {
        this.loading1 = true
        const {data} = await getOrderVerifyType(val.id)
        let {error_message,verify_type,follow_state} = data
        if(follow_state === 3){
          Toast({
            message: '该居民已永久失访',
            position: 'bottom',
            duration: 3000
          })
          return
        }
        if(error_message){
          this.error_message = error_message
          this.toast = true
        }else{
          const params = {serviceName:val.name,service_id:val.id,citizen_id:val.citizen_id,follow_state,verify_type}
          if(verify_type===1){
            window.postMessage(JSON.stringify({
              name: 'pushStack',
              url: 'Verify',
              params: {
                serviceInfo:params
              }
            }))
            // Navigation.navigate("",{serviceInfo:params})
          }else{
            const {data} =  await verify(val.id,val.citizen_id,3)
            const {order_state,tasks = []} = data
            if(order_state === 1){
              //未开始,直接做任务
              // Tools.forward2template(this.props.navigation,val.id,tasks[0].index,tasks[0].name)
              this.$router.push({
                path: '/task',
                query:{
                  serve_id: val.id,
                  task_index: tasks[0].index,
                  title: tasks[0].name,
                  source: 'app'
                }
              })
            }else{
              // Navigation.navigate("ChoseOperate",{operates:Object.assign(data,params)})
              window.postMessage(JSON.stringify({
                name: 'pushStack',
                url: 'ChoseOperate',
                params: {
                  operates:Object.assign(data,params)
                }
              }))
            }
          }
        }
      }finally {
        this.loading1 = false
      }

    },
    close () {
      this.toast = false
    },
    confirm() {
      this.toast = false
    }
  }
}
</script>
<style scoped>
  .result {
    width: 100%;
    height: 100%;
    background:rgba(242,242,242,1);
    display: flex;
    flex-direction: column;
  }
  .name-card {
    margin: 8px 10px;
    display: flex;
    background:rgba(255,255,255,1);
    align-items: center;
    border-radius:8px;
    padding: 0px 10px 0px 25px;
    & .name-content {
      flex: 1;
      border-radius:8px;
      padding: 18px 0px 5px;
      & li {
        padding-bottom: 12px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
          & .name {
          margin-right: 20px;
          font-size:14px;
          font-weight:400;
          color:rgba(102,102,102,1);
          }
      }
    }
  }
  .result-content {
    margin-top: 20px;
  }
  .item-content {
    display: flex;
    align-items: center;
    background: #fff;
    margin: 0px 10px 8px;
    border-radius:4px;
    padding: 12px 10px;
    & .left{
      flex: 1;
      & .item-result {
        line-height:28px;
        color: #333;
        font-size: 16px;
        /* overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; */
      }
      & .item-next {
        font-size:13px;
        font-weight:400;
        color:#06D3D3;
        line-height:20px;
        margin-top: 8px;
      }
    }
  }
  .row {
    width:0;
    height:0;
    border-left:8px solid #444;
    border-top:7px solid transparent;
    border-bottom:7px solid transparent;
    position: relative;
    margin-left: 10px;
    &:after{
      content: '';
      display: block;
      position: absolute;
      top: -7px;
      left: -10px;
      border-left:8px solid #fff;
      border-top:7px solid transparent;
      border-bottom:7px solid transparent;
    }
  }
  .content {
    flex: 1;
    overflow: auto;
    padding-bottom: 20px;
  }
  .self {
    background:rgba(255,255,255,1);
    padding: 8px 0px 12px 0;
  }
  .similar {
    margin-top: 8px;
    & .small-title {
       margin-bottom: 16px;
    }
  }
  .small-title {
    display: flex;
    align-items: center;
    & .line {
      width:4px;
      height:12px;
      background:rgba(6,211,211,1);
    }
    & .text {
      flex: 1;
      padding-left: 12px;
      font-size:12px;
      font-weight:500;
      color:rgba(6,211,211,1);
      line-height:16px;
    }
  }
  .out {
    width: 100%;
    overflow: auto;
  }
  .near-residents {
    margin: 16px 0 12px 8px;
    border-radius:4px;
    display: flex;
    & .residents-item {
      width:120px;
      height:88px;
      background:rgba(250,250,250,1);
      border-radius:4px;
      border:1px solid rgba(238,238,238,1);
      padding: 10px 10px 16px 10px;
      margin-right: 10px;
      & .name {
        height: 31px;
        text-align: center;
        font-weight:400;
        line-height:16px;
        font-size: 13px;
        color:rgba(153,153,153,1);
        margin-bottom: 16px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      & .date {
        font-size:10px;
        font-weight:400;
        color:rgba(153,153,153,1);
        text-align: center;
      }
       & .date2{
        height:20px;
        background:rgba(6,211,211,1);
        border-radius:4px;
        line-height: 20px;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
    }
  }
  .info {
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(216,216,216,1);
    margin:0 8px 7px 7px;
    padding: 8px 0px 0px 0px;
    & .top-content {
      display: flex;
      justify-content:space-between;
      align-items: center;
      padding: 0 13px;
    }
    & li {
      & .label {
        padding-right: 26px;
      }
      & .label1 {
        padding-right: 10px;
      }
    }
    & .crowds {
      display: flex;
      & .crowds-item {
        background-color:#EEEEEE;
        font-size:9px;
        color:#666666;
        margin-right: 6px;
        height:16px;
        width:16px;
        line-height: 16px;
        border-radius:4px;
        text-align:center;
      }
    }
    & .id_no {
      font-size:14px;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:20px;
      margin-top: 8px;
    }
    & .top {
      font-size:18px;
      font-weight:400;
      color:rgba(0,0,0,1);
      line-height:28px;
    }
    & .task {
      font-size:10px;
      font-weight:400;
      color:rgba(153,153,153,1);
      height: 40px;
      line-height:40px;
      text-align: center;
      border-top: 1px solid rgba(216,216,216,1);
      margin-top: 12px;
    }
  }
  .more {
    margin-top: 8px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size:15px;
    font-weight:400;
    color:rgba(6,211,211,1);
    background:rgba(255,255,255,1)
  }
</style>
