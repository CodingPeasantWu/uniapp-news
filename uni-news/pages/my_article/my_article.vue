<template>
	<view class="wrapper">
		<card-list v-for="item in articleData" :key='item._id' :item="item"></card-list>
		<uni-load-more status="loading" iconType="snow" v-if="articleData.length ===0 && !showArticle"></uni-load-more>
		<view class="nodata" v-if="showArticle">暂无数据</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articleData:{},
				showArticle:false,
				loading:'loading'
			}
		},
		onLoad() {
			this.getMyArticleData()
		},
		methods: {
			getMyArticleData(){
				this.$api.get_my_article().then(res=>{
					// console.log(res);
					const {data} = res
					this.articleData = data
					this.showArticle = this.articleData === 0 ? true : false 
					if(this.articleData.length === 0){
						this.loading = 'noMore'
					}
					// console.log(this.articleData);
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.nodata{
		padding-top: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
