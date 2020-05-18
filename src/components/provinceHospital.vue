<template>
    <div class="provinceHospital">
        <div class="up-tips tips-yiqing">
            <span>医疗救治医院</span>
            <p class="icon_hospital"></p>
        </div>
        <div class="hp_scroll">
            <swiper class="hp_SwiperWrapper" :options="swiperHpOption" ref="hpSwiperWrapper">
                <template v-if="count==1">
                    <swiper-slide>
                            <div class="item_w clearfix">
                                <div class="item" v-for="(item,index) in list1" :key="index" >
                                    <div>
                                        <p class="
                                        name">{{item.cityName}}</p>
                                        <p class="num">{{item.count}}家</p>
                                        <a target="_blank"></a>
                                    </div>
                                </div>
                            </div>
                    </swiper-slide>
                </template>
                <template v-if="count==2">
                    <swiper-slide>
                            <div class="item_w clearfix">
                                <div class="item" v-for="(item,index) in list1" :key="index" >
                                    <div>
                                        <p class="
                                        name">{{item.cityName}}</p>
                                        <p class="num">{{item.count}}家</p>
                                        <a target="_blank"></a>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div class="item_w clearfix">
                                <div class="item" v-for="(item,index) in list2" :key="index" >
                                <div>
                                        <p class="
                                        name">{{item.cityName}}</p>
                                        <p class="num">{{item.count}}家</p>
                                        <a target="_blank"></a>
                                </div>
                                </div>
                            </div>
                        </swiper-slide>
                </template>
                <template v-if="count==3">
                    
                        <swiper-slide>
                            <div class="item_w clearfix">
                                <div class="item" v-for="(item,index) in list1" :key="index" >
                                    <div>
                                        <p class="
                                        name">{{item.cityName}}</p>
                                        <p class="num">{{item.count}}家</p>
                                        <a target="_blank"></a>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div class="item_w clearfix">
                                <div class="item" v-for="(item,index) in list2" :key="index" >
                                <div>
                                        <p class="
                                        name">{{item.cityName}}</p>
                                        <p class="num">{{item.count}}家</p>
                                        <a target="_blank"></a>
                                </div>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div class="item_w clearfix">
                                <div class="item" v-for="(item,index) in list3" :key="index" >
                                <div>
                                        <p class="
                                        name">{{item.cityName}}</p>
                                        <p class="num">{{item.count}}家</p>
                                        <a target="_blank"></a>
                                </div>
                                </div>
                            </div>
                        </swiper-slide>
                
                </template>
             </swiper>
            <!-- <div class="line-pagination swiper-pagination" slot="pagination">
            </div> -->
        </div>
    </div>
</template>
<script>
export default {
    name:'provinceHospital',
    props:{
        hospitalList:[Array,Object]
    },
    data(){
        return{
            count:0,
            list1:[],
            list2:[],
            list3:[],
            swiperHpOption:{
                pagination:{
                    el:'.swiper-pagination',
                    type:'custom'
                    // clickable :true,
                    // bulletClass: 'pagination-customs',
                    // bulletActiveClass: 'active',
                    // renderCustom:function(){
                    //    let html ='<span class="pagination-customs"></span>'
                    //    return html
                    // }
                }
            }
        }
    },
    created(){
        
    },
    methods:{
        getHospitalList:function(){
            // window.console.log(this.hospitalList)
            let totalLength = this.hospitalList.length;
            let size = 8;
            let count=0;
            if (totalLength/size > parseInt(totalLength/size)){
                count = parseInt(totalLength/size)+1;
            }else{
                count = parseInt(totalLength/size);
            }
            let list1=[];
            let list2=[];
            let list3 = [];
            if(count==1){
                list1 = this.hospitalList
            }else if(count ==2){
                list1 = this.hospitalList.slice(0,size)
                list2 = this.hospitalList.slice(size,totalLength)
            }else if(count ==3){
                list1 = this.hospitalList.slice(0,size)
                list2 = this.hospitalList.slice(size,size*2)
                list3 = this.hospitalList.slice(size*2,totalLength)
            }
            
            this.count = count;
            this.list1 =list1;
            this.list2 =list2;
            this.list3 =list3;
        }
    },
    computed:{
        swiper(){
            return this.$refs.hpSwiperWrapper.swiper
        }
    },
    mounted(){
        this.swiper.slideTo(0,1000,false)
    },
    watch:{
        hospitalList:function () {
            this.getHospitalList()
        }
    }
}
</script>
<style lang="stylus" scoped>
.provinceHospital{
    margin-top :9.6vw;
    .up-tips{
        display:flex;
        align-items :center;
        height: 4.8vw;
        line-height: normal;
        color: #222;
        font-size: 3.733vw;
        font-weight: 700;
        box-sizing: border-box;
        justify-content: space-between;
    }
    .tips-yiqing{
        position:relative;
        margin:0 5.333vw;
        padding:0;
    }
    .icon_hospital{
        width: 33.333vw;
        height: 10.667vw;
        background :url('../assets/heal.png');
        background-size: 100% 100%;
    }
    .hp_scroll{
        margin: 4vw 5.333vw 0;
        .hp_SwiperWrapper{
            position relative;
            .item_w{
                width:90.133vw;
                position:relative;
                .item{
                    width:25%;
                    overflow:hidden;
                    position:relative;
                    float:left;
                    div{
                        height:14.933vw;
                        padding: 0 3.2vw;
                        margin: 0 .8vw .8vw 0;
                        border-radius: 1.6vw;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        position: relative;
                        background-color: #f3f6f8;
                        .name{
                            font-size: 3.733vw;
                            line-height: 4.267vw;
                            max-height: 8.533vw;
                            margin-bottom: 2.133vw;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                        .num{
                            font-size: 3.2vw;
                            line-height: 3.2vw;
                            color: #2b78fd;
                        }
                        a{
                            position: absolute;
                            left: 0;
                            top: 0;
                            right: 0;
                            bottom: 0;
                        }
                    }
                }
            }
        }
        .swiper-pagination-custom{
                bottom 0;
        }
        .line-pagination {
            width:90.133vw;
            position:relative;
            height: 1.6vw;
            margin-top: 4vw;
            text-align: center;
            align-items: center;
            justify-content:center;
            display:flex;
            .pagination-customs5{
                width: 1.6vw;
                height: 1.6vw;
                display: inline-block;
                border-radius: 1.6vw;
                background-color: #d8d8d8;
                margin: 0 1.067vw;
            }
        }
    }
}
</style>