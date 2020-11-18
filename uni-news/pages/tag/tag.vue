<template>
	<view class="tag">
		<view class="tag-wrapper">
			<view class="my-tag">
				<view class="color">我的标签</view>
				<view class="edit" @click="editTag">{{showIcons ? '完成' : '编辑'}}</view>
			</view>
			<view class="tag-list" >
				<view class="tag-list-item" v-for="(item,index) in tagList" :key='item._id'>
					{{item.name}}
					<uni-icons v-if="showIcons"  type="clear" size='20' color="red" class="close-icon" @click="delTag(index)"></uni-icons>
				</view>
			</view>
			<view class="no-data" v-if="tagList.length ==0 && !loading">
				当前没有数据
			</view>
			<uni-load-more v-if="loading" iconType="snow" status="loading"></uni-load-more>
		</view>
		<view class="tag-wrapper">
			<view class="my-tag" >
				<view class="color">标签推荐</view>
			</view>
			<view class="tag-list" >
				<view class="tag-list-item" v-for="(item,index) in editList" :key='item._id' @click="addToTagList(index)">
					{{item.name}}
				</view>
			</view>
			<view class="no-data" v-if="editList.length ==0 && !loading">
				当前没有数据
			</view>
			<uni-load-more v-if="loading" iconType="snow" status="loading"></uni-load-more>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				showIcons:false,
				editContent:'编辑',
				all:'all',
				tagList:[],
				editList:[],
				loading:true
			}
		},
		onLoad() {
			this.get_label()
		},
		methods:{
			editTag(){
				// this.showIcons = !this.showIcons
				if(this.showIcons){
					this.showIcons = false
					this.updateLabel(this.tagList)
				}else{
					this.showIcons = true
				}
				// this.editContent = this.showIcons ? '完成' : '编辑'
				// if(this.editContent === '完成'){
				// 	uni.showToast({
				// 		title:'更新完成'
				// 	})
				// }
			},
			delTag(index){
				if(!this.showIcons )return
					this.editList.push(this.tagList[index])
					// this.editList = this.editList.concat(this.tagList.splice(index,1)) 
					this.tagList.splice(index,1)
			},
			addToTagList(index){
				if(!this.showIcons )return
					this.tagList.push(this.editList[index])
					// this.tagList = [ ...this.tagList,...this.editList.splice(index,1)]
					this.editList.splice(index,1)
			},
			get_label(){
				this.$api.get_label({
					type:'all'
				}).then(res=>{
					// console.log(res)
					const {data} = res
					// let length = data.length
					// this.editList= data.splice(length-1,1)
					// this.tagList = data
					this.tagList = data.filter(item=>item.current)
					// console.log(this.tagList);
					this.editList = data.filter(item=>!item.current)
					// console.log(this.editList);
					this.loading = false
				}).catch(err=>{
					this.loading = false
				})
			},
			updateLabel(label){
				let arr = []
				label.forEach((item)=>{
					arr.push(item._id)
				})
				// console.log(arr);
				this.$api.update_label({
					label:arr
				}).then(res=>{
					console.log(res);
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					uni.$emit('labelChange')
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.tag{
		width: 100%;
		// height: 100vh;
		.tag-wrapper{
			// display: flex;
			background-color: #FFFFFF;
			margin-bottom: 10px;
			.my-tag{
				font-size: 14px;
				display: flex;
				justify-content: space-between;
				padding: 10px;
				border-bottom: 1px solid #f5f5f5;
				.color{
					color: #666;
				}
				.edit{
					font-weight: bold;
					color: $uni-color-success;
				}
			}
			.tag-list{
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				padding: 10px;
				.tag-list-item{
					position: relative;
					border: 1px solid #666;
					border-radius: 5px;
					font-size: 14px;
					color: #666;
					margin-right: 10px;
					padding: 2px 5px;
					margin-bottom: 10px;
				}
				.close-icon{
					position: absolute;
					top: -10px;
					right: -10px;
				}
			}
			.no-data{
				display: flex;
				height: 100px;
				align-items: center;
				justify-content: center;
				color: #666;
				font-size: 14px;
			}
		}
	}
</style>
