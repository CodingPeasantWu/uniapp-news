<template>
	<view>
		<view v-for="(item,index) in articleData" :key='item.index' class="wrapper">
			<comments :item='item'></comments>
		</view>
		<uni-load-more iconType='snow' v-if="articleData.length===0 || articleData.length>5"  :status='loading'></uni-load-more>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				articleData:[],
				id:'',
				page:1,
				pageSize:10,
				loading:'loading'
			}
		},
		onLoad(option) {
			// console.log(option);
			this.id = option.id
			this.getCommentData()
		},
		onReachBottom(){
			if(this.loading == 'noMore') return
			this.page++
			this.getCommentData()
		},
		methods: {
			getCommentData(){
				this.$api.get_comment({
					article_id:this.id,
					page:this.page,
					pageSize:this.pageSize
				}).then(res=>{
					const {
						data
					} = res
					if(data.length ===0){
						this.loading = 'noMore'
						return
					}
					let oldData = JSON.parse(JSON.stringify(this.articleData))
					oldData.push(...data)
					this.articleData = oldData
					// console.log(this.articleData);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper{
		padding:0 15px;
	}
</style>
