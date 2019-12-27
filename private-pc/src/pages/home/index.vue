<template>
  <div class="home122">
    <Map class="map" @Searchlist="Searchlist"/>
    <div class="header">
      <div class="header-name">河南省县乡人大选民登记情况</div>
    </div>
    <div class="middel-content">
      <div class="common1">
        <div class="item" style="margin-bottom:10px;">
          <div style="background: rgba(255,255,255,0.7)">
            <div class="img">登记率{{rate}}</div>
          </div>
          <ChartBox>
            <template slot="right">
              <div class="center">
                <Pie1 v-if="data1.length>0" :data="data1"/>
              </div>
            </template>
          </ChartBox>
          <div class="out-bottom">
            <div class="out-bottom-1"></div>
            <div></div>
            <div class="out-bottom-2"></div>
          </div>
        </div>
        <div class="item">
           <div style="background: rgba(255,255,255,0.7)">
             <div class="img">参选地</div>
            </div>
            <ChartBox>
              <template slot="right">
                <div class="center">
                  <Pie2 v-if="data2.length>0" :data="data2" name="right"/>
                </div>
              </template>
            </ChartBox>
           <div class="out-bottom">
            <div class="out-bottom-1"></div>
            <div></div>
            <div class="out-bottom-2"></div>
          </div>
        </div>
      </div>
      <div class="middle"></div>
      <div class="common1">
        <div class="item"  style="margin-bottom:10px;">
          <div style="background: rgba(255,255,255,0.7)">
            <div class="img">民性别分析</div>
          </div>
            <ChartBox>
              <template slot="right" >
                <div class="center">
                   <Pie3 v-if="data3.length>0" :data="data3" name="right"/>
                </div>
              </template>
            </ChartBox>
             <div class="out-bottom">
            <div class="out-bottom-1"></div>
            <div></div>
            <div class="out-bottom-2"></div>
          </div>
        </div>
        <div class="item" >
          <div style="background: rgba(255,255,255,0.7)">
            <div class="img">民年龄分析</div>
          </div>
          <ChartBox>
            <template slot="right">
              <div class="center">
                <Pie4 v-if="data4.length>0" :data="data4" name="right"/>
              </div>
            </template>
          </ChartBox>
           <div class="out-bottom">
            <div class="out-bottom-1"></div>
            <div></div>
            <div class="out-bottom-2"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      <div style="background: rgba(255,255,255,0.7)">
        <div class="img2">河南省各市登记情况</div>
      </div>
      <ChartBox>
        <template slot="right">
          <LineBar
          name="实际筛查人数&比例"
          :colors="['rgba(117,143,247,1)','rgba(67,58,243,1)']"
          :list='data.votersCounts'/>
        </template>
      </ChartBox>
       <div class="out-bottom">
        <div class="out-bottom-1"></div>
        <div></div>
        <div class="out-bottom-2"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Map from './Map'
import { mapMutations } from 'vuex'
import LineBar from './LineBar'
import {getList,bindPhone} from './service.js'
import { getSession } from '../../utils/session'
import ChartBox from './ChartBox'
import Pie1 from '../../components/chart/Pie1'
import Pie2 from '../../components/chart/Pie2'
import Pie3 from '../../components/chart/Pie3'
import Pie4 from '../../components/chart/Pie4'
export default {
  data () {
    const authToken = getSession()
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
      rate: null
    }
  },
  components: {
    Map,
    LineBar,
    ChartBox,
    Pie1,
    Pie2,
    Pie3,
    Pie4
  },
  created () {
    // 初始化清除数据
    if(!this.authToken.phoneNum) {
      this.isfirstLogin()
    }
    this.clearState()
    this.Searchlist(410000)
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
    async Searchlist(code) {
      console.log(code)
      const {data} = await getList('')
      this.data = data.content
      let data2 = this.data.candidateTypeGraphs
      let data3 = this.data.ageGraphs
      let data4 = this.data.ageGraphs
      for (let i of data2) {
        i.name = i.label
      }
      for (let i of data3) {
        i.name = i.label
      }
      for (let i of data4) {
        i.name = i.label
      }
      this.data2 = data2
      this.data3 = data3
      this.data4 = data4
      this.rate = ((+this.data.regVotersNum / +this.data.peopleNum)*100).toFixed(2) + '%'
      this.data1 = [{name: '已登记人数',value:+this.data.regVotersNum},{name: '未登记人数',value:  +this.data.peopleNum - +this.data.regVotersNum}]
    },
    async bindPhone(val) {
      this.bindLoading = true
      await bindPhone({phoneNum: val})
      this.bindLoading = false
    },
  }
}
</script>
<style scoped>
.home122 {
  height: 100%;
  display: flex;
  flex-direction: column;
  position:relative;
  overflow: auto;
  & .header {
    width: 100%;
    height: 120px;
    background: url("../../assets/img/home-top.png") center center no-repeat;
    background-size: 100% 100%;
    z-index: 10;
    text-align: center;
    font-size: 36px;
    line-height: 36px;
    color: #fe8f47;
    font-weight: bold;

  }
  & .middel-content {
    padding: 10px 24px;
    overflow: auto;
    flex: 2.2;
    display: flex;
  & .common1 {
      z-index: 10;
      flex:1;
      display: flex;
      flex-direction: column;
      & .item {
        width: 100%;
        flex: 1;
        display: flex;
        /* background: rgba(255,255,255,0.7); */
        flex-direction: column;
        /* border: 1px solid #fdaf51; */
      }
    }
  }
  & .foot {
    overflow: auto;
    margin: 0px 24px;
    z-index: 10;
    height: 200px;
    flex: 1;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }
}
.header-name {
  padding-top: 40px;
}
.middle {
  flex: 1.5;
  background: rgba(255,255,255,0.7);
}
.img {
  border: 1px solid #fdaf51;
  border-bottom: none;
  width: 100%;
  height:33px;
  background: url("../../assets/img/99.png") center center no-repeat;
  background-size: 100% 100%;
  font-size: 18px;
  color: #fffcf9;
  text-align: center;
  line-height: 33px;
}
.img2{
  border: 1px solid #fdaf51;
  border-bottom: none;
  width: 100%;
  height:38px;
  background: url("../../assets/img/home-bottom.png") center center no-repeat;
  background-size: 100% 100%;
  font-size: 20px;
  color: #fffcf9;
  text-align: center;
  line-height: 38px;
}
.map {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0
}
.out-bottom {
  display: flex;
  margin-left: 4px;
  margin-right: 4px;
  & div {
    flex: 1;
    background: rgba(255,255,255,0.7);
    border-bottom: 1px solid #fdaf51;
    &.out-bottom-1 {
      height: 10px;
      border-left: 1px solid #fdaf51;
      background: rgba(255,255,255,0.7);
      transform:skewX(40deg)
    }
    &.out-bottom-2 {
      height: 10px;
      background: rgba(255,255,255,0.7);
      border-left: none;
      border-right: 1px solid #fdaf51;
      transform:skewX(-40deg);
    }
  }

}
.center {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
