<template>
  <div style="overflow-x: hidden;">
    <div class="home-content">
      <Map class="map"
        @Searchlist="handerSearchlist"
        @hoverEvent="clickMap"
        :votersCounts="votersCounts"
        :code="code"
        v-if="level<3&&committee"
        :level="level"/>
      <div class="header">
        <div class="header-name">河南省县乡人大选民登记情况</div>
      </div>
      <div class="middel-content">
        <div class="common1">
          <div class="item">
            <div class="name">登记率{{rate}}</div>
            <div class="center">
              <Pie1 v-if="data1.length>0" :data="data1"/>
            </div>
          </div>
          <div class="item">
            <div class="name">参选地</div>
            <div class="center" style="margin-top: -14px;">
              <Pie2 v-if="data2.length>0" :data="data2"/>
            </div>
          </div>
        </div>
        <div class="common1">
          <div class="item">
            <div class="name">选民性别分析</div>
            <div class="center" style="margin-left: -5px;">
              <Pie3 v-if="data3.length>0" :data="data3"/>
            </div>
          </div>
          <div class="item">
            <div class="name">选民年龄分析</div>
            <div class="center" style="margin-top: -14px;">
              <Pie4 v-if="data4.length>0" :data="data4"/>
            </div>
          </div>
        </div>
      </div>
       <div class="tabel" v-if="next_level_district===2&&!committee">
        <Table v-if="data5&&precinctName" :obj="data5" :name="precinctName"/>
        <Table v-if="data5&&!precinctName" :obj="data5" :name="name"/>
      </div>
      <div class="item foot" v-else>
        <div class="name">{{handername()}}登记情况</div>
        <div class="center">
          <LineBar
          name="实际筛查人数&比例"
          :mapInfo = 'mapInfo'
          :isHover="isHover"
          @barClick="barClick"
          :colors="['rgba(117,143,247,1)','rgba(67,58,243,1)']"
          :list='votersCounts'/>
        </div>
      </div>

    </div>

    <el-dialog
      title="绑定手机号"
      width="300px"
      :show-close="false"
      :visible="phone_visible">
      <el-form
        :model="phone_form"
        ref="phone_rule_form"
        :rules="phone_rules">
        <el-form-item prop="phoneNum" label="手机号">
          <el-input
            size="medium"
            placeholder="请输入手机号"
            :maxlength="11"
            v-model.trim="phone_form.phoneNum" />
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button type="primary" @click="bindPhone">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Map from './Map'
import { mapMutations } from 'vuex'
import LineBar from './LineBar'
import {getList,bindPhone,needUpdatePwd} from './service.js'
import { getSession,setSession } from '../../utils/session'
import Pie1 from '../../components/chart/Pie1'
import Pie2 from '../../components/chart/Pie2'
import Pie3 from '../../components/chart/Pie3'
import Pie4 from '../../components/chart/Pie4'
import Table from './Table'
import { phone_reg } from '../../utils/validate'

