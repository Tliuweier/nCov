<template>
  <div>
    <div class="head">
      <p class="title"></p>
      <p class="jump"></p>
      <p class="jump_zhuizong"></p>
      <p class="qs">
        <span @click="handleHeadTipsShow">数据来源：国家及各地卫健委每日信息发布</span>
      </p>
    </div>
    <div class="tabGlobal">
      <div class="topdatWrap">
        <div class="timeNum">
          <p class="d">
            统计截至
            <span>{{lastUpdateTime}}</span>
            <em>
              更新于
              <span>{{timer}}</span>
            </em>
          </p>
        </div>
        <div class="recentNumber">
          <div class="icbar confirm">
            <div class="add">
              较上日
              <span>{{chinaAdd.confirm|numFilter}}</span>
            </div>
            <div class="number">{{chinaTotal.confirm}}</div>
            <div class="text">累计确诊</div>
          </div>
          <div class="icbar heal">
            <div class="add">
              较上日
              <span>{{chinaAdd.heal|numFilter}}</span>
            </div>
            <div class="number">{{chinaTotal.heal}}</div>
            <div class="text">累计治愈</div>
          </div>
          <div class="icbar dead">
            <div class="add">
              较上日
              <span>{{chinaAdd.dead|numFilter}}</span>
            </div>
            <div class="number">{{chinaTotal.dead}}</div>
            <div class="text">累计死亡</div>
          </div>
          <div class="icbar nowConfirm">
            <div class="add">
              较上日
              <span>{{chinaAdd.nowConfirm|numFilter}}</span>
            </div>
            <div class="number">{{chinaTotal.nowConfirm}}</div>
            <div class="text" @click="handleShow">
              <span>现有确诊</span>
            </div>
          </div>
          <div class="icbar suspect">
            <div class="add">
              较上日
              <span>{{chinaAdd.suspect|numFilter}}</span>
            </div>
            <div class="number">{{chinaTotal.suspect}}</div>
            <div class="text">现有疑似</div>
          </div>
          <div class="icbar nowSevere">
            <div class="add">
              较上日
              <span>{{chinaAdd.nowSevere|numFilter}}</span>
            </div>
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

    <!--    <e-provinceCom />-->

    <!--    <div class="section-title">国内病例</div>-->
    <e-china-map :wuhanDayListConfirmAdd="wuhanDayListConfirmAdd" :notWuhanDayListConfirmAdd="notWuhanDayListConfirmAdd" :notHubeiDayListConfirmAdd="notHubeiDayListConfirmAdd"/>
    <e-city-contrast :cityStatis="cityStatis"/>
    <e-table :data="table" @returnOpen="returnOpen" />
    <e-tips />
    <e-dialog :show="nowConfirmShow" @returnClose="returnClose" />
    <e-head-tips :show="headTipShow" @returnClose="returnHeadTipsClose" />
  </div>
</template>

