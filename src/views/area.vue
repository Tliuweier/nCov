<template>
    <div>
        <div class="head">
            <p class="qs">
                <span>数据来源：国家及各地卫健委每日信息发布</span>
            </p>
            <div class="btns">
                <div class="btn b_change">
                    切换城市
                    <select @change="changeProvince">
                        <option value="hb" name='湖北'>湖北</option>
                        <option value="gd" name='广东'>广东</option>
                        <option value="henan" name='河南'>河南</option>
                        <option value="zj" name='浙江'>浙江</option>
                        <option value="hn" name='湖南'>湖南</option>
                        <option value="ah" name='安徽'>安徽</option>
                        <option value="jiangxi" name='江西'>江西</option>
                        <option value="jiangsu" name='江苏'>江苏</option>
                        <option value="cq" name='重庆'>重庆</option>
                        <option value="sd" name='山东'>山东</option>
                        <option value="cd" name='四川'>四川</option>
                        <option value="heilongjiang" name='黑龙江'>黑龙江</option>
                        <option value="bj" name='北京'>北京</option>
                        <option value="sh" name='上海'>上海</option>
                        <option value="fj" name='福建'>福建</option>
                        <option value="hebei" name='河北'>河北</option>
                        <option value="xian" name='陕西'>陕西</option>
                        <option value="guangxi" name='广西'>广西</option>
                        <option value="yn" name='云南'>云南</option>
                        <option value="hainan" name='海南'>海南</option>
                        <option value="guizhou" name='贵州'>贵州</option>
                        <option value="shanxi" name='山西'>山西</option>
                        <option value="ln" name='辽宁'>辽宁</option>
                        <option value="tj" name='天津'>天津</option>
                        <option value="gansu" name='甘肃'>甘肃</option>
                        <option value="jilin" name='吉林'>吉林</option>
                        <option value="neimenggu" name='内蒙古'>内蒙古</option>
                        <option value="xinjiang" name='新疆'>新疆</option>
                        <option value="ningxia" name='新疆'>宁夏</option>
                        <option value="hk" name='香港'>香港</option>
                        <option value="qinghai" name='青海'>青海</option>
                        <option value="taiwan" name='台湾'>台湾</option>
                        <option value="macau" name='澳门'>澳门</option>
                        <option value="xizang" name='西藏'>西藏</option>
                    </select>
                </div>
            </div>
            <div class="titles">
                <p class="h3"></p>
                <p class="h2">
                    <span>{{provinceName}}</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'area',
    data(){
        return{
            provinceName:''
        }
    },
    created(){
        this.provinceName = '湖北'
    },
    methods:{
        changeProvince:function(item){
            // let id  = item.target.value
            let name = item.target.selectedOptions[0].text
            this.provinceName = name
            //window.console.log(name)
            // this.getProvinceNews(id)
        }
    }
}
</script>
<style lang="stylus" scoped>
.head{
    height 40vw
    position relative
    background-size cover
    &::before{
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
    }
    .btns{
        position: absolute;
        right: 5.333vw;
        top: 4vw;
        line-height: normal;
        color: #fff;
        font-size: 3.2vw;
        font-weight: 400;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        .b_change{
            padding: 1.067vw 2.4vw 1.067vw 6.667vw;
            border-radius: 6.933vw;
            border: 1px solid hsla(0,0%,100%,.4);
            white-space: nowrap;
            &::before{
                background-image: url('../assets/icon_change.png')
            }
            select{
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                opacity: 0;
            }
        }
        .btn{
            position: relative;
            line-height: normal;
            &::before{
                content: ".";
                font-size: 0;
                line-height: 0;
                position: absolute;
                width: 3.2vw;
                height: 3.2vw;
                left: 2.667vw;
                top: 50%;
                -webkit-transform: translateY(-50%);
                transform: translateY(-50%);
                background-size: 100% 100%;
            }
        }
    }
    .qs{
        line-height: 3.733vw;
        height: 3.733vw;
        font-size: 3.2vw;
        color: #fff;
        position: absolute;
        left: 5.333vw;
        right: 5.333vw;
        top: 33.333vw;
    }
    .titles{
        position: absolute;
        left: 5.333vw;
        top: 14.4vw;
        color: #fff;
    }
    .h3{
        width: 45.867vw;
        height: 5.867vw;
        background: url('../assets/area_h3_bg.png');
        background-size: 100% 100%;
    }
    .h2{
        line-height: normal;
        margin: 1.333vw 0 0;
        font-size: 7.467vw;
        font-weight: 600;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        span{
            display: inline-block;
            font-size: 5.867vw;
            line-height: 8vw;
            color: #0056ee;
            background-color: #fff;
            padding: 0 1.333vw;
            margin-right: 1.6vw;
            border-radius: 1.067vw;
            position: relative;
            &::before{
                    content: ".";
                    font-size: 0;
                    line-height: 0;
                    display: block;
                    position: absolute;
                    width: 29.867vw;
                    height: 7.467vw;
                    background: url('../assets/area_h2_bg.png');
                    background-size: 100% 100%;
                    right: -31.467vw;
                    top: 50%;
                    transform: translateY(-50%);
            }
        }
    }
}
</style>