export default {
  data () {
    const authToken = getSession()
    let code = authToken.district.code
    let level = authToken.district.level
    let name = authToken.district.name
    let precinctName = authToken.precinctName
    code = code.substring(0,code.length-6)
    let committee = authToken.accountRole

    let validate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else {
        if (!phone_reg.test(value)) {
          callback(new Error('请输入正确手机号'))
        }
        callback()
      }
    }

    return {
      screen: [],
      data: {},
      authToken,
      regVotersList: [],
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      votersCounts: [],
      rate: null,
      mapInfo: {},
      isHover: false,
      code: +code,
      data5: null,
      level:level,
      name: name,
      precinctName: precinctName,
      next_level_district: null,
      committee:committee<4 ? true : false,
      phone_visible: false,
      phone_form: {
        phoneNum: ''
      },
      phone_rules: {
        phoneNum: [
          { validator: validate, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    Map,
    LineBar,
    Pie1,
    Pie2,
    Pie3,
    Pie4,
    Table
  },
  created () {
    // 初始化清除数据
    this.clearState()
    needUpdatePwd()
    if(!this.authToken.phoneNum) {
      this.phone_visible = true
    }
    this.Searchlist({precinctId:this.authToken.precinctId,name: this.name,level:this.level})
  },
  methods: {
    ...mapMutations('home', [
      'clearState'
    ]),
    clickMap(obj,isHover) {
      this.mapInfo = obj
      this.isHover = isHover
    },
    barClick (val) {
      let name = ''
      if(val.componentType === "xAxis"){
        name = val.value
      } else {
        name = val.name
      }
      let list = this.votersCounts
      list.forEach(i=>{
        if(i.precinctName === name) {
          let precinctId = i.precinctId
          let level = i.precinctLevel
          let code = i.precinctCode
          this.Searchlist({precinctId,name,level,code})
        }
      })
    },
    handername () {
      let text = this.name
      if(this.precinctName){
        text = this.precinctName
      }
      if(this.committee) {
        switch(this.level) {
        case 0:
          text += '各市'
          break
        case 1:
          text += '各区县'
          break
        case 2:
          text += '区县各乡镇'
          break
        case 3:
          text += '区县各乡镇'
          break
        default:
          text += ''
        }
      } else {
        switch(this.next_level_district) {
        case 1:
          text += '区县各乡镇选区'
          break
        default:
          text += ''
        }
      }
      return text

    },
    handerSearchlist(obj) {
      let list = this.votersCounts
      list.forEach(i=>{
        let code = i.precinctCode.substring(0,i.precinctCode.length-6)
        if(+code === +obj.adcode) {
          let precinctId = i.precinctId
          let name = i.precinctName
          let level = i.precinctLevel
          this.Searchlist({precinctId,name,level})
        }
      })
    },
    async Searchlist(obj) {
      const {data} = await getList(obj.precinctId)
      this.data1 = []
      this.data2 = []
      this.data3 = []
      this.data4 = []
      this.votersCounts = []
      this.rate = null
      if(data) {
        let content = data.content
        this.data = content
        if(obj.name) {
          this.name = obj.name
        }
        // if(typeof content.committee  === 'boolean'){
        this.committee = content.committee
        if(content.committee) {
          this.level = content.level
          if(obj.code) {
            this.code = obj.code.substring(0,obj.code.length-6)
          }
        } else {
          this.next_level_district = content.level
        }
        // }
        let data2 = this.data.candidateTypeGraphs || []
        let data3 = this.data.sexGraphs || []
        let data4 = this.data.ageGraphs || []
        for (let i of data2) {
          i.name = i.label
        }
        for (let i of data3) {
          i.name = i.label
        }
        for (let i of data4) {
          i.name = i.label
        }
        let hander_data5 = []
        let registerTypeGraphs = this.data.registerTypeGraphs || []
        let reviewFailGraphs = this.data.reviewFailGraphs || []
        if(this.data.peopleNum || this.data.peopleNum===0) {
          hander_data5 = [
            {label: '选民总数',value:+this.data.peopleNum},
            {label: '已登记选民人数',value:+this.data.regVotersNum},
            {label: '登记成功选民数',value:  +this.data.votersNum},
          ]
          this.rate =this.data.peopleNum ? +((+this.data.regVotersNum / +this.data.peopleNum)*100).toFixed(2) + '%' : '0%'
          this.data1 = [{name: '已登记人数',value:+this.data.regVotersNum},{name: '未登记人数',value:  +this.data.peopleNum - +this.data.regVotersNum}]

        }
        this.data5 = {
          registerTypeGraphs: registerTypeGraphs,
          hander_data5: hander_data5,
          reviewFailGraphs: reviewFailGraphs
        }
        this.data2 = data2
        this.data3 = data3
        this.data4 = data4
        this.votersCounts = this.data.votersCounts || []
      }
    },
    setSession,
    async bindPhone () {
      this.$refs['phone_rule_form'].validate(async (valid) => {
        if (valid) {
          await bindPhone(this.phone_form)
          this.authToken.phoneNum = this.phone_form.phoneNum
          this.setSession(this.authToken)
          this.phone_visible = false
        }
      })
    }
  }
}
</script>
<style scoped>
.home-content {
  position:relative;
  padding-bottom: 8px;
  & .header {
    width: 100%;
    height: 120px;
    background: url("../../assets/img/home-top.png") center center no-repeat;
    background-size: cover;
    z-index: 10;
    text-align: center;
    font-size: 36px;
    line-height: 120px;
    color: #fe8f47;
    font-weight: bold;
    position: relative;

  }
  & .middel-content {
    padding: 3px 48px 0px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
.item {
  height: 282px;
  width: 535px;
  background: url("../../assets/img/bg1.png") center center no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  padding: 5px 0px 12px;
  position: relative;
  z-index: 10;
  & .name{
    font-size: 18px;
    color: #fffcf9;
    text-align: center;
    line-height: 32px;
  }
  & .center {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.map {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 0
}
.foot {
  position: relative;
  margin: 0px 48px 0px;
  z-index: 10;
  width: inherit;
  height: 324px;
  background: url("../../assets/img/bg2.png") center center no-repeat;
  background-size: 100% 100%;
  & .cneter{
    display: block;
  }
}
.tabel {
  padding-left:53px;
  padding-right: 60px;
}
</style>
