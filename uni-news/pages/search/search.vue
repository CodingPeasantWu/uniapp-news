<template>
	<view class="wrapper">
		<navbar :isSearch='true' @input='changeInput' v-model='value'></navbar>
		<view class="content">
			<view class="history-box" v-if="is_histroy">
				<view class="history">
					<view class="red">搜索历史</view>
					<view class="green" @click="clear">清空</view>
				</view>
				
				<view class="list-box" v-if="historyListData.length">
					<view class="list-tag" @click="openHistory(item)" v-for="item in historyListData">{{item}}</view>
				</view>
				<view class="list" v-else>
					<text>没有搜索历史</text>
				</view>
			</view>
			<scroll-list class='scroll-list' v-else >
				<uni-load-more v-if="loading" status=loading iconType='snow'></uni-load-more>
				<view v-if="searchListData.length">
					<card-list   v-for='(item,index) in searchListData' :key='index' :item='item' @click='setHistory'></card-list>
				</view>
				<view v-if="searchListData.length ===0 && !loading" class="no-data">
					没有搜索到相关数据
				</view>
			</scroll-list>

		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				value:'',
				is_histroy:true,
				searchListData:[],
				loading:false
				// input_val:'',
			}
		},
		onLoad() {
			// this.getSearchList()
		},
		methods: {
			changeInput(value){
				// this.val = value
				if(!value){
					this.flag = false
					clearTimeout(this.timer)
					this.getSearchList(value)
					return
				}
				this.flag = false
				if(!this.flag){
					this.flag = true
					this.timer = setTimeout(()=>{
						this.flag = false
						this.getSearchList(value)
					},1000)
				}
			},
			// addHistory(){
			// 	this.$store.dispatch('setHistory',this.val)
			// },
			getSearchList(value){
				if(!this.value){
					this.searchListData = []
					this.is_histroy = true
					return
				}
				this.is_histroy = false
				this.loading = true
				this.$api.get_search({
					value
				}).then((res)=>{
					console.log(res)
					const { data } = res 
					this.searchListData = data
					this.loading = false
				}).catch(err=>{
					this.loading = false
				})
			},
			setHistory(){
				this.$store.dispatch('setHistory',this.value)
			},
			openHistory(val){
				this.value = val
				this.getSearchList(val)
			},
			clear(){
				this.$store.dispatch('clearHistory')
				uni.showToast({
					title:'清空完成'
				})
			},
		},
		computed:{
			...mapState(['historyListData'])
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
		.wrapper{
			display: flex;
			flex-direction: column;
			flex: 1;
			// border: 1px solid red;
			.content{
				display: flex;
				background-color: #fff;
				flex-direction: column;
				.history-box{
					.history{
						display: flex;
						flex-direction: row;
						padding: 10px 15px;
						font-size: 14px;
						justify-content: space-between;
						border-bottom: 1px solid #f5f5f5;
						.red{
							color: $ml-base-color;
						}
						.green{
							color: #30b33a;
							font-weight: bold;
						}
					}
					.list-box{
						display: flex;
						flex-wrap: wrap;
						padding: 15px;
						padding-top: 0;
						.list-tag{
							padding:  2px 10px;
							margin-top: 12px;
							margin-right: 12px;
							border-radius: 5px;
							border: 1px solid #666;
							font-size: 14px;
							color: #666;
						}
					}
					.list{
						display: flex;
						justify-content: center;
						align-items: center;
						min-height: 200px;
						font-size: 14px;
						color: #ccc;
					}
				}
				.scroll-list{
					.no-data{
						display: flex;
						justify-content: center;
						align-items: center;
						min-height: 200px;
						background-color: #f5f5f5;
						font-size: 14px;
					}
				}
			}
		}
	}
</style>
