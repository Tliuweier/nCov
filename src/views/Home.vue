<template>
  <!-- <div>
    <div class="data-statement">
      <div class="title">全国疫情状况</div>
      <div class="update-time">{{updateTime}}</div>
      <div class="data-explain">
        <span>数据说明</span>
      </div>
    </div>
    <e-summary :today="today" :total="total" />

    <e-provinceCom />

    <div class="section-title">国内病例</div>
    <e-table :data="table" />
  </div> -->
  <div>
    <div class="tabGlobal">
    <div class="topdatWrap">
      <div class="timeNum">
        <p class="d">
          统计截至<span>{{lastUpdateTime}}</span><em>更新于<span>16分钟</span></em>
        </p>
      </div>
      <div class="recentNumber">
        <div class="icbar confirm">
          <div class="add">较上日<span>{{chinaAdd.confirm|numFilter}}</span></div>
          <div class="number">{{chinaTotal.confirm}}</div>
          <div class="text">累计确诊</div>
        </div>
        <div class="icbar heal">
          <div class="add">较上日<span>{{chinaAdd.heal|numFilter}}</span></div>
          <div class="number">{{chinaTotal.heal}}</div>
          <div class="text">累计治愈</div>
        </div>
        <div class="icbar dead">
          <div class="add">较上日<span>{{chinaAdd.dead|numFilter}}</span></div>
          <div class="number">{{chinaTotal.dead}}</div>
          <div class="text">累计死亡</div>
        </div>
        <div class="icbar nowConfirm">
          <div class="add">较上日<span>{{chinaAdd.nowConfirm|numFilter}}</span></div>
          <div class="number">{{chinaTotal.nowConfirm}}</div>
          <div class="text">现有确诊</div>
        </div>
        <div class="icbar suspect">
          <div class="add">较上日<span>{{chinaAdd.suspect|numFilter}}</span></div>
          <div class="number">{{chinaTotal.suspect}}</div>
          <div class="text">现有疑似</div>
        </div>
        <div class="icbar nowSevere">
          <div class="add">较上日<span>{{chinaAdd.nowSevere|numFilter}}</span></div>
          <div class="number">{{chinaTotal.nowSevere}}</div>
          <div class="text">现有重症</div>
          </div>
      </div>
    </div>
    <div class="enterWraper">
      <div class="qt_enter">
        <a>
          <span class="icon_rili">战疫分析</span>
        </a>
         <a>
          <span class="icon_guiji">病患轨迹</span>
        </a>
         <a>
          <span class="icon_zyjl">战疫记录</span>
        </a>

      </div>
    </div>
  </div>
    <!-- <e-summary :today="today" :total="total" /> -->

    <e-provinceCom />

    <div class="section-title">国内病例</div>
    <e-table :data="table" />
  </div>
</template>

