<template>
	<view class="wrapper">
		<view class="title">个人中心</view>
		
		<view class="content">
			<view class="bgimg">
				<image :src="userInfo.avatar" mode="aspectFill"></image>
			</view>
			<view class="content-info">
				<view class="logo">
					<image :src="userInfo.avatar" mode="aspectFill"></image>
				</view>
				<text class="text">{{userInfo.author_name ||0 }}</text>
			</view>
			<view class="content-des">
				<view class="item">
					<text class="item-list">被关注</text>
					<text class="item-list item-color">{{userInfo.follow_count}}</text>
				</view>
				<view class="item">
					<text class="item-list">粉丝</text>
					<text class="item-list item-color">{{userInfo.fans_count}}</text>
				</view>
				<view class="item">
					<text class="item-list">积分</text>
					<text class="item-list item-color">{{userInfo.integral_count}}</text>
				</view>
			</view>
		</view>
		<view class="author" @click="toMyArticle">
			<view class="author-left" >
				<uni-icons type="contact" size="16" color="#666"></uni-icons>
				<text class="author-text">我的文章</text>
			</view>
			<view class="author-right">
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>	
			</view>	
		</view>
		<view class="author" @click="toPoint">
			<view class="author-left">
				<uni-icons type="help" size="16" color="#666"></uni-icons>
				<text class="author-text">意见反馈</text>
			</view>
			<view class="author-right">
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>	
			</view>	
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				userData:{},
				
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		onLoad() {
			// this.getUserData()
			// console.log(this.userInfo);
			
		},
		methods: {
			getUserData(){
				this.$api.get_user().then(res=>{
					console.log(res);
					this.userData  = res.data
					console.log(this.userData);
				})
			},			
			toMyArticle(){
				uni.navigateTo({
					url:'/pages/my_article/my_article'
				})
			},
			toPoint(){
				uni.navigateTo({
					url:'/pages/point/point'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f5f5f5;
	}
	.wrapper{
		position: relative;
		.title{
			padding: 10px 0;
			background-color: $ml-base-color;
			color: #000;
			font-weight: bold;
			text-align: center;
		}
		
		.content{
			position: relative;
			// background-image: url(../../../static/index-active.png);
			// background-repeat: no-repeat;
			// background-size: 100%;
			// background-position:center center;
			display: flex;
			flex-direction: column;
			padding-bottom: 15px;
			.bgimg{
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				filter: blur(8px);
				opacity: .3;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.content-info{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding-top: 30px;
				.logo{
					width: 50px;
					height: 50px;
					border-radius: 50%;
					overflow: hidden;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.text{
					font-size: 16px;
					color: #000;
					font-weight: bold;
					padding-top: 10px;
				}
			}
			.content-des{
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				margin-top: 15px;
				.item{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.item-list{
						font-size: 14px;
						color: #333;
					}
					.item-color{
						color: #999;
						font-size: 12px;
					}
				}
			}
		}
		.author{
			display: flex;
			background-color: #fff;
			padding: 10px 15px;
			align-items: center;
			margin-bottom: 10px;
			justify-content: space-between;
			color: #333;
			font-size: 14px;
			.author-left{
				.author-text{
					margin-left: 5px;
				}
			}
		}
	}
</style>
