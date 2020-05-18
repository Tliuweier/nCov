<template>
    <div class="provinceNews">
        <div class="up-tips tips-yiqing">
            <span class="title subao">{{provinceName}}疫情</span>
        </div>
        <ul>
            <li v-for="(item,index) in newsList" :key="index">
                <div class="left hasImg" >
                    <div class="title">{{item.title}}</div>
                    <div class="bottom">{{item.srcfrom}}</div>
                </div>
                <div class="img" :style="{'background-image':'url('+item.shortcut+')'}">
                    
                </div>
            </li>
        </ul>
        <p class="btn_more">
            <span>
                更多湖北进展
            </span>
        </p>
    </div>
</template>
<script>
export default {
    name:'provinceNews',
    props:{
        newsList:[Array],
        provinceName:String
    }
}
</script>
<style lang="stylus" scoped>
.provinceNews{
    margin-top: 9.6vw;
    .up-tips {
            height 4.8vw;
            line-height normal;
            box-sizing border-box;
            font-size 3.733vw;
            font-weight 700;
            color #222;
            display flex;
            justify-content space-between
            align-items center;

            .title {
                display inline-block;
                position relative;
                font-size 4.267vw;
            }
            .subao{
                position: relative;
                &::before{
                    content: ".";
                    font-size: 0;
                    line-height: 0;
                    display: block;
                    position: absolute;
                    width: 8.533vw;
                    height: 4.8vw;
                    background: url('../assets/icon_subao.png');
                    background-size: 100% 100%;
                    right: -9.067vw;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
    }

    .tips-yiqing {
            position relative;
            margin 0 5.333vw;
            padding 0;
    }

    .tips {
            color #737373;
            font-size 3.2vw;
            line-height 3.2vw;
            font-weight 400;
            font-style normal;
            margin 1vw 0 0 5.333vw;
    }
    ul{
        margin-bottom: 4vw;
        li{
            margin: 4vw 5.333vw;
            display: flex;
            position: relative;
            justify-content: space-between;
            .hasImg{
                width 60.8vw;
            }
            .left{
                position:relative;
                min-height:12vw;
            }
            .title{
                font-size: 4.267vw;
                line-height: 5.867vw;
                height: 11.733vw;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .bottom{
                font-size: 3.2vw;
                color: #a6a6a6;
                line-height: 3.2vw;
                height: 3.2vw;
                margin-top: 2.133vw;
            }
            .img{
                width: 24.533vw;
                height: 16.8vw;
                background-size: cover;
                background-position: 50%;
                border-radius: 1.6vw;
                margin-left: 4vw;
                display: block;
            }
        }
    }
    .btn_more{
        margin: 0 5.333vw;
        border-radius: 1.6vw;
        background-color: #f7f7f7;
        color: #222;
        font-size: 3.733vw;
        line-height: normal;
        padding: 2.933vw 0;
        text-align: center;
        span{
            display: inline-block;
            position: relative;
            padding-right: 4.8vw;
            &::before{
                content: ".";
                font-size: 0;
                line-height: 0;
                display: block;
                position: absolute;
                width: 3.733vw;
                height: 3.733vw;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                background: url('../assets/country_new_more.png');
                background-size: 100% 100%;
            }
        }
    }
}
</style>