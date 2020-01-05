<template>
  <div style="overflow-x: hidden;">
    <div class="home-content">
      <Map class="map"
        @Searchlist="Searchlist"
        @hoverEvent="clickMap"
        :votersCounts="votersCounts"
        :code="code"
        v-if="level<3&&authToken.accountRole<4"
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
       <div class="tabel" v-if="(level>2 || next_level_district===2)&&authToken.accountRole>3">
        <Table v-if="data5" :obj="data5" :name="name"/>
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
  </div>
</template>
<script>
import Map from './Map'
import { mapMutations } from 'vuex'
import LineBar from './LineBar'
import {getList,bindPhone} from './service.js'
import { getSession,setSession } from '../../utils/session'
import Pie1 from '../../components/chart/Pie1'
import Pie2 from '../../components/chart/Pie2'
import Pie3 from '../../components/chart/Pie3'
import Pie4 from '../../components/chart/Pie4'
import Table from './Table'

export default {
  data () {
    const authToken = getSession()
    let code = authToken.district.code
    let level = authToken.district.level
    let name = authToken.district.name
    code = code.substring(0,code.length-6)
    return {
      screen: [],
      data: {},
      bindLoading: false,
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
      next_level_district: null
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
    if(!this.authToken.phoneNum) {
      this.isfirstLogin()
    }
    this.clearState()
    let from = 'login'
    this.Searchlist({adcode_obj:{adcode:this.authToken.precinctId},from})
  },
  methods: {
    ...mapMutations('home', [
      'clearState'
    ]),
    isfirstLogin () {
      this.$prompt('手机号','绑定手机号', {
        confirmButtonText: '确定',
        showClose: false,
        showCancelButton: false,
        closeOnClickModal: false,
        inputPattern: /^1[34578]\d{9}$/,
        inputErrorMessage: '手机号格式不正确',
        beforeClose: (action,instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            if(!this.bindLoading) {
              instance.confirmButtonLoading = false
              done()
            }
          } else {
            done()
          }
        }

      }).then(({ value }) => {
        this.bindPhone(value)
      }).catch(() => {

      })
    },
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
          let code = ''
          if(this.authToken.accountRole<4) {
            this.code = i.precinctCode.substring(0,i.precinctCode.length-6)
            code = this.code
            this.level = i.precinctLevel
          } else {
            code = i.precinctId
            this.next_level_district = i.precinctLevel
          }
          this.Searchlist({adcode_obj:{adcode: code,name}})
        }
      })
    },
    handername () {
      let text = this.name
      if(this.authToken.accountRole<4) {
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
    async Searchlist(obj) {
      if(obj.level) {
        this.level = obj.level
      }
      if(obj.adcode_obj.name) {
        this.name = obj.adcode_obj.name
      }
      console.log(obj)
      const {data} = await getList({code:obj.adcode_obj.adcode,from:obj.from || '',accountRole: this.authToken.accountRole})
      this.data1 = []
      this.data2 = []
      this.data3 = []
      this.data4 = []
      this.votersCounts = []
      this.rate = null
      if(data) {
        this.data = data.content
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
        let verifyFailGraphs = this.data.verifyFailGraphs || []
        if(this.data.peopleNum || this.data.peopleNum===0) {
          hander_data5 = [
            {label: '选民总数',value:+this.data.peopleNum},
            {label: '已登记选民人数',value:+this.data.regVotersNum},
            {label: '未登记选民人数',value:  +this.data.peopleNum - +this.data.regVotersNum},
          ]
          this.rate =this.data.peopleNum ? +((+this.data.regVotersNum / +this.data.peopleNum)*100).toFixed(2) + '%' : '0%'
          this.data1 = [{name: '已登记人数',value:+this.data.regVotersNum},{name: '未登记人数',value:  +this.data.peopleNum - +this.data.regVotersNum}]

        }
        this.data5 = {
          registerTypeGraphs: registerTypeGraphs,
          hander_data5: hander_data5,
          verifyFailGraphs: verifyFailGraphs
        }
        this.data2 = data2
        this.data3 = data3
        this.data4 = data4
        this.votersCounts = this.data.votersCounts || []
      }
    },
    setSession,
    async bindPhone(val) {
      this.bindLoading = true
      await bindPhone({phoneNum: val})
      this.authToken.phoneNum = val
      this.setSession(this.authToken)
      this.bindLoading = false
    },
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
  & .common1 {
      z-index: 10;
    }
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
