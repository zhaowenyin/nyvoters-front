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
      district: null

    }
  },
  created () {

  },
  mounted() {
    this.initMap()
    this.aa()
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
      this.district = new AMap.DistrictSearch({
        showbiz:false,
        subdistrict: 1,   //1 返回下一级行政区,0：不返回下级行政区
        extensions: 'all',  //返回行政区边界坐标组等具体信息
        level: 'city'  //查询行政级别为市
      });
      // new AMap.TileLayer({
      //   map: map,
      //   // tileUrl: '../../assets/img/del.png', // s=Galil不加也能渲染
      //   zIndex: 2, // 在默认层级之上
      //   opacity: 0.1
      // })
      map.on('click',this.checkAndCloseInfo);
      // this.search(410000,1)
    },
    checkAndCloseInfo (val) {
      console.log(val)

    },
    search (region,dep) {
      let that = this
      dep = typeof dep === 'undefined' ? 1 : dep;
      this.disProvince && this.disProvince.setMap(null);
      this.disProvince = new AMap.DistrictLayer.Province({
        zIndex: 20,
        adcode: [region],
        depth: dep,
        styles: {
          'fill': function (properties) {
            console.log(11,properties)
            // properties为可用于做样式映射的字段，包含
            // NAME_CHN:中文名称
            // adcode_pro
            // adcode_cit
            // adcode
            let adcode = properties.adcode;
            return that.getColorByAdcode(adcode);
          },
          'province-stroke': '#fc9057',
          'city-stroke': '#fc9057', // 中国地级市边界
          'county-stroke': 'rgba(255,255,255,0.5)' // 中国区县边界
        }
      })

      this.disProvince.setMap(this.map);
    },
    getColorByAdcode(adcode) {
      let colors = {}
      if (!colors[adcode]) {
        // let gb = Math.random() * 155 + 50;
        // colors[adcode] = 'rgb(' + gb + ',' + gb + ',255)';
        colors[adcode] = this.selectColor(adcode)
      }
      return colors[adcode];
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
    aa () {
      let that = this
      this.district.search('999',(status,result)=>{
        that.setMaskOut(that.map,status,result,true);
      })
    },
    setMaskOut(map,status,result,isAll){
      // 外多边形坐标数组和内多边形坐标数组
      var outer = [
        new AMap.LngLat(-360,90,true),
        new AMap.LngLat(-360,-90,true),
        new AMap.LngLat(360,-90,true),
        new AMap.LngLat(360,90,true),
      ];
      var holes = result.districtList[0].boundaries;

      var pathArray = [outer];
      pathArray.push.apply(pathArray,holes);
      new AMap.Polygon({
        map:map,
        path:pathArray,
        zIndex:5,
        bubble:true,
        strokeColor: 'rgb(20,164,173)',
        strokeWeight: 2,
        strokeOpacity:0,
        fillColor: '#292452',//'#000',
        fillOpacity: 0.7,
        strokeStyle:'dashed',//轮廓线样式，实线:solid，虚线:dashed
        strokeDasharray:[10,2,10]
        /*勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在
          ie9+浏览器有效 取值：
          实线：[0,0,0]
          虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
          点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实
          线和10个像素的空白 （如此反复）组成的虚线*/
      });
      if(!isAll)return;
      new AMap.Polygon({
        map:map,
        path:holes,
        zIndex:5,
        bubble:true,
        strokeColor: 'rgb(20,164,173)',
        strokeWeight: 2,
        strokeOpacity:0,
        fillColor: '#292452',//'#000',
        fillOpacity: 0.7,
        strokeStyle:'solid',
        strokeDasharray:[10,2,10]
      });

      // this.regionGroup.add(poly);
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
