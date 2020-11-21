<template>
	<view class="detail">
		<view class="detail-title">
		{{articleData.title}}
		</view>
		<view class="detail-header">
			<view class="detail-logo">
				<image :src="articleData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-box">
				<view class="detail-acthor">
					{{articleData.author.author_name}}
				</view>
				<view class="detail-des">
					<text class="time">{{articleData.create_time}}</text>
					<text class="look">{{articleData.browse_count}} 浏览</text>
					<text class="good">{{articleData.thumbs_up_count}} 赞</text>
				</view>
			</view>	
			<button type="default" class="detail-btn" @click="focus">
				{{articleData.is_author_like?'取消关注':'关注'}}
			</button>
		</view>
		

		<view class="article">
			<view class="art-detail">
				<u-parse :content="articleData.content" :noData="noData" />
			</view>
			<view class="article-comment">
				<view class="comment-title">最新评论</view>
				<view class="content" v-for="item in commentList" :key='item.comment_id'>
					<comments :item='item' @reply='reply' ></comments>
				</view>
			</view>
		</view>
		<view class="detail-bottom-cotent">
			<view class="detail-bottom-box" @click="open">
				<text >谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#F07373"></uni-icons>
			</view>
			<view class="detail-bottom-icons">
				<view class="detail-bottom-icons-box" @click="toComment">
					<uni-icons type="chat" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="detail-bottom-icons-box" @click="updateLike">
					<uni-icons :type="articleData.is_like ? 'heart-filled' : 'heart'" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="detail-bottom-icons-box" @click="updateThumbsUp">
					<uni-icons :type="articleData.is_thumbs_up? 'hand-thumbsup-filled' : 'hand-thumbsup'" size="22" color="#F07373"></uni-icons>			
					</view>
				
			</view>
		</view>

		<uni-popup ref="popup" type="bottom" animation :maskClick="false">
			<view class="popup-wrapper">
				<view class="pop-title">
					<view class="pop-item" @click="close">取消</view>
					<view class="pop-item" @click="submit">发布</view>
				</view>
				<view class="pop-content">
					<textarea class="pop-textarea" v-model="word" fixed  maxlength="200" placeholder="请输入评论内容" />
					<view class="pop-count">{{word.length}}/200</view>
				</view>
			</view>
			
		</uni-popup>

	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				articleData:{},
				noData:'<p style="text-align:center;color:#666">详情加载中...</p>',
				word:'',
				commentList:[],
				replyComment:{}
			};
		},
		components: {
		  uParse,
			uniPopup
		},
		onLoad(options) {
			// console.log(options)
			this.articleData = JSON.parse(options.params)
			// console.log(this.articleData);
			this.getDetail()
			this.getComments()
		},
		onReady() {
			// this.getDetail()
		},
		methods:{
			getDetail(){
				this.$api.get_detail({
					article_Id:this.articleData._id
				}).then(res=>{
					// console.log(res)
					this.articleData = res.data
					console.log(this.articleData);
				})
			},
			open(){
				this.$refs.popup.open()
			},
			close(){
				this.$refs.popup.close()
			},
			submit(){
				if(!this.word){
					uni.showToast({
						title:'请输入评论内容'
					})
					return
				}
				this.setUpdataComment({content:this.word,...this.replyComment})
				// 回复的内容，回复文章的id，回复谁的id
				this.word = ''
			},
			setUpdataComment(content){
				const commentObj = {
					article_id:this.articleData._id,
					...content
				}
				uni.showLoading()
				this.$api.update_comment(commentObj).then(res=>{
					// console.log(res);
					uni.hideLoading()
					this.getComments()
					this.replyComment = {}
					uni.showToast({
						title:'评论成功'
					})
					this.close()
				})
				// .catch(err=>{
				// 	uni.hideLoading()
				// })
			},
			getComments(){
				this.$api.get_comment({
					article_id:this.articleData._id
				}).then(res=>{
					// console.log(res);
					this.commentList = res.data
				})
			},
			reply(e){
				console.log(e);
				this.replyComment = {
					comment_id:e.item.comment_id,
					is_reply: e.is_reply
				}
				if(e.item.reply_id){
					this.replyComment.reply_id = e.item.reply_id
					
				}
				// console.log(this.replyComment);
				this.open()
				
			},
			focus(){
				this.articleData.is_author_like = !this.articleData.is_author_like
				this.setUpdateForus()
			},
			setUpdateForus(){
				uni.showLoading()
				this.$api.update_author({
					author_id:this.articleData.author.id
				}).then((res) =>{
					console.log(res)
					
					uni.hideLoading()
					uni.showToast({
						title:this.articleData.is_author_like ? '关注成功' : '取消关注',
						icon:'none'
					})
					uni.$emit('onForus')
				}).catch(err=>{
					uni.hideLoading()
				})
			},
			updateLike(){
				this.articleData.is_like = !this.articleData.is_like
				this.setUpdateLike()
			},
			setUpdateLike(){
				uni.showLoading()
				this.$api.update_like({
					article_id:this.articleData._id
				}).then(res=>{
					// console.log(res);
					uni.hideLoading()
					uni.showToast({
						title:this.articleData.is_like ? '收藏成功' : '取消收藏',
						icon:'none'
					})
					uni.$emit('update','follow')
				}).catch(err=>{
					uni.hideLoading()
				})
			},
			updateThumbsUp(){
				if(this.articleData.is_thumbs_up){
					uni.showToast({
						title:'您已经点过赞了',
						icon:'none'
					})
					return
				} 
				this.articleData.is_thumbs_up = true
				this.setThumbsUp()
			},
			setThumbsUp(){
				uni.showLoading()
				this.$api.update_thumbsup({
					article_id:this.articleData._id
				}).then(res=>{
					// console.log(res);
					this.articleData.thumbs_up_count++
					uni.hideLoading()
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				}).catch(err=>{
					uni.hideLoading()
				})
			},
			toComment(){
				let id = this.articleData._id
				uni.navigateTo({
					url:'/pages/detail-comments/detail-comments?id=' + id
				})
			},
		}
	}
