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
          <div> {{i.name}}</div>
        </td>
      </tr>
      <tr :key="key" v-for="(i, key) in list1">
        <td>
          {{i}}
        </td>
        <td :key="index" v-for="(item, index) in list">
          {{item.name}}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  data () {
    return {
      list:[{name: '选区1'},{name: '选区2'},{name: '选区3'},{name: '选区4'},{name: '选区4'}],
      list1: ['人口数','登记选民数','正式选民数', '选民登记率']
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
