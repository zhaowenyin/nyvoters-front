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
      })
    },
    showBoundary (adcode) {
      let that = this
      this.district.search(adcode,function(status,result){
        let color =  that.selectColor(result.districtList[0].adcode)
        that.setMask(that.map,status,result.districtList[0].boundaries,color)
      })

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


      //绘制子级区划
      districtExplorer.renderSubFeatures(areaNode, function(feature) {
        let fillColor = that.selectColor(feature.properties.adcode)
        that.setText(feature.properties.center,feature.properties.name)
        return {
          cursor: 'default',
          bubble: true,
          strokeColor: '#fab98e', //线颜色
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
        strokeColor: '#fab98e', //线颜色
        fillColor: null,
        strokeWeight: 3, //线宽
      });

      //更新地图视野以适合区划面
      that.map.setFitView(districtExplorer.getAllFeaturePolygons());
    },
    setText (center,name) {
      var text = new AMap.Text({
        text:name,
        anchor:'center', // 设置文本标记锚点
        draggable:true,
        cursor:'pointer',
        angle:10,
        style:{
          'padding': '.2rem .5rem',
          'margin-bottom': '1rem',
          'border-radius': '.25rem',
          'background-color': 'transparent',
          'width': '5rem',
          'border-width': 0,
          'text-align': 'center',
          'font-size': '14px',
          'color': '#333'
        },
        position: center
      });

      text.setMap(this.map);
    },

    selectColor (adcode) {
      // 信阳，三门峡市，平顶山市，焦作市，开封市，"鹤壁市"
      let arr1 = [411500,411200,410400,410800,410200,410600]
      //南阳市，济源市，漯河市，安阳市，商丘市
      let arr2 = [411300,419001,411100,410500,411400]
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
