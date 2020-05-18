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
                        <option value="ningxia" name='宁夏'>宁夏</option>
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
        <div class="topdataWrapper">
            <div class="timeNum">
                <p class="d">
                    统计截至<span>{{lastUpdateTime}}</span>
                </p>
            </div>
            <div class="recentNumber">
                <div class="icbar nowConfirm">
                    <p class="add">
                        较上日
                        <span class="addNum">+0</span>
                    </p>
                    <div class="number">{{areaData.total.nowConfirm}}</div>
                    <div class="text">现有确诊</div>
                </div>
                <div class="icbar confirm">
                    <p class="add">
                        较上日
                        <span class="addNum">+0</span>
                    </p>
                    <div class="number">{{areaData.total.confirm}}</div>
                    <div class="text">累计确诊</div>
                </div>
                <div class="icbar heal">
                    <p class="add">
                        较上日
                        <span class="addNum">+0</span>
                    </p>
                    <div class="number">{{areaData.total.heal}}</div>
                    <div class="text">累计治愈</div>
                </div>
                <div class="icbar dead">
                    <p class="add">
                        较上日
                        <span class="addNum">+0</span>
                    </p>
                    <div class="number">{{areaData.total.dead}}</div>
                    <div class="text">累计死亡</div>
                </div>
            </div>
            
        </div>
        <template v-if="city">
            <div class="areaView">
            <p class="city">
                {{city}}
            </p>
            <div class="list">
                <p><span>{{cityData.today.confirm}}</span>新增</p>
                <p><span>{{cityData.total.confirm}}</span>确诊</p>
                <p><span>{{cityData.total.heal}}</span>治愈</p>
                <p><span>{{cityData.total.dead}}</span>死亡</p>
            </div>
        </div>
        </template>
        <e-province-map :chartSettings="chartSettings" :MapData="MapData"></e-province-map>
        <e-province-line :provinceNowConfirmList="provinceNowConfirmList" :cityConfirmList="cityConfirmList" :provinceConfirmList="provinceConfirmList" :provinceName="provinceName" :city="city"></e-province-line>
        <e-province-table :data="table" :provinceName="provinceName"></e-province-table>
        <e-province-hospital :hospitalList="hospitalList"></e-province-hospital>
        <e-province-news :newsList="newsList" :provinceName="provinceName"></e-province-news>
    </div>
