<template>
  <div class="home1">
    <Map class="map"/>
    <div class="header">
      河南省县乡人大选民登记情况
    </div>
    <div class="middel-content">
      <div class="common1">
        <div class="item" style="margin-bottom:10px;">
          <div class="img">登记率75%</div>
          <div >333</div>
        </div>
        <div class="item">
          <div class="img">参选地</div>
          <div>333</div>
        </div>
      </div>
      <div class="middle"></div>
      <div class="common1">
        <div class="item"  style="margin-bottom:10px;">
          <div class="img">民性别分析</div>
          <div >333</div>
        </div>
        <div class="item" >
          <div class="img">民年龄分析</div>
          <div>333</div>
        </div>
      </div>
    </div>
    <div class="foot">
      <div class="img2">民年龄分析</div>
       <CenbterChart
        name="实际筛查人数&比例"
        :colors="['rgba(117,143,247,1)','rgba(67,58,243,1)']"
        :list='screen'
        :y-titles="['实际筛查人数','比例']"/>
    </div>
  </div>
</template>
<script>
import Map from './Map'
import { mapMutations } from 'vuex'
import CenbterChart from './CenbterChart'
import {getList} from './service.js'
export default {
  data () {
    return {
      screen: [],
      data: {},
    }
  },
  components: {
    Map,
    CenbterChart
  },
  created () {
    this.Searchlist()
  },
  methods: {
    ...mapMutations('home', [
      'clearState'
    ]),
    async Searchlist() {
      const {data} = await getList()
      this.data = data
    },
  }
}
</script>
<style scoped>
.home1 {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  & .header {
    width: 100%;
    height: 60px;
    background: url("../../assets/img/home-top.png") center center no-repeat;
    background-size: 100% 100%;
    z-index: 10;
    text-align: center;
    line-height: 60px;
    font-size: 18px;
    color: #fe8f47;
    font-weight: bold;

  }
  & .middel-content {
    padding: 10px 24px;
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
        background: rgba(255,255,255,0.7);
        flex-direction: column;
        border: 1px solid #fdaf51;


      }
    }
  }
  & .foot {
    margin: 0px 24px;
    z-index: 10;
    height: 200px;
    flex: 1;
    border: 1px solid #fdaf51;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    background: rgba(255,255,255,0.7);
  }

}
.middle {
  flex: 1.5;
}
.img {
  width: 100%;
  height:18px;
  background: url("../../assets/img/home-middle2.png") center center no-repeat;
  background-size: 100% 100%;
  font-size: 10px;
  color: #fffcf9;
  text-align: center;
  line-height: 18px;
}
.img2{
  width: 100%;
  height:24px;
  background: url("../../assets/img/home-bottom.png") center center no-repeat;
  background-size: 100% 100%;
  font-size: 10px;
  color: #fffcf9;
  text-align: center;
  line-height: 24px;
}
.map {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0
}
</style>
