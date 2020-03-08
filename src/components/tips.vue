<template>
    <div class="knowledgeWrapper">
        <p class="p-fanghu">新冠肺炎预防须知</p>
        <div class="fanghu_card">
            <div class="fanghu_title_wrap">
                <img src="../assets/tips_1.png" class="fanghu_icon"/>
                <div class="fanghu_title">个人清洁</div>
            </div>
            <div class="fanghu_item">
                <div class="fanghu_item_point"></div>
                <div class="fanghu_item_text">经常保持双手清洁，尤其在触摸口、鼻或眼之前。</div>
            </div>
            <div class="fanghu_item">
                <div class="fanghu_item_point"></div>
                <div  class="fanghu_item_text">经常用洗手液和清水清洗双手，搓手最少20秒，并用纸巾擦干。</div>
            </div>
            <div class="fanghu_item">
                <div class="fanghu_item_point"></div>
                <div  class="fanghu_item_text">打喷嚏或咳嗽时应用纸巾掩盖口鼻，把用过的纸巾弃置于有盖垃圾箱内，然后彻底清洁双手。</div>
            </div>
            <div class="fanghu_title_wrap">
                <img src="../assets/tips_2.png" class="fanghu_icon"/>
                <div class="fanghu_title">尽量避免</div>
            </div>
            <div class="fanghu_item">
                <div class="fanghu_item_point"></div>
                <div  class="fanghu_item_text">减少前往人流密集的场所。如不可避免，应戴上外科口罩。</div>
            </div>
            <div class="fanghu_item">
                <div class="fanghu_item_point"></div>
                <div  class="fanghu_item_text">避免接触动物（包括野味）、禽鸟或其粪便；避免到海鲜、活禽市场或农场。</div>
            </div>
            <div class="fanghu_item">
                <div class="fanghu_item_point"></div>
                <div  class="fanghu_item_text">切勿进食野味及切勿光顾有提供野味的餐馆。</div>
            </div>
            <div class="fanghu_item">
                <div class="fanghu_item_point"></div>
                <div  class="fanghu_item_text">注意食物安全和卫生，避免进食或饮用生或未熟透的动物产品，包括奶类、蛋类和肉类。</div>
            </div>
            <div class="fanghu_title_wrap">
                <img src="../assets/tips_3.png" class="fanghu_icon"/>
                <div class="fanghu_title">尽快就诊</div>
            </div>
            <div class="fanghu_item">
                <div class="fanghu_item_point"></div>
                <div  class="fanghu_item_text">如有身体不适，特别是有发烧或咳嗽，应戴上外科口罩并尽快就诊。</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tips"
    }
</script>

<style scoped lang="stylus">
    .knowledgeWrapper{
        margin-top 5vw;
        width 100vw;
        padding-bottom 5vw;
        .p-fanghu{
            text-align center;
            font-size 5.333vw;
            color #222;
            font-weight 700;
        }
        .fanghu_card{
            background #f8f8f8;
            margin 5.333vw 5.333vw 0;
            border-radius 1.6vw;
            padding 1.333vw 5.333vw 5.333vw 5.333vw;
            .fanghu_title_wrap{
                display flex;
                justify-content flex-start;
                align-items center;
                padding-bottom 2.133vw;
                padding-top 4.133vw;
                .fanghu_icon{
                    width: 4.267vw;
                    height: 4.267vw;
                }
                .fanghu_title{
                    font-size: 3.733vw;
                    font-weight: 500;
                    margin-left: 2.667vw;
                }
            }
            .fanghu_item{
                margin-top: 2.133vw;
                position: relative;
                .fanghu_item_point{
                    width 1.067vw;
                    height 1.067vw;
                    background #005dff;
                    border-radius .533vw;
                    margin-top 1.867vw;
                    margin-right 2.133vw
                    position absolute;
                }
                .fanghu_item_text{
                    font-weight: 400;
                    font-size: 3.2vw;
                    line-height: 4.267vw;
                    color: #222;
                    margin-left: 3.2vw;
                }
            }
        }
    }
</style>
