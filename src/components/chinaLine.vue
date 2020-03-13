<template>
  <div class="chinaLine">
    
    <swiper class="chinaLineSwiperWrapper" :options="swiperOption" ref="chinaLineSwiper">
        <swiper-slide>
            <div class="box">
                    <div class="text">全国疫情新增趋势</div>
                    <div class="item-pack">
                        <ve-line :data="chinaLine1Data" height="60vw" :extend="chartExtend" :settings="chartSettings"></ve-line>
                    </div>
            </div>
        </swiper-slide>
        <swiper-slide>
             <div class="box">
                    <div class="text">全国确诊/疑似/重症趋势</div>
                    <div class="item-pack">
                        <ve-line :data="chinaLine2Data" height="60vw" :extend="chartExtend2" :settings="chartSettings"></ve-line>
                    </div>
            </div>
        </swiper-slide>
        <swiper-slide>
             <div class="box">
                    <div class="text">全国累计治愈/死亡趋势</div>
                    <div class="item-pack">
                        <ve-line :data="chinaLine3Data" height="60vw" :extend="chartExtend3" :settings="chartSettings"></ve-line>
                    </div>
            </div>
        </swiper-slide>
        <swiper-slide>
             <div class="box">
                    <div class="text">全国治愈率/病死率趋势</div>
                    <div class="item-pack">
                        <ve-line :data="chinaLine4Data" height="60vw" :extend="chartExtend4" :settings="chartSettings"></ve-line>
                    </div>
            </div>
        </swiper-slide>
    </swiper>
    <div class="imgBox4 swiper-button-prev4" slot="button-prev"></div>
    <div class="imgBox4 swiper-button-next4" slot="button-next"></div>
    <div class="line-pagination4 swiper-pagination4" slot="pagination"></div>
  </div>
</template>
<script>
export default {
  name: "chinaLine",
  props:['chinaLine1Data','chinaLine2Data','chinaLine3Data','chinaLine4Data'],
  data() {
    this.chartSettings = {
      labelMap: {
        addConfirm: "新增确诊",
        addSuspect: "新增疑似",
        confirm:'累计确诊',
        suspect:'现有疑似',
        nowConfirm:'现有确诊',
        nowSevere:'现有重症',
        heal:'累计治愈',
        dead:'累计死亡',
        healRate:'治愈率',
        deadRate:'死亡率'
      }
    };
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
      color: ["#9B0A0E", "#FFD661", "#FF7B7C", "#CD73BF"],
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
          // formatter: '{value} %',
          textStyle: {
            color: "#cccccc",
            fontSize: 8
          }
        }
      },
      color: ["#65B379", "#87878B"],
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
      color: ["#65B379", "#87878B"],
      tooltip: {
        formatter:function(params){
          // window.console.log(params)
          if(params.length==2){
            let html = params[0].name+'<br/>';
          for(let i=0;i<params.length;i++){
            if(i==0){
              html = html + params[i].marker+'治愈率：'+params[i].data[1]+'%<br/>'
            }else if(i==1){
              html = html + params[i].marker+ '死亡率：'+params[i].data[1]+'%'
            }
          }
          return html;
          }else if(params.length==4){
            let html = params[0].name+'<br/>';
          for(let i=0;i<params.length;i++){
            if(i==0){
              html = html + params[i].marker+'治愈率：'+params[i].data[1]+'%<br/>'
            }else if(i==2){
              html = html + params[i].marker+ '死亡率：'+params[i].data[1]+'%'
            }
          }
          return html;
          }
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
    this.chartExtend = {
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
      color: ["#F06061", "#FFD661", "#FF7B7C", "#CD73BF", "#65B379", "#87878B"],
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
    };
    return {
      swiperOption: {
        navigation: {
          prevEl: ".swiper-button-prev4",
          nextEl: ".swiper-button-next4"
        },
        pagination: {
          el: ".swiper-pagination4",
          type: "custom",
          clickable: true,
          bulletClass: "pagination-customs4",
          bulletActiveClass: "active",
          renderCustom: function(swiper, current, total) {
            let text = "";
            let _html = "";
            for (var i = 1; i <= total; i++) {
              if (i == 1) {
                text = "中国疫情<br>新增趋势";
              } else if (i == 2) {
                text = "中国确诊<br>疑似/重症";
              } else if (i == 3) {
                text = "中国累计<br>治愈/死亡";
              } else if (i == 4) {
                  text = "治愈率<br>死亡率";
              }
              if (current == i) {
                _html +=
                  '<span class="pagination-customs4 active">' +
                  text +
                  "</span>";
              } else {
                _html +=
                  '<span class="pagination-customs4">' + text + "</span>";
              }
            }
            return _html;
          }
        }
      },
      chartData: {
        columns: ["date", "nowConfirm", "suspect"],
        rows: [
          { date: "1/1", nowConfirm: 1393, suspect: 1093 },
          { date: "1/2", nowConfirm: 3530, suspect: 3230 },
          { date: "1/3", nowConfirm: 2923, suspect: 2623 },
          { date: "1/4", nowConfirm: 1723, suspect: 1423 },
          { date: "1/5", nowConfirm: 3792, suspect: 3492 },
          { date: "1/6", nowConfirm: 4593, suspect: 4293 }
        ]
      }
    };
  },
  created(){
    //window.console.log(this.chinaLine3Data)
  },
  computed:{
      swiper(){
          return this.$refs.chinaLineSwiper.swiper
      }
  },
  mounted(){
      this.swiper.slideTo(0,1000,false)
  }
};
</script>
<style lang="stylus">
.chinaLine{
  position relative;
  height 72vw;
    .chinaLineSwiperWrapper{
        margin 4vw 5.333vw 0;
        height 60vw;
        position relative;
        .box{
            height 60vw;
            border 1px solid #efefef;
            border-radius 1.6vw;
            padding 3.467vw 0 0;
            .text{
                margin 0 3.2vw;
                font-size 3.2vw;
                font-weight 600;
                color #222;
                .item-pack{
                    height 50vw;
                }
            }
        
        }
    }
    .imgBox4{
        width: 9.6vw;
        height: 9.6vw;
        position: absolute;
        top: 26.6vw;
        z-index: 999;
    }
    .swiper-button-prev4{         
        background: url('../assets/zhexian_left.png');
        background-size: 100% 100%;
        left: -0.2vw;
    }
    .swiper-button-next4{
        background: url('../assets/zhelian_right.png');
        background-size: 100% 100%;
        right: -0.2vw;
    }
    .swiper-pagination-custom{
        bottom 0;
    }
    .line-pagination4{
            display flex;
            justify-content space-between;
            margin 3.2vw 0 0 5.333vw;
            width 89.333vw;
           
            .pagination-customs4{
                display block;
                flex 1;
                margin-right 1vw;
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