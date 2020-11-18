<template>
	<view class="icons" @click.stop="handLike">
		<uni-icons :type=" like ? 'heart-filled' : 'heart' " size="20" color="#f07373"></uni-icons>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				like:false
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
		created() {
			this.like = this.item.is_like
		},
		watch:{
			item(newVal){
				this.like  = this.item.is_like
			}
		},
		methods:{
			handLike(){
				this.like = !this.like
				this.setUpdateLike()
				// console.log(this.item._id)
			},
			setUpdateLike(){
				uni.showLoading()
				this.$api.update_like({
					user_id:'c54bd3a25f9161000188138f015bf328',
					article_id:this.item._id
				}).then((res) =>{
					console.log(res)
					uni.hideLoading()
					uni.showToast({
						title:this.like ? '收藏成功' : '取消收藏',
						icon:'none'
					})
				}).catch(err=>{
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>
	.icons {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		width: 20px;
		height: 20px;
		top: 0;
		right: 0;
	}
</style>
