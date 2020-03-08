<template>
    <div class="chinaListWrapper">
        <div class="up-tips tips-yiqing">
            <span class="title">中国疫情(包括港澳台)</span>
        </div>
        <span class="tips">7:00-10:00为更新高峰，数据如有滞后请谅解</span>
        <div class="listWrapper">
            <table>
                <thead>
                <tr>
                    <th class="area">
                        <span>地区</span>
                    </th>
                    <th>新增确诊</th>
                    <th>累计确诊</th>
                    <th>治愈</th>
                    <th>死亡</th>
                    <th>疫情</th>
                </tr>
                </thead>
            </table>
            <table>
                <tbody>
                <tr class="areaBox">
                    <th class="area">
                        <span>湖北</span>
                    </th>
                    <td>75</td>
                    <td>67666</td>
                    <td>43468</td>
                    <td>2959</td>
                    <td class="detail">详情</td>
                </tr>
                <tr class="city">
                    <th class="area">武汉</th>
                    <td>74</td>
                    <td>49871</td>
                    <td>28511</td>
                    <td>2349</td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "chinaTable"
    }
</script>

<style scoped lang="stylus">
    .chinaListWrapper {
        margin-top: 9.6vw;

        .up-tips {
            height 4.8vw;
            line-height normal;
            box-sizing border-box;
            font-size 3.733vw;
            font-weight 700;
            color #222;
            display flex;
            justify-content space-between
            align-items center;

            .title {
                display inline-block;
                position relative;
                font-size 4.267vw;
            }
        }

        .tips-yiqing {
            position relative;
            margin 0 5.333vw;
            padding 0;
        }

        .tips {
            color #737373;
            font-size 3.2vw;
            line-height 3.2vw;
            font-weight 400;
            font-style normal;
            margin 1vw 0 0 5.333vw;
        }

        .listWrapper {
            margin 4vw 5.333vw 0;

            table {
                border 0;
                padding 0;
                width 100%;
                border-spacing 0;

                thead {
                    border-spacing 0;

                }

                th {
                    height: 10.667vw;
                    text-align: center;
                    font-size: 3.2vw;
                    font-weight: 400;
                    padding: 0;
                    margin: 0;
                    border: 0;
                    &:first-child {
                        width 22.4vw;
                        background #f5f5f5;
                    }
                    &:nth-child(2){
                        width 15.677vw;
                        background #e8effc;
                        color #005dff;
                    }
                    &:nth-child(3){
                        width 15.677vw;
                        background #fdeeee;
                        color #f55253;
                    }
                    &:nth-child(4){
                        width 12vw;
                        background #e9f7ec;
                        color #178b50;
                    }
                    &:nth-child(5){
                        width 12vw;
                        background #f3f6f8;
                        color #4e5a65;
                    }
                    &:last-child{
                        background #f5f5f5;
                    }
                }

                tbody {
                    line-height 10.667vw;
                    height 10.677vw;
                    font-size 3.2vw;

                    th {
                        width  22.4vw;
                        span {
                            max-width 14.133vw;
                            white-space nowrap;
                        }

                        &::before {
                            content: ".";
                            font-size: 0;
                            line-height: 0;
                            display: block;
                            position: absolute;
                            left: 0;
                            right: 0;
                            height: 1px;
                            background-color: #f5f5f5;
                            bottom: 0;
                        }

                        &:first-child {
                            background #fff;

                            span {
                                display block;
                                padding-left 4.533vw;
                            }
                        }


                    }

                    td{
                        text-align center;
                        &:nth-child(2){
                            width 15.677vw;
                            color #005dff;
                        }
                        &:nth-child(3){
                            width 15.677vw;
                        }
                        &:nth-child(4){
                            width 12vw;
                        }
                        &:nth-child(5){
                            width 12vw;
                        }
                        &:last-child{

                        }
                    }
                    .areaBox {
                        font-size 3.733vw;

                        .area {
                            font-weight 600;
                            span{
                                position relative;
                                &::before{
                                    content: ".";
                                    font-size: 0;
                                    line-height: 0;
                                    display: block;
                                    position: absolute;
                                    width: 2.133vw;
                                    height: 1.6vw;
                                    left: 1.6vw;
                                    top: 50%;
                                    -webkit-transform: translateY(-50%);
                                    transform: translateY(-50%);
                                    background: url('../assets/area_top.png');
                                    background-size: 100% 100%;
                                }
                            }
                        }
                    }

                    .city {
                        color #737373;
                        th{
                            width: 22.4vw;

                        }
                        td{
                            text-align center;
                            &:nth-child(2){
                                width 15.677vw;
                                color #737373;
                            }
                            &:nth-child(3){
                                width 15.677vw;
                            }
                            &:nth-child(4){
                                width 12vw;
                            }
                            &:nth-child(5){
                                width 12vw;
                            }
                            &:last-child{

                            }
                        }
                        .area{
                            text-align left;
                                &::before {
                                    content: ".";
                                    font-size: 0;
                                    line-height: 0;
                                    display: block;
                                    position: absolute;
                                    left: 0;
                                    right: 0;
                                    height: 1px;
                                    background-color: #f5f5f5;
                                    bottom: 0;
                                }
                        }
                    }
                }
            }
        }

        table, thead, tbody, td, th, thead, tr {
            border-collapse collapse;
        }
    }
</style>
