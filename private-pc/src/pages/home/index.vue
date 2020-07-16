<template>
  <div style="overflow-x: hidden;">
    <div class="home-content">
      <div class="header">
        <div class="header-name">{{name + '县乡人大选民登记情况'}}</div>
      </div>
      <div class="middel-content">
        <div class="common1">
          <div class="item">
            <div class="name">登记率</div>
            <div class="center">
              <Pie1 v-if="data1.length>0" :data="data1" :map_show="map_show"/>
              <div class="bottom-text">登记率=已登记人数/总选民数</div>
            </div>
          </div>
          <div class="item">
            <div class="name">参选地</div>
            <div class="center" style="margin-top: -14px;">
              <Pie4 v-if="data2.length>0" :data="data2" :map_show="map_show"/>
            </div>
          </div>
        </div>
        <div class="map" v-if="map_show">
          <div class="map-text">点击地图可查看辖区登记情况</div>
          <img
            class="map-img"
            @click="back"
            src="../../assets/img/back.png"/>
          <Map
          style="width: 100%;height: 100%;"
          @Searchlist="handerSearchlist"
          @hoverEvent="clickMap"
          :votersCounts="votersCounts"
          :code="code"

          :level="level"/>
        </div>
        <div :class="['common1', 'right-voter', {map_show}]">
          <div class="item">
            <div class="name">选民性别分析</div>
            <div class="center" style="margin-left: -5px;">
              <Pie3 v-if="data3.length>0" :data="data3" :map_show="map_show"/>
            </div>
          </div>
          <div class="item">
            <div class="name">选民年龄分析</div>
            <div class="center" style="margin-top: -14px;">
              <Pie2 v-if="data4.length>0" :data="data4" :map_show="map_show"/>
            </div>
          </div>
        </div>
      </div>
      <div :class="['common2', 'bottom-voter', {map_show}]">
        <div class="item" style="margin-right: 10px;">
          <div class="name">选民性别分析</div>
          <div class="center" style="margin-left: -5px;">
            <Pie3 v-if="data3.length>0" :data="data3"/>
          </div>
        </div>
        <div class="item">
          <div class="name">选民年龄分析</div>
          <div class="center" style="margin-top: -14px;">
            <Pie2 v-if="data4.length>0" :data="data4"/>
          </div>
        </div>
      </div>
      <div class="tabel" v-if="next_level_district===2&&!committee">
        <Table v-if="data5&&precinctName" :obj="data5" :name="precinctName"/>
        <Table v-if="data5&&!precinctName" :obj="data5" :name="name"/>
      </div>
      <div class="item foot" v-else>
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
    code = code.substring(0,6)
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
      last_precinct_data: {},
      current_precinct_data: {},
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
  computed: {
    map_show() {
      return this.level < 3 && this.committee
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
    this.Searchlist({precinctId:this.authToken.precinctId,name: this.name,level:this.level,code1:this.authToken.district.code})
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
          this.Searchlist({precinctId,name,level,code,code1: code})
        }
      })
    },
    handerSearchlist(obj) {
      let list = this.votersCounts
      list.forEach(i=>{
        let code = i.precinctCode.substring(0,6)
        if(+code === +obj.adcode) {
          let precinctId = i.precinctId
          let name = i.precinctName
          let level = i.precinctLevel
          this.Searchlist({precinctId,name,level,code1:i.precinctCode})

        }

      })

    },
    back() {
      let {current_precinct_data, last_precinct_data} = this
      let code = last_precinct_data[current_precinct_data.level-1].code1
      if(code) {
        this.code = code.substring(0,6)
        this.Searchlist(last_precinct_data[current_precinct_data.level-1])
      }
    },
    async Searchlist(obj) {
      this.last_precinct_data[obj.level] = obj
      this.current_precinct_data = obj
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
            this.code = obj.code.substring(0,6)
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
        let is_unregistered = null
        if(this.data.peopleNum || this.data.peopleNum===0) {
          hander_data5 = [
            {label: '选民总数',value:+this.data.peopleNum},
            {label: '已登记选民人数',value:+this.data.regVotersNum},
            {label: '登记成功选民数',value:  +this.data.votersNum},
          ]
          is_unregistered = +this.data.peopleNum - +this.data.regVotersNum < 0
          this.rate =this.data.peopleNum ? +((+this.data.regVotersNum / +this.data.peopleNum)*100).toFixed(2) + '%' : '0%'
          this.data1 = [{name: '已登记人数',value:+this.data.regVotersNum},{name: '未登记人数',value:  +this.data.peopleNum - +this.data.regVotersNum}]

        }
        this.data5 = {
          registerTypeGraphs: registerTypeGraphs,
          hander_data5: hander_data5,
          reviewFailGraphs: reviewFailGraphs,
          is_unregistered
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
.bottom-voter{
  display: none !important;
}
.right-voter{
  display: block !important;
}
@media only screen and (max-width: 1600px) {
  .bottom-voter.map_show{
    display: flex !important;
  }
  .right-voter.map_show{
    display: none !important;
  }
}
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
    padding: 3px 10px 0px;
    width: 100%;
    display: flex;
    flex: 1;
    & .map {
      width: 660px;
      height: 600px;
      position: relative;
      border: 10px solid #faaf5a;
      border-radius: 10px;
      margin: 5px 10px 10px;

    }
    & .common1 {
      flex: 1;
      margin: 0px 10px;
    }
  }
}
.map-text {
  position: absolute;
  height: 30px;
  line-height: 30px;
  background-color: #fff;
  bottom: 0px;
  z-index: 1000;
  padding-left: 20px;
  color:#333;
}
.map-img {
  position: absolute;
  top: 10px;
  left: 20px;
  z-index: 1000;
  cursor: pointer;
}
.item {
  height: 308px;
  background: url("../../assets/img/bg1.png") center center no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  padding: 5px 20px 12px;
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
    position: relative;
  }
}
.common2 {
  display: flex;
  padding: 0px 20px;
  & .item {
    flex: 1;
  }
}
.foot {
  position: relative;
  margin: 0px 20px 0px;
  z-index: 10;
  width: inherit;
  height: 324px;
  background: url("../../assets/img/bg.png") center center no-repeat;
  background-size: 100% 100%;
  & .cneter{
    display: block;
  }
}
.tabel {
  padding-left:53px;
  padding-right: 60px;
}
.bottom-text{
  position: absolute;
  bottom: 20px;
  left: 0px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #666666;
}
</style>
