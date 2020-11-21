<template>
	<view class="follow">
		<view class="wrapper">
			<view class="wrapper-box">
				<view class="item" @click="changeIndex(0)" :class="{active: index ===0 }">作者</view>
				<view class="item" @click="changeIndex(1)" :class="{active: index ===1 }">文航</view>
			</view>
		</view>
		<view class="follow-list">
			<swiper class="follow-swiper" @change="change" :current='index'>
				<swiper-item class="swiper-item">
					<scroll-list>						
						<card-list :item='item' types='follow' v-for="item in followData" :key='item._id' @handleHeartClick='refreshData'></card-list>
						<view class="nodata" v-if="showArticle">
							<text>暂无数据</text>
						</view>
						<uni-load-more iconType="snow" status="loading" v-if="followData.length === 0 && !showArticle"></uni-load-more>
					</scroll-list>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-list>
						<list-author v-for='item in followArticleData' :key='item.id' :item='item'></list-author>
						<view class="nodata" v-if="showAuthor">
							<text>暂无数据</text>
						</view>
						<uni-load-more iconType="snow" status="loading" v-if="followArticleData.length === 0 && !showAuthor"></uni-load-more>
					</scroll-list>
				</swiper-item>
			</swiper>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:0,
				followData:[],
				loading:'loading',
				showArticle:false,
				showAuthor:false,
				followArticleData:[],
			}
		},
		onLoad() {
			
			// 自定义事件只能在打开的页面触发
			uni.$on('update',()=>{
				this.getFollowData()
			})
			uni.$on('onForus',()=>{
				this.getFollowAuthorData()
			})
			this.getFollowData()
			this.getFollowAuthorData()
		},
		methods: {
			changeIndex(index){
				this.index = index
			},
			getFollowData(){
				this.$api.get_follow().then(res=>{
					// console.log(res)
					this.followData = res.data
					this.showArticle = this.followData.length === 0 ? true : false
					if(this.followData.length === 0){
						this.loading = 'noMore'
					}
				})
			},
			getFollowAuthorData(){
				this.$api.get_author().then(res=>{
					console.log(res);
					this.followArticleData = res.data
					this.showAuthor = this.followArticleData.length === 0 ? true : false
					if(this.followArticleData.length === 0){
						this.loading = 'noMore'
					}
				})
			},
			change(e){
				// console.log(e);
				this.index = e.detail.current
				// if(e.target.current == 0){
				// 	this.getFollowData()
				// }else if(e.target.current == 1){
				// 	this.getFollowAuthorData()
				// }
			}
			// refreshData(){
			// 	console.log(1);
			// 	this.getFollowData()
			// }
		}
	}
</script>

<style lang="scss">
	.page{
		height: 100%;
		display: flex;
	}
	uni-page-body{
		height: 100%;
	}
	.follow{
		display: flex;
		height: 100%;
		// 100vh
		// flex: 1;
		flex-direction: column;
		box-sizing: border-box;
		// border: 1px solid $ml-base-color;
		.wrapper{
			padding: 10px 20px;
			height: 30px;
			line-height: 30px;
			// flex: 1;
			border-bottom: 1px solid #f5f5f5;
			.wrapper-box{
				display: flex;
				flex-direction: row;
				width: 100%;
				height: 100%;
				border: 1px solid $ml-base-color;
				border-radius: 5px;
				.item{
					width: 50%;
					text-align: center;
					color: #666;
					font-size: 14px;
					&:first-child{
						border-right: 1px solid $ml-base-color;
					}
					&.active{
						color: $ml-base-color;
					}
				}				
			}
		}
		.follow-list{
			flex: 1;
			.follow-swiper{
				height: 100%;
				.swiper-item{
					height: 100%;
					.nodata{
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 50px;
						color: #999;
						font-size: 14px;
					}
				}
			}
		}	
	}
</style>
