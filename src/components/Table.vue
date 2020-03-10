<template>
    <div class="chinaListWrapper" id="listWrapper">
        <div class="up-tips tips-yiqing">
            <span class="title">中国疫情(包括港澳台)</span>
        </div>
        <span class="tips">7:00-10:00为更新高峰，数据如有滞后请谅解</span>
        <div class="navFixed" v-if="listWrapperBarFixed">
            <ul class="header">
                <li >地区</li>
                <li >新增</li>
                <li>累计确诊</li>
                <li>治愈</li>
                <li>死亡</li>
            </ul>
        </div>
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
                    <div class="item-gray item-img_down item_font"  :id="item.pinyin+index"  @click="expandLine(item.pinyin,index)">{{item.name}}</div>
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
        <div class="dataTips">
            <span @click="handleHeadTipsShow">数据来源：各地卫健委每日公开数据</span>
        </div>
    </div>

</template>
<script>
export default {
    props:{
        data:[Object,Array]
    },
    data(){
        return{
            listWrapperBarFixed:false
        }
    },
    created(){
        // window.console.log(this.data)
    },
    methods:{
        expandLine:function(pinyin,index){
            const targetDom = document.getElementById(pinyin)
            const itemImgDom = document.getElementById(pinyin+index)
                if (targetDom.classList.contains('table-expand-hidden')) {
                    targetDom.classList.remove('table-expand-hidden')
                    targetDom.classList.add('table-expand-show')
                    itemImgDom.classList.remove('item-img_down')
                    itemImgDom.classList.add('item-img_top')
                } else {
                    targetDom.classList.remove('table-expand-show')
                    targetDom.classList.add('table-expand-hidden')
                    itemImgDom.classList.add('item-img_down')
                    itemImgDom.classList.remove('item-img_top')
                }
        },
        handleHeadTipsShow:function(){
            this.$emit('returnOpen')
        },
        handleScroll:function () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            var offsetTop = document.querySelector('#listWrapper').offsetTop
            // var offsetHeight = document.querySelector('#listWrapper').offsetHeight
            if (scrollTop > offsetTop) {
                this.listWrapperBarFixed = true
            }else {
                this.listWrapperBarFixed = false
            }
        }
    },
    filters: {
        numFilter (value) {
            let realVal = ''
            if (!isNaN(value) && value!== '') {
            // 截取当前数据到小数点后三位
            let tempVal = parseFloat(value).toFixed(5)
            realVal = tempVal.substring(0, tempVal.length - 1)
            } else {
            realVal = '--'
            }
            return realVal
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll)
    },
};
</script>
<style lang="stylus" scoped>
    .chinaListWrapper{
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

        .navFixed{
            position fixed;
            left 0;
            top 0;
            right 0;
            background-color #f5f5f5;
            z-index 8;
            .header{
                display flex;
                height 10.667vw;
                width: calc(100% - 10.667vw);
                margin: 0 auto;
                li{
                    flex: 1;
                    height 10.667vw;
                    line-height 10.667vw;
                    text-align center;
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
        .dataTips{
            position relative;
            font-size 3.2vw;
            height 3.2vw;
            line-height 3.2vw;
            color #737373;
            margin 5.333vw 0 0 5.333vw;
            span{
                position relative;
                display: inline-block;
                padding-right: 4vw;
                &::before{
                    content: ".";
                    display: block;
                    font-size: 0;
                    line-height: 0;
                    position: absolute;
                    right: 0;
                    top: 50%;
                    -webkit-transform: translateY(-50%);
                    transform: translateY(-50%);
                    width: 3.2vw;
                    height: 3.2vw;
                    background: url('../assets/icon_qs.png');
                    background-size: 100% 100%;
                }
            }
        }
    }

</style>