</script>

<style lang="scss">
	.detail{
		width: 100%;
		// height: 100vh;
		padding: 15px 0;
		padding-bottom: 54px;
		background-color: #FFFFFF;
		.detail-title{
			font-size: 18px;
			font-weight: bold;
			color: #000;
			padding:  0 15px;
		}
		.detail-header{
			display: flex;
			padding: 10px 15px;
			align-items: center;
			.detail-logo{
				width: 40px;
				height: 40px;
				border-radius: 50%;
				flex-shrink: 0;
				overflow: hidden;
				display: flex;
				margin-right: 10px;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.detail-box{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				flex: 1;
				.detail-acthor{
					font-size: 16px;
					color: #333333;
					// margin-bottom: 5px;
				}
				.detail-des{
					font-size: 14px;
					color: #999;
					.time,.look{
						margin-right: 5px;
					}
				}
			}
			.detail-btn{
				height: 30px;
				background-color: $ml-base-color;
				color: #fff;
				font-size: 12px;
			}
		}
		
		
		
		.article{
			min-height: 500px;
			margin-top: 20px;
			font-size: 14px;
			.art-detail{
				padding: 0 15px;
			}
			.article-comment{
				margin-top: 30px;
				.comment-title{
					padding: 10px 15px;
					border-bottom: 1px solid #f5f5f5;
					font-size: 14px;
					color: #666;
				}
				.content{
					padding: 0 15px;
					border-bottom: 1px solid #f5f5f5;
				}
			}
		}
		.detail-bottom-cotent{
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			align-items: center;
			width: 100%;
			height: 44px;
			border-top: 1px solid #f5f5f5;
			background-color: #fff;
			box-sizing: border-box;
			.detail-bottom-box{
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				margin-left: 10px;
				padding: 0 10px;
				border-radius: 5px;
				height: 30px;
				border: 1px solid #ddd;
				text{
					font-size: 14px;
					color: #999;
				}
			}
		}
		.detail-bottom-icons{
			display: flex;
			padding: 0 10px;
			flex-shrink: 0;
			.detail-bottom-icons-box{
				// position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 44px;
			}
		}
		.popup-wrapper{
			display: flex;
			background-color: #FFFFFF;
			flex-direction: column;
			.pop-title{
				display: flex;
				justify-content: space-between;
				padding: 0 15px;
				height: 50px;
				line-height: 50px;
				border-bottom: 1px solid #F5F5F5;
				.pop-item{
					font-size: 14px;
					color: #666;
				}
			}
			.pop-content{
				width: 100%;
				padding: 15px;
				box-sizing: border-box;
				.pop-textarea{
					width: 100%;
					min-height: 200px;
				}
				.pop-count{
					display: flex;
					justify-content: flex-end;
					font-size: 12px;
					color: #999;
				}
			}
		}
	}
</style>
