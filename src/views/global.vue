<template>
  <div class="geoDataMap">
    <ve-map height="93vw"  :extend="mapExtend" :data="chartData"  :settings="chartSettings"  :legend-visible="false"></ve-map>
  </div>
</template>
<script>
import hubei from '../data/hubei.json'
export default {
  name: "global",
  data() {
    this.chartSettings = {
        position: 'hubei',
        positionJsonLink:'/json/hubei.json',
        beforeRegisterMap (json) {
            window.console.log(json)
          // edit data here such as:
          // json.features[0].properties.cp = [121.509062, 26.044332]
          return json
        }
    };
    this.mapExtend = {
        geo:{
		map:hubei,
        }
    }
    return {
        chartData:{
            columns: ['位置', ' 人口'],
            rows: [
                { '位置': '武汉', ' 人口': 123 }
            ]
        }
    };
  },
  created(){
      window.console.log(hubei)
  }
};
</script>
<style lang="stylus">
 .geoDataMap{
        position relative;
        height 93vw;
        margin 4vw 5.333vw 0;
        #specialLook{
            pointer-events: all;
        }
    }
</style>