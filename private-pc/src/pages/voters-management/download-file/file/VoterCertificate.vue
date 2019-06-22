<template>
  <div class="info">
    <div class="top-title">
      <div>>> {{$route.query.title}}</div>
      <el-button
      type="primary"
      @click="download"
      size="small">下载</el-button>
    </div>
    <el-radio-group @change="change" v-model="radio">
      <el-radio :label="1">正式选民</el-radio>
      <el-radio :label="2">补正选民</el-radio>
    </el-radio-group>
    <div v-if="+type === 7" class="content">

      <div
        class="item"
        v-for="(i, index) in data.list"
        :key="index"
        >
        <div  class="inner-item">
          <div class="announcement1">选民证</div>
          <span>姓名:</span>
          <span class="line">{{i.name}}</span>
          <br/>
          <span>性别:</span>
          <span class="line">{{handlegender(i.gender)}}</span>
          <span>年龄:</span>
          <span class="line">{{i.age}}</span>岁
          <div class="warning">
            <span>注意：</span>
            <div>
              <div>1.凭证参加选举；</div>
              <div>2.只限本人使用；</div>
              <div>3.妥善保管，遗失不补。</div>
            </div>
          </div>
          <div class="mark mark1">{{i.districtName}}选举委员会</div>
          <div class="mark mark2"><span class="date">{{formatDate(i.date).year}}</span>年<span class="date">{{formatDate(i.date).month}}</span>月<span class="date">{{formatDate(i.date).day}}</span>日</div>
        </div>
      </div>
     </div>
     <div v-if="+type === 6" class="content">
       <div
        class="item"
        v-for="(i, index) in data.list"
        :key="index"
        >
        <div  class="inner-item inner-item2">
          <div class="announcement2">选民证</div>
          <div style="display: flex;">
            <span>姓名:</span>
            <span class="line2">{{i.name}}</span>
          </div>
          <div style="display: flex;">
            <span>性别:</span>
            <span class="line2">{{handlegender(i.gender)}}</span>
          </div>
          <div style="display: flex;">
            <span>年龄:</span>
            <span class="line2">{{i.age}}</span>岁
          </div>
          <div class="warning">
            <span>注意事项：</span>
            <div>
              <div>一、凭证参加选举。</div>
              <div>二、只限本人使用。</div>
            </div>
          </div>
          <div class="mark6 mark1">{{i.districtName}}选举委员会</div>
          <div class="mark6"><span class="date">{{formatDate(i.date).year}}</span>年<span class="date">{{formatDate(i.date).month}}</span>月<span class="date">{{formatDate(i.date).day}}</span>日</div>
        </div>
      </div>
     </div>
  </div>
</template>
<script>
import output from '../../../../utils/output.js'
import format from 'date-fns/format'
export default {
  data(){
    return {
      loading: false,
      radio: 1
    }
  },
  props: {
    data: {
      default: null,
      type: null
    },
    type: {
      default: null,
      type: null
    },
    belongAreaId: {
      default: null,
      type: null
    },
  },
  components: {

  },
  created(){

  },
  watch: {
    belongAreaId () {
      this.radio = 1
    }
  },
  methods: {
    async download (item) {
      try {
        output({url: '/doc/download', param: {id: item, module: 2}})
      } catch (err) {
        console.log(err)
      }
    },
    handlegender(module) {
      let text = ""
      switch(module) {
      case 0:
        text = '未设置'
        break
      case 1:
        text = '男'
        break
      case 2:
        text = '女'
        break
      default:
        text = '其他'
      }
      return text
    },
    formatDate (timestamp) {
      return this.data&&timestamp && {year:format(+timestamp, 'YYYY'),month: format(+timestamp, 'MM'),day: format(+timestamp, 'DD')}
    },
    change (type) {
      this.$emit('getlist',type)
    }
  }
}
</script>
<style scoped>
  .info {
    background: #f8f8f8;
    font-family: SimSun;
    height: 100%;
    overflow: auto;
    & .top-title {
      padding: 15px;
      display: flex;
      justify-content:space-between;
    }
  }
  .content {
    margin: 0 auto;
    width: 100%;
    padding: 30px;
    line-height: 40px;
    font-size: 18px;
    display: flex;
    flex-wrap:wrap;
    margin: -20px;
    letter-spacing: 4px;
    color: #55585f;
    & .item {
      padding: 20px;
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .announcement1 {
    font-size: 30px;
    color: #000;
    font-weight: bold;
    padding-bottom: 40px;
    text-align: center;
  }
  .mark {
    text-align: center;
    width: 100%;
  }
  .mark1 {
    padding-top: 30px;
  }
  .mark2 {
    padding-bottom: 30px;
  }
  .inner-item {
    width: 350px;
    background-color: #fff;
    padding: 15px;
  }
  .inner-item2 {
    background-color: #cde7d0;
    border: 1px solid red;
  }

  .line {
    border-bottom: 1px solid #55585f;
    padding: 0 30px;
    padding-left: 10px;
  }
  .line2 {
    border-bottom: 1px solid #55585f;
    width: 160px;
    padding-left: 10px;
  }
  .warning {
    display: flex;
    font-size: 14px;
  }
  .mark6 {
    text-align: right;
  }
  .announcement2 {
    font-size: 24px;
    color: #000;
    font-weight: bold;
    padding-bottom: 40px;
    text-align: center;
    text-decoration:underline;
  }
</style>


