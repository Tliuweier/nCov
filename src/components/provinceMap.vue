<template>
    <div class="provinceMap">
         <ve-map  height="93vw" :data="chartData" :settings="chartSettings"   :legend-visible="false"></ve-map>
    </div>
</template>
<script>
export default {
    name:'provinceMap',
    props:{
        chartSettings:[Object],
        MapData:[Object]
    },
    data(){
        this.chartExtend = {
                tooltip:{
                    triggerOn: 'click',
                    enterable:true,
                    formatter:function (params) {

                        window.console.log(params)
                        let html ='';
                        html = `${html}<span style='font-size:8px;text-align:center;line-height:8px;'>${params.name}</span>
                        <span style='font-size:8px;'>${params.data.value}>确诊</span>`
                        return html;
                    }
                },
                visualMap:[{
                    type:'piecewise',
                    pieces:[
                        {gte:10000,label:'10000人及以上',color:'#DE1F05'},
                        {gte:1000,lte:9999,label:'1000-9999人',color:'#FF2736'},
                        {gte:500,lte:999,label:'500-999人',color:'#FF6341'},
                        {gte:100,lte:499,label:'100-499人',color:'#FFA577'},
                        {gte:10,lte:99,label:'10-99人',color:'#FFCEA0'},
                        {gte:1,lte:9,label:'1-9人',color:'#FFE7B2'},
                        {lte:0,label:'0人',color:'#E2EBF4'}
                    ],
                    padding:1,
                    itemGap:3,
                    itemWidth :12,
                    itemHeight:8,
                    textStyle:{
                        color:'#737373',
                        fontSize:'8',
                        lineHeight:12
                    }
                }]
        }
        
        return{
            chartData: {
                columns: ['name', 'confirm'],
                rows: [
                    { 'name': '武汉市', 'confirm': 123},
                ]
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.provinceMap{
    position relative;
    height 93vw;
    margin 4vw 5.333vw 0;
}
</style>