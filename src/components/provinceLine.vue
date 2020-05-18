<template>
    <div class="provinceLine">
        <div class="box">
            <div class="text">{{provinceName}}疫情新增趋势</div>
            <div class="item-pack">
                <ve-line  height="60vw" :data="provinceNowConfirmList" :settings="chartSetting" :extend="chartExtend1" ></ve-line>
            </div>
        </div>
         <div class="box">
            <div class="text">{{provinceName}}疫情累计趋势</div>
            <div class="item-pack">
                <ve-line  height="60vw"  :data="provinceConfirmList" :settings="chartSetting"  :extend="chartExtend2"   ></ve-line>
            </div>
        </div>
        <template v-if="city">
            <div class="box">
                <div class="text">{{city}}疫情累计趋势</div>
                <div class="item-pack">
                    <ve-line  height="60vw" :data="cityConfirmList" :settings="chartSetting"  :extend="chartExtend1" ></ve-line>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    name:'provinceLine',
    props:['provinceNowConfirmList','provinceConfirmList','cityConfirmList','provinceName','city'],
    data(){
        this.chartSetting = {
            labelMap:{
                'confirm':'累计确诊',
                'existingConfirm':'现有确诊',
                'heal':'累计治愈',
                'dead':'累计死亡',
                'newConfirm':'新增确诊',
                'newHeal':'新增治愈',
                'newDead':'新增死亡'
            }
        }
        this.chartExtend1={
            grid: {
                    top: "10%",
                    bottom: "15%"
            },
             xAxis: {
                axisLabel: {
                rotate: 30,
                textStyle: {
                    color: "#cccccc",
                    fontSize: 8
                }
                }
            },
            yAxis: {
                axisLabel: {
                show: true,
                textStyle: {
                    color: "#cccccc",
                    fontSize: 8
                }
                }
            },
            color: ["#F06061", "#6ABD7F", "#87878A", ],
            tooltip: {
                textStyle: {
                color: "#fff",
                fontSize: "8"
                },
                extraCssText:'z-index:999',
                confine:true
            },
            legend: {
                icon: "rect",
                left:'3%',
                itemWidth: 7,
                itemHeight: 7,
                textStyle: {
                fontSize: 10,
                color: "#737373"
                }
            }
        }
        this.chartExtend2={
            grid: {
                    top: "10%",
                    bottom: "15%"
            },
             xAxis: {
                axisLabel: {
                rotate: 30,
                textStyle: {
                    color: "#cccccc",
                    fontSize: 8
                }
                }
            },
            yAxis: {
                axisLabel: {
                show: true,
                textStyle: {
                    color: "#cccccc",
                    fontSize: 8
                }
                }
            },
            color: ["#9B0A0E","#F06061", "#6ABD7F", "#87878A", ],
            tooltip: {
                textStyle: {
                color: "#fff",
                fontSize: "8"
                },
                extraCssText:'z-index:999',
                confine:true
            },
            legend: {
                icon: "rect",
                left:'3%',
                itemWidth: 7,
                itemHeight: 7,
                textStyle: {
                fontSize: 10,
                color: "#737373"
                }
            }
        }
        return{
        
        }
    }
}
</script>
<style lang="stylus" scoped>
.provinceLine{
    position relative;
    margin 4vw 5.333vw 0;
    .box{
        height 60vw;
        border-radius: 1.6vw;
        padding: 3.467vw 0 0;
        .text{
            margin 0 3.2vw;
            font-size 3.2vw;
            font-weight 600;
            color #222;
        }
        .item-pack{
            height 50vw;
        }
    }
    
}
</style>