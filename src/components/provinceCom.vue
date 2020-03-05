<template>
  <div class="city-tab">
    <div class="tab-top">
      <div class="tab-click">
        <span class="tab-name">{{provinceName}}</span>
        <span>疫情速报></span>
      </div>
      <div class="city-change">
        <select class="select-area" @change="changeProvinceNews">
          <option value="hb">切换城市</option>
          <option value="hb">湖北</option>
          <option value="gd">广东</option>
          <option value="henan">河南</option>
          <option value="zj">浙江</option>
          <option value="hn">湖南</option>
          <option value="ah">安徽</option>
          <option value="jiangxi">江西</option>
          <option value="jiangsu">江苏</option>
          <option value="cq">重庆</option>
          <option value="sd">山东</option>
          <option value="cd">四川</option>
          <option value="heilongjiang">黑龙江</option>
          <option value="bj">北京</option>
          <option value="sh">上海</option>
          <option value="fj">福建</option>
          <option value="hebei">河北</option>
          <option value="xian">陕西</option>
          <option value="guangxi">广西</option>
          <option value="yn">云南</option>
          <option value="hainan">海南</option>
          <option value="guizhou">贵州</option>
          <option value="shanxi">山西</option>
          <option value="ln">辽宁</option>
          <option value="tj">天津</option>
          <option value="gansu">甘肃</option>
          <option value="jilin">吉林</option>
          <option value="neimenggu">内蒙古</option>
          <option value="xinjiang">新疆</option>
          <option value="ningxia">宁夏</option>
          <option value="hk">香港</option>
          <option value="qinghai">青海</option>
          <option value="taiwan">台湾</option>
          <option value="macau">澳门</option>
          <option value="xizang">西藏</option>
        </select>
      </div>
    </div>
    <div class="tab-box">
      <div class="tab-item">
        <div class="number add">2097</div>
        <div class="text">新增确诊</div>
      </div>
      <div class="tab-item">
        <div class="number confirm">31728</div>
        <div class="text">累计确诊</div>
      </div>
      <div class="tab-item">
        <div class="number heal">2222</div>
        <div class="text">治愈人数</div>
      </div>
      <div class="tab-item">
        <div class="number dead">974</div>
        <div class="text">死亡人数</div>
      </div>
    </div>
    <div class="tab-text">
      <div class="text-item" v-for="(item,index) in provinceNewList" :key="index">
        <i></i>
        <a :href="openUrl(item.cms_id)" target="_blank">{{item.title}}</a>
      </div>
    </div>
  </div>
</template>
<script>
import request from "../utils/request";
export default {
  data() {
    return {
      provinceName: "湖北",
      provinceNewList: []
    };
  },
  methods: {
    changeProvinceNews(item){
        let id  = item.target.value
        this.getProvinceNews(id)
    },
    openUrl(id) {
      return "https://view.inews.qq.com/w2/" + id;
    },
    async getProvinceNews(param='hb') {
      let { data } = await request.axiosGet(
        "https://api.dreamreader.qq.com/news/v1/province/news/list?province_code="+param
      );
      window.console.log(data)
      if (data.errno == 0) {
        this.provinceNewList = data.data.items;
      } else {
        alert("请求失败！");
      }
    }
  },
  created() {
    this.getProvinceNews();
  }
};
</script>
<style lang="stylus">
.city-tab {
  background: #eef5ff;
  padding: 20px 40px;
  margin-top: 80px;
  text-align: none;

  .tab-top {
    height: 75px;
    line-height: 75px;
    font-size: 16px;
    font-weight: bold;
    position: relative;

    .tab-click {
      span.tab-name {
        color: #005dff;
      }
    }

    .city-change {
      width: 82px;
      height: 25px;
      background: url('../assets/per-change.png');
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: 25px;

      .select-area {
        width: 82px;
        height: 52px;
        opacity: 0;
        position: absolute;
        right: 0;
        top: -25px;
      }
    }
  }

  .tab-box {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    border-bottom: 1px solid #d8d8d8;
    padding-bottom: 10px;

    .tab-item {
      text-align: center;

      .number {
        font-size: 20px;
        font-weight: bold;
      }

      .number.add {
        color: #005dff;
      }

      .number.confirm {
        color: #f55253;
      }

      .number.heal {
        color: #178b50;
      }

      .number.dead {
        color: #66666c;
      }

      .text {
        font-size: 12px;
        color: #222222;
        margin-top: 10px;
      }
    }
  }

  .tab-text {
    .text-item {
      padding: 20px;
      font-size: 18px;
      color: #222222;
      font-weight: 400;
      position: relative;

      &::before {
        width: 2px;
        top: 0;
        left: 7px;
        bottom: 0;
        background-color: #d8d8d8;
      }

      &::after {
        width: 14px;
        height: 14px;
        border: 4px solid #737373;
        background-color: #f8f8f8;
        border-radius: 8px;
        top: 34px;
        left: 0;
      }

      &::before, &::after {
        content: '.';
        display: block;
        font-size: 0;
        line-height: 0;
        position: absolute;
      }

      &:first-child {
        &::before {
          top: 50px;
        }
      }

      &:first-child i {
        background-color: #222222;
        width: 76px;
        height: 32px;
        background: url('../assets/text-before.png') 0 0 no-repeat;
        background-size: 76px 32px;
        display: inline-block;
        margin-bottom: -4px;
        margin-right: 5px;
      }
    }
  }
}
</style>