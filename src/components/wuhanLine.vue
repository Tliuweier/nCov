<template>
    <div class="wuhanLine">
        <ve-map :data="chinaMapData" height="93vw" :settings="chartSetting" :extend="chartExtend" :legend-visible="false"></ve-map>
    </div>
</template>

<script>
    export default {
        name: "wuhanLine",
        props:['chinaMapData','selected'],
        data(){
            this.chartSetting ={
                digit:1,
                label:{
                    show:true,
                    position:'inside',
                    fontSize:8
                },
                 labelMap: {
                    'nowConfirm': '现有确诊',
                    'confirm':'累计确诊'
                },
                itemStyle: {
                    normal: {
                        borderColor: '#fff'
                    }
                },
                
            }
            this.chartExtend = {
                tooltip:{
                    triggerOn: 'click',
                    enterable:true,
                    formatter:function (params) {
                        let html ='';
                        html = `${html}<span style='font-size:8px;text-align:center;line-height:8px;'>${params.name}</span><br/>
                        <span style='font-size:8px;'>确诊人数：${params.data.value}</span>`
                        return html;
                    }
                },
                visualMap:[{
                    type:'piecewise',
                    pieces:[
                        {gt:10000,label:'10000人及以上',color:'#DE1F05'},
                        {gt:1000,lte:9999,label:'1000-9999人',color:'#FF2736'},
                        {gt:500,lte:999,label:'500-999人',color:'#FF6341'},
                        {gt:100,lte:499,label:'100-499人',color:'#FFA577'},
                        {gt:10,max:99,label:'10-99人',color:'#FFCEA0'},
                        {gte:1,max:9,label:'1-9人',color:'#FFE7B2'},
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
                    columns: ['name', 'nowConfirm'],
                    rows: [
                        { 'name': '湖北', 'nowConfirm': 123, },
                    ]
                }
            }
        },
        methods:{
            handleClick:function () {
                // window.console.log(124)
            }
        }
    }
</script>

<style lang="stylus">
    .wuhanLine{
        position relative;
        height 93vw;
        margin 4vw 5.333vw 0;
        #specialLook{
            pointer-events: all;
        }
    }
</style>
