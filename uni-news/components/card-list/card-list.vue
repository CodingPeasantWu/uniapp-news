<template>
	<view>
		<!-- 基础卡片 -->
		<view class="list-card" v-if="item.mode === 'base'" @click="openDetail">
			<view class="list-card-img">
				<image :src="item.cover[0]" mode="aspectFit"></image>
			</view>
			<view class="list-card-content">
				<view class="list-card-title">
					<text>{{item.title}}</text>
					<like-icon :item='item'></like-icon>
				</view>
				<view class="list-card-des">
					<view class="list-card-tag">
						<view class="left">{{item.classify}}</view>
						<view class="right">{{item.browse_count}}浏览</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 多图卡片 -->
		<view v-if="item.mode === 'column'" class="list-card mode-column">
			<view class="list-card-content">
				<view class="list-card-title">
					<text>{{item.title}}</text>
					<like-icon :item='item'></like-icon>
				</view>
				<view class="list-card-img">
					<view class="list-card-img-item" v-if="index < 3" v-for="(item,index) in item.cover" :key='index' >
						<image :src="item" mode="aspectFit"></image>				
					</view>
				</view>

				<view class="list-card-des">
					<view class="list-card-tag">
						<view class="left">{{item.classify}}</view>
						<view class="right">{{item.browse_count}}浏览</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 大图模式 -->
		<view v-if="item.mode === 'image'" class="list-card mode-image">
			<view class="list-card-img">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="list-card-content">
				<view class="list-card-title">
					<text>{{item.title}}</text>
					<like-icon :item='item'></like-icon>
				</view>
				<view class="list-card-des">
					<view class="list-card-tag">
						<view class="left">{{item.classify}}</view>
						<view class="right">{{item.browse_count}}浏览</view>
					</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
			};
		},
		props:{
			item:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		methods:{
			openDetail(){
				this.$emit('click',this.item)
			}
		}
	}
</script>

<style lang="scss">
	.list-card{
		display: flex;
		flex-direction: row;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		box-sizing: border-box;
		box-shadow:  0 0 5px 1px rgba($color: #000000, $alpha: 0.1);
		.list-card-img{
			flex-shrink: 0;
			width: 60px;
			height: 60px;
			border-radius: 5px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.list-card-content{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 10px;
			width: 100%;
			.list-card-title{
				position: relative;
				padding-right: 30px;
				font-size: 14px;
				color: #333;
				line-height: 1.2;
				font-weight: 400;
				text{
					display: -webkit-box;   
					-webkit-box-orient: vertical;   
					-webkit-line-clamp: 2;   
					overflow: hidden;  
				}
				
			}
			.list-card-des{
				display: flex;
				// margin-top: 10px;
				font-size: 12px;
				// flex: 1;
				.list-card-tag{
					display: flex;
					flex-direction: row;
					width: 100%;
					justify-content: space-between;
					.left{
						border: 1px solid $ml-base-color;
						border-radius: 10px;
						padding: 0 5px;
						color: $ml-base-color;
					}
					.right{
						color: #999;
						line-height: 1.5;
					}
				}
			}
		}
		&.mode-column{
			.list-card-content{
				width: 100%;
				padding-left: 0;
			}
			.list-card-img{
				display: flex;
				width: 100%;
				height: 70px;
				margin-top: 10px;
				.list-card-img-item{
					border-radius: 5px;
					width: 100%;
					margin-left: 10px;
					overflow: hidden;
					&:first-child{
						margin-left: 0;
					}
					image{
						width: 100%;
						hegith:100%
					}
				}
			}
			.list-card-des{
				margin-top: 10px;
			}
		}
			
		&.mode-image{
			flex-direction: column;
			.list-card-img{
				width: 100%;
				height: 100px;
			}
			.list-card-content{
				padding-left: 0;
				.list-card-title{
					margin-top: 10px;
				}
				.list-card-des{
					margin-top: 10px;
					display: flex;
					align-items: center;
				}
			}
			
		}
	}
</style>
