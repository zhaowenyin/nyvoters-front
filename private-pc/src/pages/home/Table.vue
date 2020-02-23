<template>
  <div class="all">
    <div class="common all-title">{{name}}选民登记情况表</div>
    <ul class="register">
      <li class="title">
        登记总览
      </li>
      <li v-for="(i,key) of obj.hander_data5" :key="key" class="common content">
        <div>{{i.label}}</div>
        <div>{{i.value}}</div>
      </li>
    </ul>
    <ul class="register register2">
      <li class="title">
        登记类型统计
      </li>
      <li v-for="(i,key) of obj.registerTypeGraphs" :key="key" class="common content">
        <div>{{i.label}}</div>
        <div>{{i.value}}</div>
      </li>
    </ul>
    <ul class="register">
      <li class="title">
       登记异常统计
      </li>
      <li v-for="(i,key) of obj.reviewFailGraphs" :key="key" class="common content">
        <div>{{i.label}}</div>
        <div>{{i.value}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props: {
    obj: {
      default: () => {},
      type: null
    },
    name: {
      default: '',
      type: String
    }
  },
  methods: {

  }
}
</script>
<style scoped>
.common {
  text-align: center;
  &.all-title {
    border: 1px solid #000;
    line-height: 50px;
    height: 50px;
    background: #fff1ce;
  }
}
.register {
  display:flex;
  background: #deeaf5;
   &.register2 {
      background: #fff1ce;
    }
  & .content {
    flex: 1;
    height: 100px;
    display: flex;
    flex-direction: column;
    & div {
      flex: 1;
      border-right: 1px solid #000;
      border-bottom: 1px solid #000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  & .title {
    width: 200px;
    border: 1px solid #000;
    border-top: none;
    height: 100px;
    text-align: center;
    line-height: 100px;
  }
}
.all {
  font-size: 16px;
}
</style>
