<template>
	<view class="tab">
		<scroll-view  scroll-x="true" class="tab-scroll" scroll-with-animation="true">
			<view class="tab-scroll-box">
				<view class="tab-scroll-item" :class="{active:clickIndex === index}" v-for="(item,index) in labelList" :key='index' @click="changeColor(item,index)">{{item.name}}</view>
			</view>
		</scroll-view>
		<view class="tab-icons" @click="toTag">
			<uni-icons type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				clickIndex:0,
			};
		},
		props:{
			labelList:{
				type:Array,
				default(){
					return []
				}
			},
			swiperIndex:{
				type:Number,
				default:0
			}
		},
		methods:{
			changeColor(item,index){
				this.clickIndex = index
				this.$emit('tab',{
					data:item,
					index
				})
			},
			toTag(){
				uni.navigateTo({
					url:'/pages/tag/tag'
				})
			}
		},
		watch:{
			swiperIndex(newVal){
				this.clickIndex = newVal
				// console.log(newVal,oldVal)
			}
		}
	}
</script>

<style lang="scss">
	.tab{
		display: flex;
		background-color: #fff;
		border-bottom: 1px solid #f5f5f5;
		width: 100%;
		box-sizing: border-box;
		.tab-scroll{
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;
			.tab-scroll-box{
				display: flex;
				// justify-content: space-around;
				align-items: center;
				flex-wrap: nowrap;
				height: 45px;
				.tab-scroll-item{
					flex-shrink: 0;
					padding: 0 10px;
					color: #333;
					font-size: 14px;
				}
				.active{
					color: #f07373;
				}
			}
		}
		.tab-icons{
			position: relative;
			display: flex;
			width: 45px;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: center;
			&::after{
				content: '';
				position: absolute;
				top: 12px;
				bottom: 12px;
				left: 0;
				width: 1px;
				background-color: #ddd;
			}
		}
	}
</style>
