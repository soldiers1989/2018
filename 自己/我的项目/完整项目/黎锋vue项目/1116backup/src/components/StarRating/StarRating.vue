<template>
    <div class="star-component" style="display: flex;" v-if="orderinformation">
    	<div class="drivername tl" style="flex: 5;max-width: 100px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"><span style="font-size: 14px;">{{orderinformation.driver.name}}</span></div>
    	<div style="line-height: 17px;flex：1;text-align: left;">
            <span v-for="(item,index) in scoreLevel"
                  :key="index"
                  :class="[item=='on'?'star-item-on':item=='half'?'star-item-half':'star-item-off']"
                  @click="chooseStar(index)"
                  class="star-item"
                  @mouseover="starOver(index)"
            ></span>
    	</div>
        <div class="s tl" style="flex: 1;">
        	<span v-if="selfScore>=5" style="font-size: 14px;">五星接单王</span>
        	<span v-else-if="selfScore<5" style="font-size: 14px;">{{selfScore}}</span>
        	<span v-else  style="font-size: 14px;">暂无评分</span>
        </div>
            
            
    </div>
</template>

<script>
    export default {
        name:'starRating',
       
        props: {
        	orderinformation:Object,

            //单个评分
            score:{
                type: Number,
                default:5
            },
            //是否是选择模式
            canChoose:{
                type:Boolean,
                default:false
            },
            //总数
            max:{
                type:Number,
                default:5
            },
            //四舍五入模式，默认不四舍五入。
            //默认模式 normal
            //四舍五入模式 round
            //向上取整 roundUp
            //向下取整 roundDown
            mode:{
                type:String,
                default:"normal"
            }
        },
        data:  function () {
            return {
                //是否已经选择
                hasChoosed:false,
                //传入组件的单个评分的映射
                selfScore:this.score
            }
        },
        computed: {
            scoreLevel:function(){
                //处理最大值情况
                var max = this.max;
                var score =this.selfScore>max?max:this.selfScore;
                var mode = this.mode;
                //每颗星星对应的状态
                var result = [];
                score = (score*10/max)/2;
                //向上取整
                if(mode==="roundUp"){
                    score=Math.ceil(score)
                }
                //向下取整
                if(mode==="roundDown"){
                    score=Math.floor(score)
                }
                //四舍五入
                if(mode==="round"){
                    score = score.toFixed(0)
                }
                //取整
                var integer = Math.floor(score);
                //是否有小数
                var hasDecimal = score%1!==0;
                //满星
                for(var i=0;i<integer;i++){
                    result.push("on");
                }
                //半星
                if(hasDecimal){
                    result.push("half")
                }
                //无星
                while(result.length<5){
                    result.push("off")
                }
                console.log(result)
                return result;
            }
        },
        watch: {
        },
        mounted(){
        	this.getdriverinfo()
        },
        methods: {
            chooseStar(index,$event){
                //判断是否是第一次选择
                if(this.canChoose&&!this.hasChoosed){
                    this.selfScore=(this.max*(index+1)/5);
                    this.hasChoosed=true;
                    this.$emit('change', index);
                }
            },
            starOver(index,$event){
                if(this.canChoose&&!this.hasChoosed){
                    this.selfScore = index+1;
                    this.$emit('change', index);
                }
            },
            getdriverinfo(){
            	let that = this
            	that.selfScore = that.orderinformation.driver.star
            	setTimeout(function(){
            		console.log(that.orderinformation)
            	},500)
            }
        }
    }
</script>

<style>
	.drivername{
		line-height: 17px;

	}
	
    .star-item{
        display: inline-block;
        background-repeat:no-repeat;
        width:16px;
        height:20px;
        /*margin-right:5px;*/
        -webkit-background-size: 100%;
        background-size: 100%;
    }
    .star-item-on{
        background: url("../../../static/img/star-off.png") 0 0 no-repeat;
    }
    .star-item-half{
        background: url("../../../static/img/star-half.png")  0 0 no-repeat;
    }
    .star-item-off{
        background: url("../../../static/img/star-on.png")  0 0 no-repeat;
    }
</style>