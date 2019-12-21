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
      let map = new AMap.Map('container', {
        pitch: 0,//50
        viewMode: '3D',//海量点不支持3D
        dragEnable: true,
        zoomEnable: true,
        zoom:7,
        center: [113.473719, 33.723493],
        mapStyle:'amap://styles/whitesmoke',//
      });
      this.map = map;
      map.on('click',this.checkAndCloseInfo);
      map.on('dragend', this.onMapDragEnd);

      this.search(410000,1)
    },
    checkAndCloseInfo () {

    },
    onMapDragEnd() {
      console.log(this.map.getCenter())
    },
    search (region,dep) {
      let that = this
      dep = typeof dep === 'undefined' ? 1 : dep;
      this.disProvince && this.disProvince.setMap(null);
      this.disProvince = new AMap.DistrictLayer.Province({
        zIndex: 12,
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
          'province-stroke': 'cornflowerblue',
          'city-stroke': 'white', // 中国地级市边界
          'county-stroke': 'rgba(255,255,255,0.5)' // 中国区县边界
        }
      })

      this.disProvince.setMap(this.map);
    },
    getColorByAdcode(adcode) {
      let colors = {}
      if (!colors[adcode]) {
        let gb = Math.random() * 155 + 50;
        colors[adcode] = 'rgb(' + gb + ',' + gb + ',255)';
      }
      return colors[adcode];
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