<script>
import buildMapData from "../data/map";
import ETable from "../components/Table.vue";
import EProvinceCom from "../components/provinceCom.vue";
import { getNameByPinyin, getPinyinByName } from "../data/zhen";
import request from "../utils/request";
export default {
  components: {
    ETable,
    EProvinceCom
  },
  data() {
    return {
      updateTime: "",
      total: {},
      today: {},
      map: {},
      table: [],
      chinaDayList: null,
      provinceName: "",
      initOptions: {
        renderer: "canvas"
      },
      lastUpdateTime:'',
      chinaAdd:{},
      chinaTotal:{}
    };
  },
  filters:{
    numFilter(value){
      let numString = ''
      if(value>0){
        numString = '+'+value
      }else{
        numString =value
      }
      return numString;
    }
  },
  methods: {
    handleClick(params) {
      let provincePinyin = getPinyinByName(params.name);
      this.$router.push(`/${provincePinyin}`);
    },
    async getOnsInfo(){
       let { data } = await request.axiosGet("/g2/getOnsInfo?name=disease_h5");
       window.console.log(data)
      if(data.ret==0){
        let d = JSON.parse(data.data)
        this.lastUpdateTime = d.lastUpdateTime
        this.chinaTotal = d.chinaTotal;
        this.chinaAdd = d.chinaAdd;
      }
    }
  },
  created() {
    let province = this.$route.path.substr(1);
    this.provinceName = getNameByPinyin(province);
    const { updateTime, total, map, table, chinaDayList, today } = buildMapData(
      this.provinceName
    );

    this.updateTime = updateTime;
    this.chinaDayList = chinaDayList;
    this.today = today;
    this.total = total;
    this.map = map;
    this.table = table;
    this.getOnsInfo()
  }
};
</script>
<style lang="stylus">
  .tabGlobal{
    .topdatWrap{
      .timeNum {
        padding:4vw 5.333vw;
        background-color:#fff;
        border-radius :3.2vw;
        line-height :3.733vw;
        font-size: 3.2vw;
        color: #737373;
        .d{
          span{
            font-weight :500;
            color :#222;
          }
          em{
            font-style :normal;
          }
        }
      }
      .timeNum,.timeNum .d{
        position :relative;
      }
      .recentNumber{
        display :flex;
        flex-wrap:wrap;
        justify-content :center;
        align-content :center;
        padding-bottom:4vw;
        box-align :center;
        box-pack :centter;
        .icbar{
          width: 29.6vw;
          margin: 0 .533vw .533vw 0;
          padding: 1.6vw 0 3.2vw;
          position: relative;
          text-align: center;
          &:first-child{
            border-radius: 1.6vw 0 0 0;
          }
          &:nth-child(3){
            border-radius: 0 1.6vw 0 0;
          }
          &:nth-child(4){
            border-radius: 0 0 0 1.6vw ;
          }
          &:nth-child(6){
            border-radius:  0  0 1.6vw  0;
          }
          .add{
            padding-top: 1.6vw;
            color: #7c7c7c;
            font-size: 2.667vw;
            line-height: 2.667vw;
            height: 2.667vw;
            font-weight: 500;
          }
          .number{
            font-size: 5.867vw;
            line-height: 5.867vw;
            height: 5.867vw;
            font-weight: 600;
            padding-top: 1.6vw;
          }
          .text{
            font-size: 3.2vw;
            height: 3.2vw;
            line-height: 3.2vw;
            color: #222;
            font-weight: 500;
            margin-top: 1.6vw;
          }
        }
        .confirm{
          background-color: #fdf1f1;
          .add{
            span{
              color: #cc1e1e;
            }
          }
          .number{
            color: #cc1e1e;
          }
        }
        .heal{
          background-color: #f1f8f4;
           .add{
            span{
              color: #178b50;
            }
          }
          .number{
            color: #178b50;
          }
        }
        .dead{
          background-color: #f3f6f8;
           .add{
            span{
              color: #4e5a65;
            }
          }
          .number{
            color: #4e5a65;
          }
        }
        .nowConfirm{
          background-color: #fdf1f1;
           .add{
            span{
              color: #f23a3b;
            }
          }
          .number{
            color: #f23a3b;
          }
        }
        .suspect{
          background-color: #fff5e9;
           .add{
            span{
              color: #f80;
            }
          }
          .number{
            color: #f80;
          }
        }
        .nowSevere{
          background-color: #faf2f6;
           .add{
            span{
              color: #ca3f81;
            }
          }
           .number{
            color: #ca3f81;
          }
        }
      }
    }
    .enterWraper{
      .qt_enter{
        width :auto;
        align-content :center;
        text-align :center;
        margin :0 5.333vw 1.333vw;
        background-color: #eef4ff;
        display: flex;
        justify-content :center;
        >a{
          width: 33.3%;
          line-height: 11.2vw;
          text-decoration: none;
          font-size: 3.733vw;
          color: #222;
          font-weight: 300;
          position: relative;
          &:last-child{
            &::before{
              display :none;
            }
          }
          &::before{
             content:'.';
             font-size :0;
             line-height :0;
             position :absolute;
             width :1px;
             height :4.8vw;
             background-color :#d8e6ff;
             right :0;
             top:50%;
             transform :translateY(-50%)
          }
          span{
            display: inline-block;
            padding: 0 0 0 6.933vw;
            position: relative;
            &::before{
              content: ".";
              font-size: 0;
              line-height: 0;
              display: block;
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              background-size: 100% 100%;
              width: 5.867vw;
              height: 5.867vw;
            }
          }
          .icon_rili{
            &::before{
              background-image:url('../assets/icon_rili.png')
            }
          }
          .icon_guiji{
            &::before{
              background-image:url('../assets/icon_guiji.png')
            }
          }
          .icon_zyjl{
            &::before{
              background-image:url('../assets/icon_zyjl2.png')
            }
          }
        }
      }
      .qt_enter,.qt_enter>a{
        height: 11.2vw;
        border-radius: 1.6vw;
      
 
      }
    }
  }
</style>