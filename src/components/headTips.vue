<template>
    <div class="headTips" v-if="show">
        <div class="headTips_box">
            <div class="icon_close ac_qs_close" @click="handleClose"></div>
            <div class="h1">
                数据说明
            </div>
            <div class="content">
                <div class="h2"><span class="bold">数据来源：</span>全部数据来源于国家卫健委、各省市区卫健委、各省市区政府以及港澳台官方渠道。</div>
                <div class="h2"><span class="bold">实时数据方面，腾讯新闻的统计方法如下：</span></div>
                <p ><em >1.</em> 本页面的全国疫情数据包括31个省区市、新疆生产建设兵团和港澳台地区的疫情数据。<br
                        ><em >2.</em> 国家卫健委公布数据时，全国总数与国家卫健委保持一致。<br
                       ><em >3.</em>
                    各省卫健委陆续公布数据，如果各省数据总和已经超过之前国家卫健委总数，则直接使用各省数据总和作为全国总数。（计算时，各省的“现有确诊”用“现有确诊人数 = 累计确诊人数 - 累计治愈人数 -
                    累计死亡人数”计算得到，“现有疑似”仅使用国家卫健委每天公布的现有疑似病例总数，而不做新增累计）<br ><em
                    >4.</em>
                    “现有确诊”、“累计确诊”、“现有重症”、“治愈”和“死亡”的“较上日”是指每两天间的新增数值，由当前的全国总数减去国家卫健委前一天公布的数据得到。这个值会随着全国总数的变动而实时变化。<br
                            ><em >5.</em> “现有疑似”的“今日新增”数据取自国家卫健委每日最新公布的“新增疑似病例数”。<br
                            ><em >6.</em>
                    各省卫健委公布数据的发布时间和统计时间段各不相同，故而会在部分时段出现国家总数不等于分省数据之和。</p>
                <p class="h2"><span class="bold">疫情趋势图：</span></p>
                <p>1. 与实时更新的当前确诊/治愈/死亡数据不同，疫情新增趋势、现有确诊/累计确诊/疑似/重症/治愈/死亡趋势图只使用国家和各省市区卫健委的数据，每天更新一次。</p>
                <p>2. 治愈率 = 截至当日累计治愈人数 / 截至当日累计确诊人数。</p>
                <p>3. 病死率 = 截至当日累计死亡人数 / 截至当日累计确诊人数。</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "headTips",
        props:{
            show:[Boolean]
        },
        methods:{
            handleClose:function () {
                this.$emit('returnClose')
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .headTips {
        z-index 999;
        position fixed;
        top 0;
        left 0;
        bottom: 0;
        right 0;
        background rgba(0, 0, 0, .75)

        .headTips_box {
            border-radius 1.666vw;
            background #fff;
            position: fixed;
            left: 10.667vw;
            right: 10.667vw;
            top: 26.667vw;
            bottom: 26.667vw;
            padding: 5.333vw 2.667vw 6.4vw 6.4vw;
            font-size: 3.2vw;
            line-height: 5.333vw;
            .h1{
                font-size: 4.533vw;
                line-height: 5.333vw;
                margin-bottom: 3.2vw;
                font-weight: 500;
                color: #005dff;
            }
            .content{
                position: absolute;
                top: 13.867vw;
                bottom: 6.4vw;
                left: 6.4vw;
                right: 3.733vw;
                overflow-y: auto;
                overflow-x: hidden;
                padding-right: 2.667vw;
                p{
                    margin-bottom 3.2vw;
                }
                .h2{
                    font-weight: 400;
                }
                .bold{
                    font-weight 500;
                    font-style normal;
                }
            }
            .icon_close{
                width: 8vw;
                height: 8vw;
                background: url('../assets/icon_pop_close.png');
                background-size: 100% 100%;
                position: absolute;
                top: -13.333vw;
                right: 0;
            }
        }
    }
</style>
