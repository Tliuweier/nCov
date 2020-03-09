<template>
  <div class="cityContrastWraper">
        <div class="title">
            <em>城市疫情</em>
            累计确诊城市
            <span>{{cityStatis.confirm}}</span>
        </div>
        <div class="content">
            <div class="item zero">
                <p class="num">{{cityStatis.zeroNowConfirm}}</p>
                <p class="text">零病例城市</p>
            </div>
            <div class="progress">
                <p :style="{width: (cityStatis.zeroNowConfirm/cityStatis.confirm*100) + '%'}"></p>
            </div>
            <div class="item has">
                <p class="num">{{cityStatis.notZeroNowConfirm}}</p>
                <p class="text">有病例城市</p>
            </div>
        </div>
        <div class="summary">
            全国累计确诊患者分布于{{cityStatis.confirm}}个城市，目前已有{{cityStatis.zeroNowConfirm}}个城市实现疫情病例“清零”
        </div>
  </div>
</template>

<script>
export default {
    name:'cityContrast',
    props:{
        cityStatis:[Object]
    }
}
</script>

<style lang='stylus'>
    .cityContrastWraper{
        margin: 5.333vw 5.333vw 0;
        .title{
            height 3.733vw;
            line-height 3.733vw;
            font-size 3.733vw;
            em{
                font-weight 700;
                font-style normal;
            }
            span{
                color #f23a3b;
                font-weight 500;
            }
        }
        .content{
            height 14.4vw;
            border-radius 1.6vw;
            margin 3.2vw 0 0;
            background-color #eef4ff;
            display flex;
            justify-content center;
            align-items  center;
            text-align center;
            .item{
                .num{
                    font-size 4.8vw;
                    line-height 4.8vw;
                    height 4.8vw;
                    font-weight 500
                }
                .text{
                    font-size 3.2vw;
                    color #222;
                    height 3.2vw;
                    line-height 3.2vw;
                    margin-top 1.067vw;
                }
            }
            .progress{
                width 46.667vw;
                height 1.6vw;
                background-color #f06061;
                border-radius 1.6vw;
                position relative;
                overflow hidden;
                margin 0 2.667vw;
                p{
                    width 0%;
                    background-color #4dadff;
                    height 100%;
                    border-right .533vw solid #eef4ff;

                }
            }
            .zero{
                color #4dadff;
            }
            .has{
                color #f23a3b;
            }
        }
        .summary{
            line-height 4.267vw;
            font-size 3.2vw;
            color #a6a6a6;
            margin 3.2vw 0 0;
        }
    }
</style>