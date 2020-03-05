<template>
  <div class="table">
    <ul class="table-header">
      <li class="item-stress">地区</li>
      <li class="item-stress">新增</li>
      <li>累计确诊</li>
      <li>治愈</li>
      <li>死亡</li>
      <!-- <li>死亡率</li> -->
    </ul>
    <ul class="table-body">
        <li v-for="(item,index) in data" :key="index" class="table-province" >
            <div class="item-stress"  style="cursor:pointer" @click="expandLine(item.pinyin)">{{item.name}}</div>
            <div class="item-stress">{{item.today.confirm}}</div>
            <div>{{item.total.confirm}}</div>
            <div>{{item.total.heal}}</div>
            <div>{{item.total.dead}}</div>
            <!-- <div>{{(item.total.dead/item.total.confirm)|numFilter}}</div> -->
            <ul :id="item.pinyin" class="table-expand table-expand-hidden">
                <li v-for="(it,idx) in item.children" :key="idx" class="table-city">
                    <div class="item-stress">{{it.name}}</div>
                    <div class="item-stress">{{it.today.confirm}}</div>
                    <div>{{it.total.confirm}}</div>
                    <div>{{it.total.heal}}</div>
                    <div>{{it.total.dead}}</div>
                    <!-- <div>{{(it.total.dead/it.total.confirm)|numFilter}}</div> -->
                </li>
            </ul>
        </li>
    </ul>
  </div>
</template>
<script>
export default {
    props:{
        data:[Object,Array]
    },
    methods:{
        expandLine:function(pinyin){
            const targetDom = document.getElementById(pinyin)

                if (targetDom.classList.contains('table-expand-hidden')) {
                    targetDom.classList.remove('table-expand-hidden')
                    targetDom.classList.add('table-expand-show')
                } else {
                    targetDom.classList.remove('table-expand-show')
                    targetDom.classList.add('table-expand-hidden')
                }
        }
    },
    filters: {
        numFilter (value) {
            let realVal = ''
            if (!isNaN(value) && value!== '') {
            // 截取当前数据到小数点后三位
            let tempVal = parseFloat(value).toFixed(5)
            realVal = tempVal.substring(0, tempVal.length - 1)
            } else {
            realVal = '--'
            }
            return realVal
        }
    }
};
</script>
<style lang="stylus"></style>