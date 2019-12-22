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

  },
  methods: {
    initMap(){
      JSON.stringify()
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
      map.on('click',this.checkAndCloseInfo);

      this.search(410000,1)
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

    }
  }
}
</script>
<style scoped>
  #container {
    margin:0;
    height: 100%;
    opacity: 1;
  }
</style>