<script>
import EChinaMap from "../components/chinaMap.vue";
import ETable from "../components/Table.vue";
import ETips from "../components/tips.vue";
import ECityContrast from "../components/cityContrast.vue";
import EDialog from "../components/dialog.vue";
import EHeadTips from "../components/headTips.vue";
import request from "../utils/request";
import pinyin from "pinyin";
export default {
  components: {
    ETable,
    ETips,
    EDialog,
    EHeadTips,
    ECityContrast,
    EChinaMap
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
      lastUpdateTime: "",
      chinaAdd: {},
      chinaTotal: {},
      nowConfirmShow: false,
      headTipShow: false,
      cityStatis:{},
      notHubeiDayListConfirmAdd:{},
      notWuhanDayListConfirmAdd:{},
      wuhanDayListConfirmAdd:{}

    };
  },
  filters: {
    numFilter(value) {
      let numString = "";
      if (value > 0) {
        numString = "+" + value;
      } else {
        numString = value;
      }
      return numString;
    }
  },
  methods: {
    handleShow: function() {
      let isShow = this.nowConfirmShow;
      this.nowConfirmShow = !isShow;
    },
    handleHeadTipsShow: function() {
      let isShow = this.headTipShow;
      this.headTipShow = !isShow;
    },
    returnOpen: function() {
      let isShow = this.headTipShow;
      this.headTipShow = !isShow;
    },
    returnClose: function() {
      this.nowConfirmShow = false;
    },
    returnHeadTipsClose: function() {
      this.headTipShow = false;
    },

    async getOnsInfo() {
      let { data } = await request.axiosGet("/g2/getOnsInfo?name=disease_h5");

      let result = await request.axiosGet("/g2/getOnsInfo?name=disease_other");
      window.console.log(JSON.parse(result.data.data))
      if (data.ret == 0) {
        let d = JSON.parse(data.data);
        //  window.console.log(d)
        let s = JSON.parse(result.data.data)
        this.cityStatis = s.cityStatis
        this.lastUpdateTime = d.lastUpdateTime;
        this.chinaTotal = d.chinaTotal;
        this.chinaAdd = d.chinaAdd;
        let provinces = d.areaTree[0].children;
        this.transformChinaData(provinces);
        this.table = provinces;
        let wuhanDayList = s.wuhanDayList;
        let wuhanDayListConfirmAdd = [];
        let notWuhanDayListConfirmAdd = []
        let notHubeiDayListConfirmAdd = []
        for(let i=0;i<wuhanDayList.length;i++){
          let date = wuhanDayList[i].date
          let wuhanConfirmAdd = wuhanDayList[i].wuhan.confirmAdd
          let notWuhanConfirmAdd = wuhanDayList[i].notWuhan.confirmAdd
          let notHubeiConfirmAdd = wuhanDayList[i].notHubei.confirmAdd
          let item = {};let item1 = {} ;let item2 = {};
          item.date = date;
          item.wuhanConfirmAdd  = wuhanConfirmAdd
          item1.date = date;
          item1.notWuhanConfirmAdd = notWuhanConfirmAdd
          item2.date = date
          item2.notHubeiConfirmAdd = notHubeiConfirmAdd
          wuhanDayListConfirmAdd.push(item)
          notWuhanDayListConfirmAdd.push(item1)
          notHubeiDayListConfirmAdd.push(item2)
        }
        this.wuhanDayListConfirmAdd ={
          columns:['date','wuhanConfirmAdd'],
          rows:wuhanDayListConfirmAdd
        }
        this.notWuhanDayListConfirmAdd={
          columns:['date','notWuhanConfirmAdd'],
          rows:notWuhanDayListConfirmAdd
        }
        this.notHubeiDayListConfirmAdd={
          columns:['date','notHubeiConfirmAdd'],
          rows:notHubeiDayListConfirmAdd
        }
      }
    },
    transformChinaData: function(provinces) {
      provinces.forEach(province => {
        province.children.forEach(city => {
          if (province.name === "北京" || province.name === "上海") {
            city.cityName = city.name + "区";
            province.pinyin = pinyin(province.name, {
              style: pinyin.STYLE_NORMAL
            }).join("");
          } else {
            if (province.name === "陕西") {
              province.pinyin = "shanxi1";
            } else if (province.name === "重庆") {
              province.pinyin = "chongqing";
            } else if (province.name === "西藏") {
              province.pinyin = "xizang";
            } else {
              province.pinyin = pinyin(province.name, {
                style: pinyin.STYLE_NORMAL
              }).join("");
            }
            city.cityName = city.name + "市";
          }
        });
      });
    }
  },
  computed: {
    timer: function() {
      let string = "";
      let lastUpdateTime = new Date(this.lastUpdateTime).getTime();
      let nowTime = new Date().getTime();
      let time = (nowTime - lastUpdateTime) / 1000;
      // return
      let hours = parseInt((time % (60 * 60 * 24)) / 3600);
      // window.console.log(hours)
      let minutes = parseInt(((time % (60 * 60 * 24)) % 3600) / 60);
      if (hours <= 0) {
        string = minutes + "分钟";
      } else {
        string = hours + "小时" + minutes + "分钟";
      }
      return string;
    }
  },
  created() {
    //this.table = table;
    this.getOnsInfo();
  }
};
</script>
<style lang="stylus">
.head
  height 40vw
  position relative
  background-size cover
  &::before
    content '.'
    font-size 0
    line-height 0
    display block
    position absolute
    left 0
    top 0
    right 0
    height 48.533vw
    background url('../assets/head_bg_new.png') top
    background-size cover
  .title
    width 50.667vw
    height 16.553vw
    position absolute
    left 50%
    transform translate(-50%)
    top 14.933vw
    background url('../assets/head_title.png')
    background-size 100% 100%
  .jump, .jump_zhuizong
    height 6.933vw
    position absolute
    top 4vw
  .jump
    width 22.4vw
    background url('../assets/head_more.png')
    background-size 100% 100%
    right 0
  .jump_zhuizong
    width 17.6vw
    background url('../assets/head_zz2.png')
    background-size 100% 100%
    right 24vw
  .qs
    line-height 3.733vw
    height 3.733vw
    color #fff
    font-size 3.2vw
    position absolute
    left 5.333vw
    right 5.333vw
    bottom 4vw
    text-align center
    span
      display inline-block
      position relative
      padding-right 4.533vw
      &::before
        content '.'
        font-size 0
        line-height 0
        position absolute
        right 0
        top 50%
        transform translateY(-50%)
        margin-top -1px
        width 3.2vw
        height 3.2vw
        background url('../assets/icon_qs2.png')
        background-size 100% 100%
