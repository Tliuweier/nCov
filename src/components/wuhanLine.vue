<template>
    <div class="wuhanLine">
        <ve-map :data="chinaMapData" height="80vw" :settings="chartSetting" :extend="chartExtend" :legend-visible="false"></ve-map>
    </div>
</template>

<script>
    export default {
        name: "wuhanLine",
        props:['chinaMapData'],
        data(){
            this.chartSetting ={
                digit:1,
                label:{
                    show:true,
                    position:'inside',
                    fontSize:8
                },
                 labelMap: {
                    'nowConfirm': '现有确诊'
                }
                
            }
            this.chartExtend = {
                tooltip:{
                    triggerOn: 'click',
                    enterable:true,
                    // formatter:function () {
                    //     let html = `<p id="specialLook" onclick="myClick">详情</p>`
                    //     return html;
                    // }
                }
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
                window.console.log(124)
            }
        }
    }
</script>

<style lang="stylus">
    .wuhanLine{
        position relative;
        height 80vw;
        margin 4vw 5.333vw 0;
    }
</style>
