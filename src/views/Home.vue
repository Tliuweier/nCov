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
        <div  class="marquee-warp"  :class="{show:marqueeInfo.isNotice}">
          <div class="marquee">
            <div class="marquee-tab">
              <ul class="set-box">
                <li class="li out">
                  <a>{{marqueeInfo.showNotice}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
            <div class="add" v-if="isShowAdd">
              较上日
              <span>{{chinaAdd.confirm|numFilter}}</span>
            </div>
            <div class="number">{{chinaTotal.confirm}}</div>
            <div class="text">累计确诊</div>
          </div>
          <div class="icbar heal">
            <div class="add" v-if="isShowAdd">
              较上日
              <span>{{chinaAdd.heal|numFilter}}</span>
            </div>
            <div class="number">{{chinaTotal.heal}}</div>
            <div class="text">累计治愈</div>
          </div>
          <div class="icbar dead">
            <div class="add" v-if="isShowAdd">
              较上日
              <span>{{chinaAdd.dead|numFilter}}</span>
            </div>
            <div class="number">{{chinaTotal.dead}}</div>
            <div class="text">累计死亡</div>
          </div>
          <div class="icbar nowConfirm">
            <div class="add" v-if="isShowAdd">
              较上日
              <span>{{chinaAdd.nowConfirm|numFilter}}</span>
            </div>
            <div class="number">{{chinaTotal.nowConfirm}}</div>
            <div class="text" @click="handleShow">
              <span>现有确诊</span>
            </div>
          </div>
          <div class="icbar suspect">
            <div class="add" v-if="isShowAdd">
              较上日
              <span>{{chinaAdd.importedCase|numFilter}}</span>
            </div>
            <div class="number">{{chinaTotal.importedCase}}</div>
            <div class="text">境外输入</div>
          </div>
          <div class="icbar nowSevere">
            <div class="add" v-if="isShowAdd">
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
    <div class="chmap">
      <e-wuhan-line :chinaMapData="chinaMapData" :selected="selected"/>
      <div class="chinamapbtn">
        <span :class="[selected==1?'current':'']" @click="handleSelected(1)">现有确诊</span>
        <span :class="[selected==2?'current':'']" @click="handleSelected(2)">累计确诊</span>
      </div>
    </div>
    
    <e-china-line :chinaLine1Data="chinaLine1Data" :chinaLine2Data="chinaLine2Data" :chinaLine3Data="chinaLine3Data" :chinaLine4Data="chinaLine4Data" />
    <e-city-contrast :cityStatis="cityStatis" />
    <e-china-line :chinaLine1Data="chinaLine1Data" :chinaLine2Data="chinaLine2Data" :chinaLine3Data="chinaLine3Data" :chinaLine4Data="chinaLine4Data" />
    <e-hubei-line :hubeiLineData="hubeiLineData" :hubeiLine2Data="hubeiLine2Data" :hubeiLine3Data="hubeiLine3Data" :hubeiLine4Data="hubeiLine4Data"/>
    <e-china-map
      :wuhanDayListConfirmAdd="wuhanDayListConfirmAdd"
      :notWuhanDayListConfirmAdd="notWuhanDayListConfirmAdd"
      :notHubeiDayListConfirmAdd="notHubeiDayListConfirmAdd"
    />
    <div class="homeTips">
      <span @click="returnOpen">数据来源：国家卫健委官网发布，每日更新一次</span>
    </div>
    <e-table :data="table" @returnOpen="returnOpen" />
    <e-tips />
    <e-dialog :show="nowConfirmShow" @returnClose="returnClose" />
    <e-head-tips :show="headTipShow" @returnClose="returnHeadTipsClose" />
  </div>
</template>

<script>
import EChinaMap from "../components/chinaMap.vue";
import EHubeiLine from "../components/hubeiLine.vue";
import EChinaLine from "../components/chinaLine.vue";
import EWuhanLine from "../components/wuhanLine.vue";
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
    EChinaMap,
    EChinaLine,
    EHubeiLine,
    EWuhanLine
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
      cityStatis: {},
      notHubeiDayListConfirmAdd: {},
      notWuhanDayListConfirmAdd: {},
      wuhanDayListConfirmAdd: {},
      marqueeInfo:{},
      selected:1
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
    handleSelected:async function(s){
      this.selected = s
      let { data } = await request.axiosGet("/g2/getOnsInfo?name=disease_h5");
      if (data.ret == 0) {
        let d = JSON.parse(data.data);
        this.chinaAdd = d.chinaAdd;
        let provinces = d.areaTree[0].children;
        this.transformChinaData(provinces);
        if(s==1){
           this.getChinaMapData(provinces)
        }else if(s==2){
          this.getChinaMapData1(provinces)
        }
      }
    },
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
      // window.console.log(JSON.parse(result.data.data));
      let marqueeResult = await request.axiosGet("/g2/getOnsInfo?name=wuwei_ww_ww_today_notice")
      window.console.log(JSON.parse(data.data));
      if (data.ret == 0) {
        let d = JSON.parse(data.data);
        this.isShowAdd = d.isShowAdd;
        this.lastUpdateTime = d.lastUpdateTime;
        this.chinaTotal = d.chinaTotal;
        this.chinaAdd = d.chinaAdd;
        let provinces = d.areaTree[0].children;
        this.transformChinaData(provinces);
        this.table = provinces;
        this.getChinaMapData(provinces)
      }
      if(result.data.ret == 0){
        let s = JSON.parse(result.data.data);
        this.cityStatis = s.cityStatis;
         //武汉line
        this.getWuhanLineData(s)
        //全国line
        this.getChinaLine1Data(s)
        this.getChinaLine2Data(s)
        this.getChinaLine3Data(s)
        this.getChinaLine4Data(s)
        //湖北line
        this.getHubeiLine1Data(s)
        this.getHubeiLine2Data(s)
        this.getHubeiLine3Data(s)
        this.getHubeiLine4Data(s)
      }
      if(marqueeResult.data.ret ==0){
        let marqueeInfo = JSON.parse(marqueeResult.data.data)
        this.marqueeInfo = marqueeInfo[0]
      }
    },
    getChinaMapData1:function(provinces){
      let chinaMapData = []
      for (let i = 0; i < provinces.length; i++) {
        let item = {}
        item.name = provinces[i].name;
        item.confirm = provinces[i].total.confirm
        chinaMapData.push(item)
      }
      this.chinaMapData = {
          columns: ["name", "confirm"],
          rows: chinaMapData
      };
    },
    getChinaMapData:function(provinces){
      let chinaMapData = []
      for (let i = 0; i < provinces.length; i++) {
        let item = {}
        item.name = provinces[i].name;
        item.nowConfirm = provinces[i].total.confirm-provinces[i].total.heal-provinces[i].total.dead
        chinaMapData.push(item)
      }
      this.chinaMapData = {
          columns: ["name", "nowConfirm"],
          rows: chinaMapData
      };
    },
    getWuhanLineData:function(s){
      let wuhanDayList = s.wuhanDayList;
        let wuhanDayListConfirmAdd = [];
        let notWuhanDayListConfirmAdd = [];
        let notHubeiDayListConfirmAdd = [];
        for (let i = 0; i < wuhanDayList.length; i++) {
          let date = wuhanDayList[i].date;
          let wuhanConfirmAdd = wuhanDayList[i].wuhan.confirmAdd;
          let notWuhanConfirmAdd = wuhanDayList[i].notWuhan.confirmAdd;
          let notHubeiConfirmAdd = wuhanDayList[i].notHubei.confirmAdd;
          let item = {};
          let item1 = {};
          let item2 = {};
          item.date = date;
          item.wuhanConfirmAdd = wuhanConfirmAdd;
          item1.date = date;
          item1.notWuhanConfirmAdd = notWuhanConfirmAdd;
          item2.date = date;
          item2.notHubeiConfirmAdd = notHubeiConfirmAdd;
          wuhanDayListConfirmAdd.push(item);
          notWuhanDayListConfirmAdd.push(item1);
          notHubeiDayListConfirmAdd.push(item2);
        }
        this.wuhanDayListConfirmAdd = {
          columns: ["date", "wuhanConfirmAdd"],
          rows: wuhanDayListConfirmAdd
        };
        this.notWuhanDayListConfirmAdd = {
          columns: ["date", "notWuhanConfirmAdd"],
          rows: notWuhanDayListConfirmAdd
        };
        this.notHubeiDayListConfirmAdd = {
          columns: ["date", "notHubeiConfirmAdd"],
          rows: notHubeiDayListConfirmAdd
        };
    },
    getChinaLine1Data:function(s){
        let chinaDayAddList = s.chinaDayAddList
        let chinaLine1Data = []
        // let chinaLin2Data = []
        // let chinaLine3Data = []
        // let chinaLine4Data = []
        for (let i = 0; i < chinaDayAddList.length; i++) {
          let item1 = {};
          let date = chinaDayAddList[i].date;
          let addConfirm = chinaDayAddList[i].confirm;
          let addSuspect =  chinaDayAddList[i].suspect;
          item1.date = date
          item1.addConfirm = addConfirm
          item1.addSuspect =addSuspect
          chinaLine1Data.push(item1)
        }
        this.chinaLine1Data = {
          columns: ["date", "addConfirm","addSuspect"],
          rows: chinaLine1Data
        }
    },
    getChinaLine2Data:function(s){
      let chinaDayList = s.chinaDayList.slice(7,s.chinaDayList.length-1)
        let chinaLine2Data = []
        // let chinaLin2Data = []
        // let chinaLine3Data = []
        // let chinaLine4Data = []
        for (let i = 0; i < chinaDayList.length; i++) {
          let item2 = {};
          let date = chinaDayList[i].date;
          let confirm = chinaDayList[i].confirm;
          let nowSevere = chinaDayList[i].nowSevere;
          let nowConfirm = chinaDayList[i].nowConfirm;
          let suspect =  chinaDayList[i].suspect;
          item2.date = date
          item2.confirm = confirm
          item2.nowConfirm = nowConfirm
          item2.nowSevere = nowSevere
          item2.suspect =suspect
          chinaLine2Data.push(item2)
        }
        this.chinaLine2Data = {
          columns: ["date", "confirm","nowSevere","nowConfirm","suspect"],
          rows: chinaLine2Data
        }
    },
    getChinaLine3Data:function(s){
        let chinaDayList = s.chinaDayList.slice(7,s.chinaDayList.length-1)
        let chinaLine3Data = []
        // let chinaLin2Data = []
        // let chinaLine3Data = []
        // let chinaLine4Data = []
        for (let i = 0; i < chinaDayList.length; i++) {
          let item3 = {};
          let date = chinaDayList[i].date;
          let heal = chinaDayList[i].heal;
          let dead =  chinaDayList[i].dead;
          item3.date = date
          item3.heal = heal
          item3.dead =dead
          chinaLine3Data.push(item3)
        }
        this.chinaLine3Data = {
          columns: ["date", "heal","dead"],
          rows: chinaLine3Data
        }
    },
    getChinaLine4Data:function(s){
      let chinaDayList = s.chinaDayList.slice(7,s.chinaDayList.length-1)
        let chinaLine4Data = []
        // let chinaLin2Data = []
        // let chinaLine3Data = []
        // let chinaLine4Data = []
        for (let i = 0; i < chinaDayList.length; i++) {
          let item4 = {};
          let date = chinaDayList[i].date;
          let healRate = chinaDayList[i].healRate;
          let deadRate =  chinaDayList[i].deadRate;
          item4.date = date
          item4.healRate = healRate
          item4.deadRate =deadRate
          chinaLine4Data.push(item4)
        }
        this.chinaLine4Data = {
          columns: ["date", "healRate","deadRate"],
          rows: chinaLine4Data
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
    },
    getHubeiLine1Data:function(s){
      let dailyHistory = s.dailyHistory
      let hubeiLine1Data = []
      for(let i = 0; i < dailyHistory.length; i++){
        let item = {}
        let date = dailyHistory[i].date;
        let nowConfirm = dailyHistory[i].hubei.nowConfirm
        let heal = dailyHistory[i].hubei.heal;
        let dead =  dailyHistory[i].hubei.dead;
        item.nowConfirm = nowConfirm
        item.heal = heal
        item.dead = dead
        item.date = date
        hubeiLine1Data.push(item)
      }
      this.hubeiLineData = {
          columns: ['date','nowConfirm','heal','dead'],
          rows: hubeiLine1Data
      }
      // this.hubeiLine2Data = {
      //     columns: [],
      //     rows: []
      // }
      // this.hubeiLine3Data = {
      //     columns: [],
      //     rows: []
      // }
      // this.hubeiLine4Data = {
      //     columns: [],
      //     rows: []
      // }
    },
    getHubeiLine2Data:function(s){
      let dailyHistory = s.dailyHistory
      let hubeiLine2Data = []
      for(let i = 0; i < dailyHistory.length; i++){
        let item = {}
        let date = dailyHistory[i].date;
        let nowConfirm = dailyHistory[i].notHubei.nowConfirm
        let heal = dailyHistory[i].notHubei.heal;
        let dead =  dailyHistory[i].notHubei.dead;
        item.nowConfirm = nowConfirm
        item.heal = heal
        item.dead = dead
        item.date = date
        hubeiLine2Data.push(item)
      }
      this.hubeiLine2Data = {
          columns: ['date','nowConfirm','heal','dead'],
          rows: hubeiLine2Data
      }
      // this.hubeiLine3Data = {
      //     columns: [],
      //     rows: []
      // }
      // this.hubeiLine4Data = {
      //     columns: [],
      //     rows: []
      // }
    },
    getHubeiLine3Data:function(s){
      let dailyHistory = s.dailyHistory
      let hubeiLine3Data = []
      for(let i = 0; i < dailyHistory.length; i++){
        let item = {}
        let date = dailyHistory[i].date;
        let hubeiHealRate = dailyHistory[i].hubei.healRate
        let notHubeiHealRate = dailyHistory[i].notHubei.healRate;
        let countryHealRate =  dailyHistory[i].country.healRate;
        item.hubeiHealRate = hubeiHealRate
        item.notHubeiHealRate = notHubeiHealRate
        item.countryHealRate = countryHealRate
        item.date = date
        hubeiLine3Data.push(item)
      }
      this.hubeiLine3Data = {
          columns: ['date','countryHealRate','hubeiHealRate','notHubeiHealRate'],
          rows: hubeiLine3Data
      }
      // this.hubeiLine4Data = {
      //     columns: [],
      //     rows: []
      // }
    },
    getHubeiLine4Data:function(s){
      let dailyHistory = s.dailyHistory
      let hubeiLine4Data = []
      for(let i = 0; i < dailyHistory.length; i++){
        let item = {}
        let date = dailyHistory[i].date;
        let hubeiDeadRate = dailyHistory[i].hubei.deadRate
        let notHubeiDeadRate = dailyHistory[i].notHubei.deadRate;
        let countryDeadRate =  dailyHistory[i].country.deadRate;
        item.hubeiDeadRate = hubeiDeadRate
        item.notHubeiDeadRate = notHubeiDeadRate
        item.countryDeadRate = countryDeadRate
        item.date = date
        hubeiLine4Data.push(item)
      }
      this.hubeiLine4Data = {
          columns: ['date','countryDeadRate','hubeiDeadRate','notHubeiDeadRate'],
          rows: hubeiLine4Data
      }
      // this.hubeiLine4Data = {
      //     columns: [],
      //     rows: []
      // }
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
.chmap
  position relative
  height 93.333vw  
  .chinamapbtn
    position absolute
    left 5.333vw
    top 0
    float left
    z-index 2
    height 6.933vw
    span
      display: block;
      width: 17.067vw;
      line-height: normal;
      text-align: center;
      font-size: 3.2vw;
      padding: .8vw 0;
      border: 1px solid #efefef;
      float: left;
      position: relative;
      margin: 0 -1px;
      &:first-child
        border-radius: 1.6vw 0 0 1.6vw;
      &:last-child
        border-radius: 0 1.6vw 1.6vw 0;
    .current
      background-color #eef4ff
      border-color #ccdeff
      color #005dff
      z-index 2
.tabGlobal
  .topdatWrap
    .marquee-warp,.marquee
      border-radius 3.2vw
      position relative
    .show
      display block
    .marquee-warp
      background-color #fff
      padding-top 1px
      .marquee
        width 90.133vw
        height 10.133vw;
        margin 4vw auto 0
        padding 0 5.333vw
        box-sizing border-box
        background url('../assets/marquee-bg-none.png') #f8f8f8 50% no-repeat
        background-size 90.133vw 10.133vw
        font-size 4vw
        border-radius 1.6vw
        .marquee-tab
          position absolute
          color #737373
          left 9.733vw
          top 50%
          transform translateY(-50%)
          width: 76vw;
          font-size 3.2vw
          overflow hidden
          font-weight 400
          height 4.667vw
          .set-box
            position absolute
            overflow hidden
          ul
            margin 0
            padding 0
            list-style none
          .li
            height 4.667vw
            width 76vw
            line-height 4.667vw
            overflow hidden
            .out
              background none
            a
              color #222
              text-decoration none
              display block
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
.homeTips
    position relative;
    font-size 3.2vw;
    height 3.2vw;
    line-height 3.2vw;
    color #737373;
    margin 5.333vw 0 0 5.333vw;
    span
      position relative;
      display inline-block;
      padding-right: 4vw;
      &::before
        content ".";
        display block;
        font-size 0;
        line-height: 0;
        position absolute;
        right 0;
        top 50%;
        transform translateY(-50%);
        width 3.2vw;
        height 3.2vw;
        background url('../assets/icon_qs.png');
        background-size 100% 100%;


</style>
