<template>
    <div class="chinaMap">
        <!-- <ve-line :data="chartData"></ve-line> -->
        <swiper class="swiperWrapper" :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
            <!-- slides -->
            <swiper-slide>
                <div class="box">
                    <div class="text">武汉新增确诊趋势</div>
                    <div class="item-pack">
                        <ve-line :data="wuhanDayListConfirmAdd" height="60vw" :extend="chartExtend" :legend-visible="false" :settings="chartSettings"></ve-line>
                    </div>

                </div>

            </swiper-slide>
            <swiper-slide>
                <div class="box">
                    <div class="text">非湖北(武汉)新增确诊趋势</div>
                    <div class="item-pack">
                        <ve-line :data="notWuhanDayListConfirmAdd" height="60vw" :extend="chartExtend" :legend-visible="false" :settings="chartSettings"></ve-line>
                    </div>

                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="box">
                    <div class="text">全国(非湖北)新增确诊趋势</div>
                    <div class="item-pack">
                        <ve-line :data="notHubeiDayListConfirmAdd" height="60vw" :extend="chartExtend" :legend-visible="false" :settings="chartSettings"></ve-line>
                    </div>

                </div>
            </swiper-slide>
            <!-- Optional controls -->
            <!-- <div class="swiper-pagination"  slot="pagination"></div> -->
            <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
        </swiper>
        <div class="imgBox swiper-button-prev" slot="button-prev"></div>
        <div class="imgBox swiper-button-next" slot="button-next"></div>
        <div class="line-pagination3 swiper-pagination" slot="pagination">
        </div>
    </div>
</template>
<script>
    export default {
        name:'chinaMap',
        props:['notHubeiDayListConfirmAdd','wuhanDayListConfirmAdd','notWuhanDayListConfirmAdd'],
        data(){
            this.chartSettings = {
                labelMap: {
                    'wuhanConfirmAdd': '新增确诊',
                    'notWuhanConfirmAdd':'新增确诊',
                    'notHubeiConfirmAdd':'新增确诊'
                }
            },
            this.chartExtend = {
                grid: {
                    top:'10%',
                    bottom :'15%'

                },
                xAxis:{
                    axisLabel:{
                        rotate:30,
                        textStyle: {
                            color:'#cccccc',
                            fontSize: 8
                        }
                    }
                },
                yAxis:{
                     axisLabel: {
                    show: true,
                        textStyle: {
                            color: "#cccccc",//这里是改变字体颜色
                            fontSize: 8 //字体大小
                        }
                    }
                },
                color:['#F06061'],
                tooltip:{

                    textStyle:{
                        color:'#fff',
                        fontSize:'8'
                    }
                }

            }
            return{
                swiperOption: {
                    // some swiper options/callbacks
                    // 所有的参数同 swiper 官方 api 参数
                    // ...
                    navigation:{
                        prevEl:'.swiper-button-prev',
                        nextEl:'.swiper-button-next'
                    },
                    pagination:{
                        el:'.swiper-pagination',
                        type:'custom',
                        clickable :true,
                        bulletClass: 'pagination-customs1',
                        bulletActiveClass: 'active',
                        renderCustom:function(swiper,current,total){
                            let text = ''
                            let _html = ''
                            for (var i = 1; i <= total; i++) {
                                if(i==1){
                                    text = '武汉<br>新增确诊'
                                } else if(i==2){
                                    text = '湖北(非武汉)<br>新增确诊'
                                } else if(i==3){
                                    text = '中国(非湖北)<br>新增确诊'
                                }
                                if(current == i){
                                     _html += '<span class="pagination-customs1 active">' + text + '</span>';
                                } else{
                                    _html += '<span class="pagination-customs1">' + text + '</span>';
                                }
                            }
                            return _html;
                        }
                    }
                }
            }
        },
        methods:{

        },
        computed:{
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        created(){
         // window.console.log(this.wuhanDayListConfirmAdd)
        },
        mounted(){
            // window.console.log('this is current swiper instance object', this.swiper)
            this.swiper.slideTo(1, 1000, false)
        }
    }
</script>
<style lang='stylus'>
    .chinaMap{
        position relative;
        height 72vw;
        .swiperWrapper{
            margin 4vw 5.333vw 0;
            height 60vw;
            position relative;
            .box{
                height 60vw;
                border: 1px solid #efefef;
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
        .imgBox{
                width: 9.6vw;
                height: 9.6vw;
                position: absolute;
                top: 36.6vw;
                z-index: 999;
        }
        .swiper-button-prev{

            background: url('../assets/zhexian_left.png');
            background-size: 100% 100%;
            left: -0.2vw;
        }
        .swiper-button-next{
            background: url('../assets/zhelian_right.png');
            background-size: 100% 100%;
            right: -0.2vw;
        }
        .swiper-pagination-custom{
                bottom 0;
        }
        .line-pagination3{
            display flex;
            justify-content space-between;
            margin 3.2vw 0 0 5.333vw;
            width 89.333vw;

            .pagination-customs1{
                display block;
                width 28.533vw;
                border: 1px solid #e9ebed;
                border-radius: 1.067vw;
                font-size: 3.2vw;
                line-height: 4.267vw;
                text-align: center;
                height: 9.867vw;
                padding-top: 1.333vw;
                background-color: #f3f6f8;
            }
            .active{
                background-color: #eef4ff;
                border-color: #8fb8ff;
                color: #005def;
                font-weight: 500;
            }
        }

    }
</style>
