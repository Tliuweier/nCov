<template>
  <div id="app">
    <div  class="wrap">
      <div class="head">
          <p class="title">
          </p>
          <p class="jump"></p>
          <p class="jump_zhuizong"></p>
          <p class="qs">
            <span>数据来源：国家及各地卫健委每日信息发布</span>
          </p>
      </div>
       <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang='stylus'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  width: 100vw;
  position: relative;
  min-height: 100vh;
  margin: 0 auto;
  .wrap {
    width:100vw;
    overflow:hidden;
    .head{
      height:40vw;
      position:relative;
      background-size: cover;
      &::before{
        content :'.';
        font-size :0;
        line-height :0;
        display:block;
        position:absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 48.533vw;
        background: url('./assets/head_bg_new.png') top;
        background-size: cover;
      }
      .title{
        width :50.667vw;
        height :16.553vw;
        position:absolute;
        left :50%;
        transform: translate(-50%);
        top:14.933vw;
        background :url('./assets/head_title.png');
        background-size: 100% 100%;
      }
      .jump,.jump_zhuizong{
        height :6.933vw;
        position:absolute;
        top:4vw;
      }
      .jump{
        width: 22.4vw;
        background: url('./assets/head_more.png');
        background-size: 100% 100%;
        right: 0;
      }
      .jump_zhuizong{
        width: 17.6vw;
        background: url('./assets/head_zz2.png');
        background-size: 100% 100%;
        right: 24vw;
      }
      .qs{
        line-height :3.733vw;
        height :3.733vw;
        color:#fff;
        font-size :3.2vw;
        position:absolute;
        left: 5.333vw;
        right: 5.333vw;
        bottom: 4vw;
        text-align: center;
        span{
          display:inline-block;
          position :relative;
          padding-right :4.533vw;
          &::before{
            content:'.';
            font-size :0;
            line-height :0;
            position :absolute;
            right: 0;
            top:50%;
            transform: translateY(-50%);
            margin-top: -1px;
            width: 3.2vw;
            height: 3.2vw;
            background: url('./assets/icon_qs2.png');
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
</style>
