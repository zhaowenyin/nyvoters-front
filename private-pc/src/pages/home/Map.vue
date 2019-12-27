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
      regionMask: null,
      currentAreaNode: null,
      districtExplorer:null,
      out_adcode: null,
      text: null,
      textList: []

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
        bubble: true,
        zoomEnable: true,
        zoom:6.5,
        center: [113.473719, 33.723493-0.7],
        mapStyle:'amap://styles/light',//
      });
      this.map = map;
      new AMap.TileLayer({
        map: map,
        zIndex: 2, // 在默认层级之上
        opacity: 0.1
      })
      this.locationSearch("410000")
      this.initPointSimplifier(410000);
    },
    locationSearch (code) {
      this.district =  new AMap.DistrictSearch({
        subdistrict: 2,   ////返回下一级行政区。取值2，可以获取到上海的所有区
        extensions: 'all',  //返回行政区边界坐标组等具体信息
        level: 'district'  //查询行政级别为 市
      })
      let that = this
      this.district.search(code,function(status,result){
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
          strokeColor: '#fd9860',
          strokeWeight: 1,
          fillColor: 'rgba(255,255,255,1)',
          fillOpacity: 0.5
        });
        polygon.setPath(pathArray);
        that.map.add(polygon)

      })
    },
    initPointSimplifier (code) {
      let that = this
      AMapUI.loadUI(['geo/DistrictExplorer'], function(DistrictExplorer) {
        //启动页面
        that.districtExplorer = new DistrictExplorer({
          map: that.map,//关联的地图实例
          eventSupport: true,
        });
        that.districtExplorer.on('featureClick', function(e, feature) {
          // that.locationSearch(feature.properties.adcode)
          console.log(feature)
          that.map.remove(that.textList)
          that.textList = []
          that.switch2AreaNode(feature.properties.adcode);
          that.$emit('Searchlist',feature.properties.adcode)
        })
        that.districtExplorer.on('outsideClick', function(e) {
          that.districtExplorer.locatePosition(e.originalEvent.lnglat, function(error, routeFeatures) {
            if (routeFeatures && routeFeatures.length > 1) {
              //切换到省级区域
              that.switch2AreaNode(routeFeatures[1].properties.adcode);
            } else {
              //切换到全国
              that.switch2AreaNode(410000);
            }

          }, {
            levelLimit: 2
          });
        });
        that.districtExplorer.on('featureMouseout featureMouseover', function(e, feature) {
          that.toggleHoverFeature(feature, e.type === 'featureMouseover',
            e.originalEvent ? e.originalEvent.lnglat : null);
        });

        that.switch2AreaNode(code)
      })
    },
    toggleHoverFeature(feature, isHover) {
      if (!feature) {
        return;
      }
      var props = feature.properties;
      //更新相关多边形的样式
      var polys = this.districtExplorer.findFeaturePolygonsByAdcode(props.adcode);
      for (var i = 0, len = polys.length; i < len; i++) {
        polys[i].setOptions({
          fillOpacity: isHover ? 0.9 : 1
        })
      }
    },
    setText (center,name) {
      this.text = new AMap.Text({
        text:name,
        anchor:'center', // 设置文本标记锚点
        draggable:false,
        bubble: true,
        cursor:'pointer',
        angle:0,
        style:{
          'padding': '.2rem .5rem',
          'border-radius': '.25rem',
          'background-color': 'transparent',
          'width': '5rem',
          'border-width': 0,
          'text-align': 'center',
          'font-size': '14px',
          'color': '#00000080'
        },
        position: center
      });
      this.textList.push(this.text)

      this.text.setMap(this.map);
    },
    switch2AreaNode(adcode, callback) {
      this.out_adcode = adcode
      let that = this
      if (this.currentAreaNode && ('' + this.currentAreaNode.getAdcode() === '' + adcode)) {
        return;
      }
      this.loadAreaNode(adcode, function(error, areaNode) {
        if (error) {

          if (callback) {
            callback(error);
          }
          return;
        }
        that.currentAreaNode = window.currentAreaNode = areaNode;
        //设置当前使用的定位用节点
        that.districtExplorer.setAreaNodesForLocating([that.currentAreaNode]);
        that.refreshAreaNode(areaNode);
        if (callback) {
          callback(null, areaNode);
        }
      });
    },
    refreshAreaNode(areaNode) {
      this.districtExplorer.setHoverFeature(null);
      this.renderAreaPolygons(areaNode);
    },
    //加载区域
    loadAreaNode(adcode, callback) {
      this.districtExplorer.loadAreaNode(adcode, function(error, areaNode) {
        if (error) {

          if (callback) {
            callback(error);
          }
          console.error(error);

          return;
        }
        // this.renderAreaPanel(areaNode);
        if (callback) {
          callback(null, areaNode);
        }
      });
    },
    renderAreaPolygons(areaNode) {
      let that = this
      var colors = [
        '#fab98e',
        '#fae0b5',
        '#ffbe75'

      ];
      //更新地图视野
      this.map.setBounds(areaNode.getBounds(), null, null, true);

      //清除已有的绘制内容
      this.districtExplorer.clearFeaturePolygons();

      //绘制子区域
      this.districtExplorer.renderSubFeatures(areaNode, function(feature, i) {
        that.setText(feature.properties.center,feature.properties.name)

        var fillColor = colors[i % colors.length];
        var strokeColor = colors[colors.length - 1 - i % colors.length];
        if(that.out_adcode === 410000) {

          fillColor = that.selectColor(feature.properties.adcode)
          strokeColor = '#fab98e'
        }

        return {
          cursor: 'default',
          bubble: true,
          strokeColor: strokeColor, //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 3, //线宽
          fillColor: fillColor, //填充色
          fillOpacity: 1, //填充透明度
        };
      });

      //绘制父区域
      this.districtExplorer.renderParentFeature(areaNode, {
        cursor: 'default',
        bubble: true,
        strokeColor: '#fab98e', //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 3, //线宽
        fillColor: areaNode.getSubFeatures().length ? null : colors[0], //填充色
        fillOpacity: 0.1, //填充透明度
      });
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
  /* #container {
    margin:0;
    height: 100%;
    opacity: 1;
    background: transparent
  } */

</style>
