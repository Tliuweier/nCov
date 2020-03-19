<template>
    <div class="hubeiLine">
        <swiper class="hubeiLineSwiperWrapper" :options="swiperHubeiOption" ref="hubeiLineSwiper">
            <swiper-slide>
                <div class="box">
                    <div class="text">湖北确诊/治愈/死亡趋势</div>
                    <div class="item-pack">
                        <ve-line height="60vw" :data="hubeiLineData"  :extend="chartExtend1" :settings="chartSettings"  ></ve-line>
                    </div>

                </div>

            </swiper-slide>
            <swiper-slide>
                <div class="box">
                    <div class="text">非湖北确诊/治愈/死亡趋势</div>
                    <div class="item-pack">
                        <ve-line height="60vw" :data="hubeiLine2Data"  :extend="chartExtend2" :settings="chartSettings" ></ve-line>
                    </div>

                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="box">
                    <div class="text">湖北内外治愈率对比</div>
                    <div class="item-pack">
                        <ve-line  height="60vw" :data="hubeiLine3Data" :extend="chartExtend3" :settings="chartSettings" ></ve-line>
                    </div>

                </div>
            </swiper-slide>
             <swiper-slide>
                <div class="box">
                    <div class="text">湖北内外病死率对比</div>
                    <div class="item-pack">
                        <ve-line  height="60vw" :data="hubeiLine4Data"  :extend="chartExtend4" :settings="chartSettings" ></ve-line>
                    </div>

                </div>
            </swiper-slide>
        </swiper>
        <div class="imgBox5 swiper-button-prev5" slot="button-prev"></div>
        <div class="imgBox5 swiper-button-next5" slot="button-next"></div>
        <div class="line-pagination5 swiper-pagination5" slot="pagination">
        </div>
    </div>
</template>
<script>
export default {
    name:'hubeiLine',
    props:['hubeiLineData','hubeiLine2Data','hubeiLine3Data','hubeiLine4Data'],
    data(){
        this.chartSettings = {
            labelMap:{
                nowConfirm:'现有确诊',
                heal:'累计治愈',
                dead:'累计死亡',
                hubeiDeadRate:'湖北',
                notHubeiDeadRate:'非湖北',
                countryDeadRate:'全国',
                hubeiHealRate:'湖北',
                notHubeiHealRate:'非湖北',
                countryHealRate:'全国'
            }
        }
        this.chartExtend1 = {
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
        this.chartExtend2 = {
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
        this.chartExtend3 = {
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
                    formatter: '{value} %',
                    textStyle: {
                        color: "#cccccc",
                        fontSize: 8
                    }
                }
            },
            color: ["#ACDB70", "#2B7C74", "#57BF92"],
            tooltip: {
                formatter:function(params){
                    // window.console.log(params)
                    let html = params[0].name+'<br/>';
                    for(let i=0;i<params.length;i++){
                        if(i==0){
                        html = html + params[i].marker+'全国：'+params[i].data[1]+'%<br/>'
                        }else if(i==1){
                        html = html + params[i].marker+ '湖北：'+params[i].data[1]+'%<br/>'
                        }else if(i==2){
                        html = html + params[i].marker+ '非湖北：'+params[i].data[1]+'%'
                        }
                    }
                    return html;
                },
                textStyle: {
                    color: "#fff",
                    fontSize: "8"
                },
                extraCssText:'z-index:999',
                confine:true,
                position: function (pos, params, el, elRect, size) {
                    var obj = {top: 10};
                    obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                    return obj;
                }
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
        this.chartExtend4 = {
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
                    formatter: '{value} %',
                    textStyle: {
                        color: "#cccccc",
                        fontSize: 8
                    }
                }
            },
            color: ["#B07C40", "#2E75B6", "#B0B0B3"],
            tooltip: {
                formatter:function(params){
                    // window.console.log(params)
                    let html = params[0].name+'<br/>';
                    for(let i=0;i<params.length;i++){
                        if(i==0){
                        html = html + params[i].marker+'全国：'+params[i].data[1]+'%<br/>'
                        }else if(i==1){
                        html = html + params[i].marker+ '湖北：'+params[i].data[1]+'%<br/>'
                        }else if(i==2){
                        html = html + params[i].marker+ '非湖北：'+params[i].data[1]+'%'
                        }
                    }
                    return html;
                },
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
            swiperHubeiOption:{
                 navigation:{
                    prevEl:'.swiper-button-prev5',
                    nextEl:'.swiper-button-next5'
                },
                pagination:{
                        el:'.swiper-pagination5',
                        type:'custom',
                        clickable :true,
                        bulletClass: 'pagination-customs5',
                        bulletActiveClass: 'active',
                        renderCustom:function(swiper,current,total){
                            let text = ''
                            let _html = ''
                            for (var i = 1; i <= total; i++) {
                                if(i==1){
                                    text = '湖北<br>疫情趋势'
                                } else if(i==2){
                                    text = '非湖北<br>疫情趋势'
                                } else if(i==3){
                                    text = '湖北内外<br>治愈率对比'
                                } else if(i==4){
                                    text = '湖北内外<br>病死率对比'
                                }
                                if(current == i){
                                     _html += '<span class="pagination-customs5 active">' + text + '</span>';
                                } else{
                                    _html += '<span class="pagination-customs5">' + text + '</span>';
                                }
                            }
                            return _html;
                        }
                    }
            }
        }
    },
    computed:{
        swiper(){
            return this.$refs.hubeiLineSwiper.swiper
        }
    },
    mounted(){
        this.swiper.slideTo(0,1000,false)
    }
}
</script>
<style lang="stylus">
.hubeiLine{
        position relative;
        height 72vw;
        .hubeiLineSwiperWrapper{
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
        .imgBox5{
                width: 9.6vw;
                height: 9.6vw;
                position: absolute;
                top: 36.6vw;
                z-index: 999;
        }
        .swiper-button-prev5{
                    
            background: url('../assets/zhexian_left.png');
            background-size: 100% 100%;
            left: -0.2vw;
        }
        .swiper-button-next5{
            background: url('../assets/zhelian_right.png');
            background-size: 100% 100%;
            right: -0.2vw;
        }
        .swiper-pagination-custom{
                bottom 0;
        }
        .line-pagination5{
            display flex;
            justify-content space-between;
            margin 3.2vw 0 0 5.333vw;
            width 89.333vw;
           
            .pagination-customs5{
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