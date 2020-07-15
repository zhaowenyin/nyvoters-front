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
      textList: [],
      Polygon_inner: null,
      Polygon_out: null,
      tipMarker: null,
      tipMarkerContent: null,
      div: null
    }
  },
  created () {

  },
  props: {
    code: {
      default: null,
      type: null
    },
    level: {
      default: null,
      type: null
    },
    votersCounts: {
      default: ()=>[],
      type: Array
    }
  },
  watch: {
    code () {
      console.log(88888,this.code)
      let level = ''
      let from = 'click'
      this.locationSearch(`${this.code}`,level,from)
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap(){
      let map = new AMap.Map('container', {
        resizeEnable: true,
        zoomEnable: false,
        dragEnable:false,
        zoom: 6.5,
        center: [113.473719, 33.723493],
        mapStyle:'amap://styles/light'
      });
      this.map = map;
      new AMap.TileLayer({
        map: map,
        zIndex: 2, // 在默认层级之上
        opacity: 0.1
      })
      this.district =  new AMap.DistrictSearch({
        subdistrict: 2,   ////返回下一级行政区。取值2，可以获取到上海的所有区
        extensions: 'all',  //返回行政区边界坐标组等具体信息
        level: 'district'  //查询行政级别为 市
      })
      this.tipMarkerContent  = document.createElement('div')
      this.tipMarkerContent.classList.add('tipMarker', 'top')
      this.tipMarker = new AMap.Marker({
        content: this.tipMarkerContent,
        offset: new AMap.Pixel(0, 0),
        bubble: true
      })
      this.div = document.createElement('div')
      this.tipMarkerContent.appendChild(this.div)
      this.locationSearch(`${this.code}`,this.level)
    },
    locationSearch (code,level,from) {
      let that = this
      if(that.Polygon_inner) {
        that.map.remove(that.Polygon_inner);
      }
      if(that.Polygon_out) {
        that.map.remove(that.Polygon_out);
      }
      if(that.tipMarker) {
        that.map.remove(that.tipMarker)
      }
      that.map.remove(that.textList)
      that.textList = []
      this.district.search(code,function(status,result){
        if(level === '') {
          level = 0
          let map_level = result.districtList[0].level
          if(map_level==='district') {
            level = 2
          } else if (map_level==='city') {
            level = 1
          }
        }
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
        if(level!==''&&level<2){
          that.Polygon_inner = new AMap.Polygon({
            map: that.map,
            path: holes,//设置多边形边界路径
            strokeColor: "#FF33FF", //线颜色
            strokeOpacity: 0.2, //线透明度
            strokeWeight: 3,    //线宽
            fillColor: "rgb(255, 255, 255)", //填充色
            fillOpacity: 1//填充透明度
          });
        }
        that.Polygon_out = new AMap.Polygon( {
          pathL:pathArray,
          strokeColor: '#fd9860',
          strokeWeight: 1,
          fillColor: 'rgba(255,255,255,1)',
          fillOpacity: level!==''&&level<2 ? 1 : 0
        });
        that.Polygon_out.setPath(pathArray);
        that.map.add(that.Polygon_out)
        if(from) {
          that.switch2AreaNode(code)
        } else {
          that.initPointSimplifier(code);
        }

      })
    },
    initPointSimplifier (code) {
      let that = this
      AMapUI.loadUI(['geo/DistrictExplorer'], function(DistrictExplorer) {
        //启动页面
        that.districtExplorer = new DistrictExplorer({
          map: that.map,//关联的地图实例
          eventSupport: true,
          draggable:false,
        });
        that.districtExplorer.on('featureClick', function(e, feature) {
          // 列表中没有数据禁止下钻
          let flag = false
          for(let i of that.votersCounts) {
            let code = i.precinctCode.substring(0,i.precinctCode.length-6)
            if(+code === +feature.properties.adcode) {
              flag = true
              break
            }
          }
          if (!flag) return

          let map_level = feature.properties.level
          let level = null
          if(map_level==='district') {
            level = 2
          } else if (map_level==='city') {
            level = 1
          }else if (map_level==='provice') {
            level = 0
          }
          that.$emit('Searchlist',feature.properties)
          let from = 'click'
          that.locationSearch(feature.properties.adcode,level,from)
        })
        // that.districtExplorer.on('outsideClick', function(e) {
        //   that.districtExplorer.locatePosition(e.originalEvent.lnglat, function(error, routeFeatures) {
        //     console.log(error, routeFeatures)
        //     // if (routeFeatures && routeFeatures.length > 1) {
        //     //   //切换到省级区域
        //     //   that.switch2AreaNode(routeFeatures[1].properties.adcode);
        //     // } else {
        //     //   //切换到全国
        //     that.$emit('Searchlist',that.code)
        //     let from = 'click'
        //     that.locationSearch(that.code,that.level,from)

        //     // }

        //   }, {
        //     levelLimit: 2
        //   });
        // });
        that.districtExplorer.on('featureMouseout featureMouseover', function(e, feature) {
          that.toggleHoverFeature(feature, e.type === 'featureMouseover',
            e.originalEvent ? e.originalEvent.lnglat : null);
        });
        that.switch2AreaNode(code)
      })
    },
    toggleHoverFeature(feature, isHover,position) {
      if (!feature) {
        return;
      }

      this.tipMarker.setMap(isHover ? this.map : null);
      var props = feature.properties;
      if (isHover) {
        //更新提示内容
        this.div.innerHTML = props.name
        let div1 = document.createElement('div')
        let div2 = document.createElement('div')
        let div3 = document.createElement('div')
        for(let i of this.votersCounts) {
          let precinctCode = i.precinctCode.substring(0,i.precinctCode.length-6)
          if(+precinctCode===+props.adcode) {
            div1.innerHTML = `选民总数：${i.peopleNum}`
            div2.innerHTML = `登记选民数：${i.regVotersNum}`
            div3.innerHTML = `登记率：${((+i.regVotersNum / + i.peopleNum)*100).toFixed(2)}%`
            break
          }
        }
        this.div.appendChild(div1)
        this.div.appendChild(div2)
        this.div.appendChild(div3)
        //更新位置
        this.tipMarker.setPosition(position || props.center);
      }
      this.$emit('hoverEvent',feature.properties,isHover)
      //更新相关多边形的样式
      var polys = this.districtExplorer.findFeaturePolygonsByAdcode(props.adcode);
      for (var i = 0, len = polys.length; i < len; i++) {
        polys[i].setOptions({
          fillOpacity: isHover ? 0.5 : 1
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
          'font-size': '12px',
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
        let center = feature.properties.center
        if(feature.properties.name==='卧龙区') {
          center = [center[0]-0.1,center[1]+0.1]
        }
        that.setText(center,feature.properties.name)
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
<style>
.tipMarker.top {
  transform: translate(-50%,-110%);
}
.tipMarker {
  color: #555;
  background-color: rgba(255,254,239,0.9);
  border: 1px solid #7E7E7E;
  padding: 2px 6px;
  font-size: 12px;
  white-space: nowrap;
  display: inline-block;
}
.tipMarker.top:before {
    bottom: -10px;
    border-top-color: #7E7E7E;
}

.tipMarker.top:before, .tipMarker.top:after {
    bottom: -9px;
    left: 0;
    right: 0;
    border-top-color: rgba(255,254,239,0.8);
}
.tipMarker:before, .tipMarker:after {
    content: '';
    display: block;
    position: absolute;
    margin: auto;
    width: 0;
    height: 0;
    border: solid transparent;
    border-width: 5px 5px;
}
.tipMarker.top:before, .tipMarker.top:after {
    bottom: -9px;
    left: 0;
    right: 0;
    border-top-color: rgba(255,254,239,0.8);
}
.tipMarker:before, .tipMarker:after {
    content: '';
    display: block;
    position: absolute;
    margin: auto;
    width: 0;
    height: 0;
    border: solid transparent;
    border-width: 5px 5px;
}
</style>