.tabGlobal
  .topdatWrap
    .timeNum
      padding 4vw 5.333vw
      background-color #fff
      border-radius 3.2vw
      line-height 3.733vw
      font-size 3.2vw
      color #737373
      .d
        span
          font-weight 500
          color #222
        em
          font-style normal
    .timeNum, .timeNum .d
      position relative
    .recentNumber
      display flex
      flex-wrap wrap
      justify-content center
      align-content center
      padding-bottom 4vw
      box-align center
      box-pack centter
      .icbar
        width 29.6vw
        margin 0 0.533vw 0.533vw 0
        padding 1.6vw 0 3.2vw
        position relative
        text-align center
        &:first-child
          border-radius 1.6vw 0 0 0
        &:nth-child(3)
          border-radius 0 1.6vw 0 0
        &:nth-child(4)
          border-radius 0 0 0 1.6vw
        &:nth-child(6)
          border-radius 0 0 1.6vw 0
        .add
          padding-top 1.6vw
          color #7c7c7c
          font-size 2.667vw
          line-height 2.667vw
          height 2.667vw
          font-weight 500
        .number
          font-size 5.867vw
          line-height 5.867vw
          height 5.867vw
          font-weight 600
          padding-top 1.8vw
        .text
          font-size 3.2vw
          height 3.2vw
          line-height 3.2vw
          color #222
          font-weight 500
          margin-top 1.8vw
          span
            position relative
            &::before
              content '.'
              font-size 0
              line-height 0
              display block
              position absolute
              width 3.2vw
              height 3.2vw
              right -3.733vw
              background url('../assets/qs_now_conf.png')
              background-size 100% 100%
              top 50%
              transform translateY(-50%)
              margin-top -1px
      .confirm
        background-color #fdf1f1
        .add
          span
            color #cc1e1e
        .number
          color #cc1e1e
      .heal
        background-color #f1f8f4
        .add
          span
            color #178b50
        .number
          color #178b50
      .dead
        background-color #f3f6f8
        .add
          span
            color #4e5a65
        .number
          color #4e5a65
      .nowConfirm
        background-color #fdf1f1
        .add
          span
            color #f23a3b
        .number
          color #f23a3b
      .suspect
        background-color #fff5e9
        .add
          span
            color #f80
        .number
          color #f80
      .nowSevere
        background-color #faf2f6
        .add
          span
            color #ca3f81
        .number
          color #ca3f81
  .enterWraper
    .qt_enter
      width auto
      align-content center
      text-align center
      margin 0 5.333vw 1.333vw
      background-color #eef4ff
      display flex
      justify-content center
      >a
        width 33.3%
        line-height 11.2vw
        text-decoration none
        font-size 3.733vw
        color #222
        font-weight 300
        position relative
        &:last-child
          &::before
            display none
        &::before
          content '.'
          font-size 0
          line-height 0
          position absolute
          width 1px
          height 4.8vw
          background-color #d8e6ff
          right 0
          top 50%
          transform translateY(-50%)
        span
          display inline-block
          padding 0 0 0 6.933vw
          position relative
          &::before
            content '.'
            font-size 0
            line-height 0
            display block
            position absolute
            left 0
            top 50%
            transform translateY(-50%)
            background-size 100% 100%
            width 5.867vw
            height 5.867vw
        .icon_rili
          &::before
            background-image url('../assets/icon_rili.png')
        .icon_guiji
          &::before
            background-image url('../assets/icon_guiji.png')
        .icon_zyjl
          &::before
            background-image url('../assets/icon_zyjl2.png')
    .qt_enter, .qt_enter>a
      height 11.2vw
      border-radius 1.6vw
</style>
