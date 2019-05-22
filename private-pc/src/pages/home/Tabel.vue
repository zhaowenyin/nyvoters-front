<template>
  <table
    class="the-entity"
    cellspacing="0"
    cellpadding="0"
    border="0">
    <colgroup>
      <col width="95">
      <col>
    </colgroup>
    <tbody>
      <tr>
        <td>
          选区
        </td>
        <td  :key="key" v-for="(i, key) in list">
          <div> {{i.precinctName}}</div>
        </td>
      </tr>
      <tr :key="key" v-for="(i, key) in list1">
        <td>
          {{i.label}}
        </td>
        <td :key="index" v-for="(item, index) in list">
          <div :key="elkey" v-for="(el, elkey) in item">
            <span v-if="elkey===i.key">{{el}}</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  data () {
    return {
      list1: [{label: '人口数', key: 'peopleNum'},{label:'登记选民数', key: 'regVotersNum'},{label:'正式选民数',key: 'votersNum'}, {label:'选民登记率', key: 'regRate'}],
    }
  },
  props: {
    list: {
      default: () => [],
      type: Array
    }
  }
}
</script>
<style scoped>
  .the-entity {
    width: 100%;
     border-collapse: collapse;
    & th,& td{
      border:1px solid #dfe6ec;
      height: 40px;
      padding:5px 10px;
      color: #1f2d3d;
    }
    & th{
      background-color: #eef1f6;
      cursor: pointer;
      border-radius: 5px;
    }
  }
</style>
