<template>
    <div>
        <div class="data-statement">
            <div class="title">全国疫情状况</div>
            <div class="update-time">{{updateTime}}</div>
            <div class="data-explain"><span>数据说明</span></div>
        </div>
        <e-summary :today="today" :total="total" />
        
        <e-provinceCom />

        <div class="section-title">国内病例</div>
        <e-table :data="table" />
    </div>
</template>

<script>
import buildMapData from '../data/map'
import ESummary from '../components/Summary.vue'
import ETable from '../components/Table.vue'
import EProvinceCom from '../components/provinceCom.vue'
import { getNameByPinyin,getPinyinByName } from '../data/zhen'
export default {
    components:{
        ESummary,
        ETable,
        EProvinceCom
    },
    data(){
        return{
            updateTime:'',
            total:{},
            today:{},
            map:{},
            table:[],
            chinaDayList:null,
            provinceName:'',
            initOptions: {
                renderer: 'canvas'
            }
        }
    },
    methods:{
        handleClick (params) {
            let provincePinyin = getPinyinByName(params.name)
            this.$router.push(`/${provincePinyin}`)
        },
    },
    created(){
        let province = this.$route.path.substr(1)
        this.provinceName = getNameByPinyin(province)
        const {
            updateTime,
            total,
            map,
            table,
            chinaDayList,
            today
        } = buildMapData(this.provinceName)

        this.updateTime = updateTime;
        this.chinaDayList  =chinaDayList
        this.today = today
        this.total = total
        this.map = map
        this.table = table
    }
}
</script>
<style lang="stylus">
    .data-explain
        position absolute
        right 15px
        top 15px
        font-size 12px
        color #B6B6B6
</style>