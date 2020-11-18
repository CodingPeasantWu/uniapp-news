<template>
	<view class="comments-box">
		<view class="comments-header">
			<view class="comments-logo">
				<image :src="item.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comments-info">
				<view class="title" v-if="!item.is_reply">{{item.author.author_name}}</view>
				<view v-else class="title">{{item.author.author_name}} <text class="reply-text">回复</text>{{item.to}}</view>
				<view class="time">{{item.create_time | forTime}}</view>
			</view>
		</view>
		<view class="comments-content">
			<view>{{item.comment_content}}</view>
			<view class="comment-reply-box">
				<view class="comment-btn" @click="replyComment({item:item,is_reply:reply})">回复</view>
			</view>
			<view class="comment-reply-content" v-for="(item,index) in item.replys" :key='item.index'>
				<comment :item='item' :reply="true"  @reply='replyComment'></comment>
			</view>
		</view>
	</view>
</template>

<script>
	import comment from '@/components/comments/comments.vue'
	import {formatTime} from '../../utils/formatTime.js'
	export default {
		name:'comment',
		data() {
			return {
				time:'',
			};
		},
		props:{
			item:{
				type:Object,
				default(){
					return {}
				}
			},
			reply: {
				type: Boolean,
				default: false
			}
		},
		onLoad() {
			// this.item = item
			// this.time = formatTime(item.creat_time)
			// console.log(formatTime);
		},
		filters:{
			forTime(time){
				return formatTime(time)
			}
		},
		methods:{
			replyComment(comment){
				// console.log(comment);
				if (comment.is_reply) {
					comment.item.reply_id = comment.item.comment_id
					comment.item.comment_id = this.item.comment_id
				}
				this.$emit('reply',comment)
			}
		}
	}
</script>

<style lang="scss">
	.comments-box{
		margin: 15px 0;
		.comments-header{
			display: flex;
			.comments-logo{
				width: 40px;
				height: 40px;
				border-radius: 5px;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.comments-info{
				display: flex;
				flex: 1;
				flex-direction: column;
				justify-content: space-between;
				padding-left: 15px;
				font-size: 12px;
				color: #999;
				.title{
					// margin-bottom: 10px;
					font-size: 14px;
					color: #333;
					.reply-text {
						margin: 0 10px;
						font-weight: bold;
						color: #000;
					}
				}
			}
		}
		.comments-content{
			margin-top: 10px;
			color: #000;
			font-size: 14px;
			.comment-reply-box{
				margin-top: 15px;
				display: flex;
				.comment-btn{
					border-radius: 20px;
					padding: 2px 10px ;
					border: 1px solid #ccc;
					font-size: 12px;
					color: #999;
				}
			}
			.comment-reply-content{
				display: flex;
				margin: 15px 0;
				padding: 0 10px;
				border: 1px solid #eee;
			}
		}
	}
</style>