</template>
<script>
import EProvinceMap from "../components/provinceMap.vue";
import EProvinceLine from "../components/provinceLine.vue";
import EProvinceTable from "../components/provinceTable.vue";
import EProvinceHospital from "../components/provinceHospital.vue";
import EProvinceNews from "../components/provinceNews.vue";
import pinyin from "pinyin";
export default {
    name:'area',
    components:{
        EProvinceMap,
        EProvinceLine,
        EProvinceTable,
        EProvinceHospital,
        EProvinceNews
    },
    data(){
        return{
            provinceName:'',
            city:'',
            pcode:'',
            lastUpdateTime:'',
            provinceNowConfirmList:{},
            provinceConfirmList:{},
            cityConfirmList:{},
            table:[],
            hospitalList:[],
            newsList:[],
            areaData:{},
            cityData:{},
            chinaList:[],
            chartSettings:{},
            MapValue:'',
            MapData:{}
        }
    },
    created(){
        this.provinceName = '湖北'
        this.city = '武汉'
        this.pcode = 'hb'
        let data =this.$store.getters.getChinaData;
        // window.console.log(data)
        this.lastUpdateTime = data.lastUpdateTime;
        //this.getProvinceList()
        //获取city统计数据
        this.getCityData()
        //获取province统计数据
        this.getProvinceData()
        this.getHospital()
        this.getNewsList()
        let list = data.areaTree[0].children
        this.chinaList = list;
        // let that = this
        // let item1 = list.filter((item)=>{
        //     return item.name == that.provinceName
        // })
        // this.areaData = item1[0]
        // this.table = item1[0].children
        // let cityData = item1[0].children.filter((item)=>{
        //     return item.name == that.city
        // })
        // this.cityData = cityData[0]
        this.getTableData()
        this.getProvinceMapData()
        // window.console.log(cityData)
        //map
        this.MapValue = 'beijing'
        this.chartSettings = {
                position: `province/${this.MapValue}`,
                digit:1,
                    label:{
                        show:true,
                        position:'inside',
                        fontSize:8
                    },
                    labelMap: {
                        'nowConfirm': '现有确诊',
                        'confirm':'累计确诊'
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#fff'
                        }
                },
        }
    },
    methods:{
        getTableData:function(){
            let that = this
            let item1 = this.chinaList.filter((item)=>{
                return item.name == that.provinceName
            })
            this.areaData = item1[0]
            this.table = item1[0].children
            if(this.city){
                let cityData = item1[0].children.filter((item)=>{
                    return item.name == that.city
                })
                this.cityData = cityData[0]
            }else{
                this.cityData = []
            }
            
        },
        getProvinceMapData:function(){
            let provinces = this.table
            let MapData = []
            for (let i = 0; i < provinces.length; i++) {
                let item = {}
                item.name = provinces[i].name;
                item.confirm = provinces[i].total.confirm
                MapData.push(item)
            }
            window.console.log(MapData)
            this.MapData = {
                columns: ["name", "confirm"],
                rows: MapData
            };
        },
        getCityData:async function(){
            let {data} =await this.$axios.axiosGet(`/newsqa/v1/query/pubished/daily/list?province=${this.provinceName}&city=${this.city}`)
            let list =data.data;
            // window.console.log(list)
            let cityConfirmList = [];
            for(let i = 0; i < list.length; i++){
                let item1 = {}
                let date = list[i].date
                let confirm = list[i].confirm
                let heal = list[i].heal
                let dead = list[i].dead
                item1.date = date
                item1.confirm = confirm
                item1.heal = heal
                item1.dead = dead
                cityConfirmList.push(item1)
            }
            this.cityConfirmList = {
                columns:['date','confirm','heal','dead'],
                rows:cityConfirmList
            }
        },
        getProvinceData:async function(){
            let {data} =await this.$axios.axiosGet(`/newsqa/v1/query/pubished/daily/list?province=${this.provinceName}`)
            let list = data.data;
            // window.console.log(list)
            let provinceNowConfirmList = []
            let provinceConfirmList = []
            for(let i = 0; i < list.length; i++){
                let item = {}
                let date = list[i].date
                let newConfirm = list[i].newConfirm
                let newHeal = list[i].newHeal
                let newDead = list[i].newDead
                item.date = date;
                item.newConfirm = newConfirm;
                item.newHeal = newHeal;
                item.newDead = newDead;
                provinceNowConfirmList.push(item)
                let item1 = {}
                let confirm = list[i].confirm
                let heal = list[i].heal
                let dead = list[i].dead
                item1.date = date;
                
                item1.confirm = confirm
                item1.heal = heal
                item1.dead = dead
                item1.existingConfirm = confirm-heal-dead
                provinceConfirmList.push(item1)
            }
            //window.console.log(data)
            this.provinceNowConfirmList = {
                columns:['date','newConfirm','newDead','newHeal'],
                rows:provinceNowConfirmList
            }
            this.provinceConfirmList = {
                columns:['date','confirm','existingConfirm','heal','dead'],
                rows:provinceConfirmList
            }
        },
        getProvinceList1:async function(){
            let { data } = await this.$axios.axiosGet("/g2/getOnsInfo?name=wuwei_ww_city_list_order");
            this.$store.dispatch('setProvinceList',{data:data})
        },
        getHospital:async function(){
            let args = {}
            args.req = {}
            args.req.province = this.provinceName
            let context ={channel:'AAEEviDRbllNrToqonqBmrER'}
            let {data} = await this.$axios.axiosPost('https://wechat.wecity.qq.com/api/THPneumoniaService/getHospitalCityByProvince',{
                service: "THPneumoniaOuterService",
                func: "getHospitalCityByProvince",
                context,
                args
            })
            this.hospitalList = data.args.rsp.info.citys
        },
        getNewsList:async function(){
            let { data } = await this.$axios.axiosGet(`/news/v1/province/news/list?province_code=${this.pcode}&page_size=10`);
            // this.$store.dispatch('setProvinceList',{data:data})
            this.newsList  = data.data.items
            //  window.console.log(data.data.items)
        },
        getCityName:function(value){
            if(value == 'hb'){
                this.city = '武汉'
            }else if(value =='gd'){
                this.city = '广州'
            }else if(value =='henan'){
                this.city = '郑州'
            }else if(value =='zj'){
                this.city = '杭州'
            }else if(value =='hn'){
                this.city = '长沙'
            }else if(value =='ah'){
                this.city = '合肥'
            }else if(value =='jiangxi'){
                this.city = '南昌'
            }else if(value =='jiangsu'){
                this.city = '南京'
            }else if(value =='sd'){
                this.city = '济南'
            }else if(value =='cd'){
                this.city = '成都'
            }else if(value =='heilongjiang'){
                this.city = '哈尔滨'
            }else if(value =='fj'){
                this.city = '福州'
            }else if(value =='hebei'){
                this.city = '石家庄'
            }else if(value =='xian'){
                this.city = '西安'
            }else if(value =='guangxi'){
                this.city = '南宁'
            }else if(value =='yn'){
                this.city = '昆明'
            }else if(value =='hainan'){
                this.city = '三亚'
            }else if(value =='guizhou'){
                this.city = '贵阳'
            }else if(value =='shanxi'){
                this.city = '太原'
            }else if(value =='ln'){
                this.city = '沈阳'
            }else if(value =='gansu'){
                this.city = '兰州'
            }else if(value =='jilin'){
                this.city = '长春'
            }else if(value =='neimenggu'){
                this.city = '呼和浩特'
            }else if(value =='xinjiang'){
                this.city = '乌鲁木齐'
            }else if(value =='ningxia'){
                this.city = '银川'
            }else if(value =='qinghai'){
                this.city = '西宁'
            }else if(value =='xizang'){
                this.city = '拉萨'
            }
        },
        changeProvince:function(item){
            
            let value  = item.target.value
            if(value == 'hk' ||value =='macau'||value=='taiwan'){
                return;
            }
            let name = item.target.selectedOptions[0].text
            this.pcode = value
            this.provinceName = name
            let s = pinyin(name, {
                style: pinyin.STYLE_NORMAL
            })
            let list =[].concat.apply([], s)
            this.MapValue = list.join("");
            // window.console.log(MapValue)
            //地图setting
            this.chartSettings = {
                position: `province/${this.MapValue}`,
                digit:1,
                    label:{
                        show:true,
                        position:'inside',
                        fontSize:8
                    },
                    labelMap: {
                        'nowConfirm': '现有确诊',
                        'Confirm':'累计确诊'
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#fff'
                        }
                },
            }
            // let data =this.$store.getters.getProvinceList;
            //获取省会城市
            if(value =='bj'||value=='tj'||value =='sh'||value=='cq'){
                this.city =''
                this.cityConfirmList = {}
            }else{
                this.getCityName(value)
                this.getCityData()
                
            }

            this.getTableData()
            this.getProvinceData()
            this.getHospital()
            this.getNewsList()
            // window.console.log(pcode)
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
.topdataWrapper{
    .timeNum{
        padding: 5.333vw 5.333vw 4vw;
        line-height: 3.733vw;
        font-size: 3.2vw;
        background-color: #fff;
        color: #737373;
        position: relative;
        border-radius: 3.2vw 3.2vw 0 0;
        .d{
            position: relative;
            span{
                font-weight: 500;
                color: #222;
            }
        }
    }
    .recentNumber{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        .icbar{
            width: 21.867vw;
            position: relative;
            text-align: center;
            padding: 1.6vw 0 3.2vw;
            margin-right: .533vw;
            &:first-child{
                border-radius: 1.6vw 0 0 1.6vw;
            }
            &:last-child{
                border-radius: 0 1.6vw 1.6vw 0;
                margin-right: 0;
            }
            .add{
                padding-top: 1.6vw;
                color: #7c7c7c;
                font-size: 2.667vw;
                line-height: 2.667vw;
                height: 2.667vw;
                font-weight: 500;
                display: none;
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
        .nowConfirm{
            background-color: #fff0f1;
            .addNum{
                color: #f23a3b;
            }
            .number{
                color: #f23a3b;
            }
        }
        .confirm{
            background-color: #fff0f1;
            .addNum{
                color: #cc1e1e;
            }
            .number{
                color: #cc1e1e;
            }
        }
        .heal{
            background-color: #f0f8f4;
            .addNum{
                color: #178b50;
            }
            .number{
                color: #178b50;
            }
        }
        .dead{
            background-color: #f2f6f7;
            .addNum{
                color: #4e5a65;
            }
            .number{
                color: #4e5a65;
            }
        }
        
    }
}
.areaView{
    margin: 4vw 5.333vw 0;
    background-color: #f8f8f8;
    border-radius: 1.6vw;
    padding: 3.2vw 0;
    .city{
        height: 3.733vw;
        line-height: 3.733vw;
        font-size: 3.733vw;
        color: #005dff;
        font-weight: 600;
        padding-left: 4.267vw;
        margin-left: 4vw;
        position: relative;
        &::before{
            content: ".";
            font-size: 0;
            line-height: 0;
            display: block;
            position: absolute;
            width: 3.733vw;
            left: 0;
            top: 50%;
            transform: translateY(-56%);
            background: url('../assets/icon_location.png');
            background-size: 100% 100%;
        }
    }
    .list{
        margin: 3.2vw 0 0;
        line-height: 3.733vw;
        font-size: 3.733vw;
        display: flex;
        justify-content: center;
        p{
            width: 25%;
            text-align: center;
            span{
                font-weight: 700;
                margin-right: .533vw;
            }
        }
    }
}

</style>