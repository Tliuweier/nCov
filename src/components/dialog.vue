<template>
    <div class="dialog" v-if="show">
        <div class="dialog_box">
            <div class="icon_close ac_qs_close" @click="handleClose"></div>
            <div class="h1">
                什么是“现有确诊数”？
            </div>
            <div class="content">
                <p >“现有确诊数”口径取自国家卫健委每日公布的“现有确诊病例数”，该数值反映了当前正在治疗中的确诊人数。</p>
                <p >实时更新时，我们会用“现有确诊人数 = 累计确诊人数 - 累计治愈人数 - 累计死亡人数”计算得到。</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "dialog",
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
    .dialog{
        z-index 999;
        position fixed;
        top 0 ;
        left 0;
        bottom:0;
        right 0;
        background rgba(0,0,0,.75)
        .dialog_box{
            border-radius 1.666vw;
            background #fff;
            position: fixed;
            left: 10.667vw;
            right: 10.667vw;
            top: 40%
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
                padding-right: 2.667vw;
                p{
                    margin-bottom: 3.2vw;
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
