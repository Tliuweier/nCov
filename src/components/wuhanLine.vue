<template>
    <div>
        <ve-map :data="chartData" :extend="chartExtend"></ve-map>
    </div>
</template>

<script>
    export default {
        name: "wuhanLine",
        data(){
            this.chartExtend = {
                tooltip:{
                    triggerOn: 'click',
                    enterable:true,
                    formatter:function () {
                        let html = `<p id="specialLook" onclick="myClick">详情</p>`
                        return html;
                    }
                }
            }
            return{
                chartData: {
                    columns: ['位置', '税收', '人口', '面积'],
                    rows: [
                        { '位置': '吉林', '税收': 123, '人口': 123, '面积': 92134 },
                        { '位置': '北京', '税收': 1223, '人口': 2123, '面积': 29234 },
                        { '位置': '上海', '税收': 2123, '人口': 1243, '面积': 94234 },
                        { '位置': '浙江', '税收': 4123, '人口': 5123, '面积': 29234 }
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
    #specialLook{
        pointer-events: all;
    }
</style>
