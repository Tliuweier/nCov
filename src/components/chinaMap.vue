<template>
    <div class="chinaMap">
        <!-- <ve-line :data="chartData"></ve-line> -->
        <swiper class="swiperWrapper" :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
            <!-- slides -->
            <swiper-slide>
                <div>
                    <div class="item-pack">
                        <ve-line :data="wuhanDayListConfirmAdd" height="60vw" :extend="chartExtend"></ve-line>
                    </div>

                </div>

            </swiper-slide>
            <swiper-slide>
                <div>
                    <div class="item-pack">
                        <ve-line :data="notWuhanDayListConfirmAdd" height="60vw" :extend="chartExtend"></ve-line>
                    </div>

                </div>
            </swiper-slide>
            <swiper-slide>
                <div>
                    <div class="item-pack">
                        <ve-line :data="notHubeiDayListConfirmAdd" height="60vw" :extend="chartExtend"></ve-line>
                    </div>

                </div>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-scrollbar"   slot="scrollbar"></div>
        </swiper>
    </div>
</template>
<script>
    export default {
        name:'chinaMap',
        props:['notHubeiDayListConfirmAdd','wuhanDayListConfirmAdd','notWuhanDayListConfirmAdd'],
        data(){
            this.chartExtend = {
                grid: {
                    left: '5%',
                    containLabel: true,
                    top:'10%',
                    bottom:'0'
                },
                xAxis:{
                    axisLabel:{
                        rotate:30,
                        textStyle: {
                            fontSize: 8
                        }
                    }
                }
            }
            return{
                swiperOption: {
                    // some swiper options/callbacks
                    // 所有的参数同 swiper 官方 api 参数
                    // ...
                },
                chartData: {
                    columns: ['date', 'confirmAdd'],
                    rows: [
                        { 'date': '1/1','confirmAdd': 1393, },
                        { 'date': '1/2','confirmAdd' : 3530, },
                        { 'date': '1/3', 'confirmAdd': 2923, },
                        { 'date': '1/4', 'confirmAdd': 1723, },
                        { 'date': '1/5', 'confirmAdd': 3792, },
                        { 'date': '1/6', 'confirmAdd': 4593, }
                    ]
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
          window.console.log(this.wuhanDayListConfirmAdd)
        },
        mounted(){
            window.console.log('this is current swiper instance object', this.swiper)
            this.swiper.slideTo(3, 1000, false)
        }
    }
</script>
<style lang='stylus'>
    .chinaMap{
        .swiperWrapper{
            margin 4vw 5.333vw 0;
            height 60vw;
            .item-pack{
                height 60vw;
            }
        }
    }
</style>
