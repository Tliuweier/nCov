<template>
    <div class="provinceTable">
        <div class="up-tips tips-yiqing">
            <span class="title">{{provinceName}}疫情(包括港澳台)</span>
        </div>
        <span class="tips">7:00-10:00为更新高峰，数据如有滞后请谅解</span>
        <div class="table">
            <ul class="table-header">
                <li >地区</li>
                <li >新增</li>
                <li>累计确诊</li>
                <li>治愈</li>
                <li>死亡</li>
                <!-- <li>死亡率</li> -->
            </ul>
            <ul class="table-body">
                <li v-for="(item,index) in data" :key="index" class="table-province" >
                    <div class="item-gray item-img_down item_font"  :id="item.pinyin+index"  >{{item.name}}</div>
                    <div class="item-stress">{{item.today.confirm}}</div>
                    <div>{{item.total.confirm}}</div>
                    <div>{{item.total.heal}}</div>
                    <div>{{item.total.dead}}</div>
                    <!-- <div>{{(item.total.dead/item.total.confirm)|numFilter}}</div> -->
                    <ul :id="item.pinyin" class="table-expand table-expand-hidden">
                        <li v-for="(it,idx) in item.children" :key="idx" class="table-city">
                            <div class="item-gray">{{it.name}}</div>
                            <div class="item-stress">{{it.today.confirm}}</div>
                            <div>{{it.total.confirm}}</div>
                            <div>{{it.total.heal}}</div>
                            <div>{{it.total.dead}}</div>
                            <!-- <div>{{(it.total.dead/it.total.confirm)|numFilter}}</div> -->
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'provinceTable',
    props:{
        data:[Array,Object],
        provinceName:String
    }
}
</script>
<style lang="stylus" scoped>
.provinceTable{
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
    .table{
            font-size 3.2vw;
            margin 4vw 5.333vw 0;
            .table-header{
                height 10.667vw;
                li{
                    height 10.667vw;
                    line-height 10.667vw;
                    &:first-child {
                        background #f5f5f5;
                    }
                    &:nth-child(2){
                        background #e8effc;
                        color #005dff;
                    }
                    &:nth-child(3){
                        background #fdeeee;
                        color #f55253;
                    }
                    &:nth-child(4){
                        background #e9f7ec;
                        color #178b50;
                    }
                    &:nth-child(5){
                        background #f3f6f8;
                        color #4e5a65;
                    }
                    &:last-child{
                        background #f5f5f5;
                    }
                }
            }
            .table-body{
                .table-province{
                    .item_font{
                        color #222;
                        font-weight 700;
                    }
                    background #fff;
                    div{
                        font-size 3.2vw;
                        line-height 10.667vw;
                        height 10.667vw;
                    }
                    .table-expand{

                    }
                }
            }
            .item-gray{
                color:#7c7c7c;
            }
            .item-img_down{
                position relative;
                &::before{
                    content: ".";
                    font-size: 0;
                    line-height: 0;
                    display: block;
                    position: absolute;
                    width: 2.133vw;
                    height: 1.6vw;
                    left: 1.6vw;
                    top: 50%;
                    -webkit-transform: translateY(-50%);
                    transform: translateY(-50%);
                    background: url('../assets/area_down.png');
                    background-size: 100% 100%;
                }
            }

            .item-img_top{
                position relative;
                &::before{
                    content: ".";
                    font-size: 0;
                    line-height: 0;
                    display: block;
                    position: absolute;
                    width: 2.133vw;
                    height: 1.6vw;
                    left: 1.6vw;
                    top: 50%;
                    -webkit-transform: translateY(-50%);
                    transform: translateY(-50%);
                    background: url('../assets/area_top.png');
                    background-size: 100% 100%;
                }
            }
        }
}
</style>