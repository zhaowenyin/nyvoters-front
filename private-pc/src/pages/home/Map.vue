<template>
  <div id="container" >
  </div>
</template>
<script>
export default {
  data() {
    return {
      map: null,
      disProvince: null,
      district: null,
      regionMask: null

    }
  },
  created () {

  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap(){
      let map = new AMap.Map('container', {
        pitch: 0,//50
        viewMode: '3D',//海量点不支持3D
        dragEnable: true,
        zoomEnable: true,
        zoom:6.5,
        center: [113.473719, 33.723493-0.6],
        mapStyle:'amap://styles/light',//
      });
      this.map = map;
      new AMap.TileLayer({
        map: map,
        // tileUrl: '../../assets/img/del.png', // s=Galil不加也能渲染
        zIndex: 2, // 在默认层级之上
        opacity: 0.1
      })
      this.locationSearch()
      this.initPointSimplifier(map);
    },
    locationSearch () {
      this.district =  new AMap.DistrictSearch({
        subdistrict: 2,   ////返回下一级行政区。取值2，可以获取到上海的所有区
        extensions: 'all',  //返回行政区边界坐标组等具体信息
        level: 'city'  //查询行政级别为 市
      })
      let that = this
      this.district.search("410000",function(status,result){
        // 外多边形坐标数组和内多边形坐标数组
        var outer = [
          new AMap.LngLat(-360,90,true),
          new AMap.LngLat(-360,-90,true),
          new AMap.LngLat(360,-90,true),
          new AMap.LngLat(360,90,true),
        ];
        var holes = result.districtList[0].boundaries
        var pathArray = [
          outer
        ];
        pathArray.push.apply(pathArray,holes)
        var polygon = new AMap.Polygon({
          pathL:pathArray,
          strokeColor: '#00eeff',
          strokeWeight: 1,
          fillColor: 'rgba(255,255,255,1)',
          fillOpacity: 0.5
        });
        polygon.setPath(pathArray);
        that.map.add(polygon)
        // var cityArr = result.districtList[0].districtList;
        // for(var i=0;i<cityArr.length;i++){
        //   that.showBoundary(cityArr[i].adcode);
        // }
      })
    },
    showBoundary (adcode) {
      let that = this
      this.district.search(adcode,function(status,result){
        let color =  that.selectColor(result.districtList[0].adcode)
        that.setMask(that.map,status,result.districtList[0].boundaries,color)
      })

    },
    setMask(map,status,bounds,color){
      this.regionMask = new AMap.Polygon({
        map:map,
        path:bounds,
        bubble:true,
        zIndex:100,
        strokeColor: 'rgb(20,164,173)',
        strokeWeight: 10,
        strokeOpacity:0,
        fillColor: color,//'#000',
        fillOpacity: 0.3,
        strokeStyle:'solid',
        strokeDasharray:[10,2,10]
      });
    },
    initPointSimplifier () {
      let that = this
      AMapUI.loadUI(['geo/DistrictExplorer'], function(DistrictExplorer) {
        //启动页面
        that.initPage(DistrictExplorer);
      });
    },
    initPage(DistrictExplorer) {
      let that = this
      //创建一个实例
      var districtExplorer = new DistrictExplorer({
        map: that.map //关联的地图实例
      });

      var adcode = 410000; //全国的区划编码

      districtExplorer.loadAreaNode(adcode, function(error, areaNode) {

        if (error) {
          console.error(error);
          return;
        }
        //绘制载入的区划节点
        that.renderAreaNode(districtExplorer, areaNode);
      });
    },
    renderAreaNode(districtExplorer, areaNode) {
      let that = this

      //清除已有的绘制内容
      districtExplorer.clearFeaturePolygons();

      //just some colors
      var colors = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00"];

      //绘制子级区划
      districtExplorer.renderSubFeatures(areaNode, function(feature, i) {

        var fillColor = colors[i % colors.length];
        var strokeColor = colors[colors.length - 1 - i % colors.length];

        return {
          cursor: 'default',
          bubble: true,
          strokeColor: strokeColor, //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 1, //线宽
          fillColor: fillColor, //填充色
          fillOpacity: 0.35, //填充透明度
        };
      });

      //绘制父级区划，仅用黑色描边
      districtExplorer.renderParentFeature(areaNode, {
        cursor: 'default',
        bubble: true,
        strokeColor: 'black', //线颜色
        fillColor: null,
        strokeWeight: 3, //线宽
      });

      //更新地图视野以适合区划面
      that.map.setFitView(districtExplorer.getAllFeaturePolygons());
    },
    getColorByAdcode(adcode) {
      let colors = {}
      if (!colors[adcode]) {
        colors[adcode] = this.selectColor(adcode)
      }
      return colors[adcode];
    },
    selectColor (adcode) {
      // 信阳，三门峡市，平顶山市，焦作市，开封市，"鹤壁市"
      let arr1 = ['411500','411200','410400','410800','410200','410600']
      //南阳市，济源市，漯河市，安阳市，商丘市
      let arr2 = ['411300','419001','411100','410500','411400']
      //洛阳市，"郑州市，驻马店，周口市，许昌市，新乡市，濮阳市
      // let arr3 = [410300,410100,411700,411600,411000,410700,410900]
      let color = '#fab98e'
      if(arr1.indexOf(adcode)>-1) {
        color = '#fae0b5'
      } else if(arr2.indexOf(adcode)>-1) {
        color = '#ffbe75'
      }
      return color
    },
  }
}
</script>
<style scoped>
  #container {
    margin:0;
    height: 100%;
    opacity: 1;
    background: transparent
  }

</style>
