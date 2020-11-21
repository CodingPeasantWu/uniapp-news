<template>
	<view class="wrapper">
		<view class="content">
			<view class="box">
				<view class="title">意见反馈:</view>
			</view>
			<view class="text-box">
				<textarea class="area" @input='input' v-model="value" maxlength="140"  placeholder="请输入你要反馈的问题" />
			</view>
			<view class="text-img">反馈图片:</view>		
			<view class="img-wrapper">
				<!-- 显示图片   -->
				<view class="img-box" v-for="(item,index) in img" :key='index'>
					<!-- <image :src="item" mode="aspectFill"></image> -->
					<image :src="item.url" mode="aspectFill"></image>
					<uni-icons class="img-icons" type="closeempty" size="14" color="#fff" @click="delImg(index)"></uni-icons>
				</view>
				<!-- 选择图片 -->
				<view class="img-box" @click="chooseImage" v-if="img.length < 5">
					<uni-icons type="plusempty" size="40" color="#F1F1F1"></uni-icons>
				</view>
			</view>
			<button class="btn" type="primary" @click="submit">提交反馈意见</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:'',
				img:[],
				imgList:[],
				imgShow:false,
			}
		},
		methods: {
			input(e){
				this.value = e.target.value
				// console.log(this.value);
			},
			chooseImage(){
				const maxlength = 5 - this.imgList.length
				// H5端count无效
				uni.chooseImage({
					count:maxlength,
					sizeType:['original','compressed'],
					sourceType: ['album','camera'],
					success: (res)=> {
						// console.log(res);
						let arr = res.tempFiles
						let data = res.tempFilePaths
						// tempFilePath可以作为img标签的src属性显示图片
						// this.img = res.tempFilePaths
						
						//H5端count限制图片张数无效,小程序不受影响
						// this.imgList = [...this.imgList,...res.tempFilePaths]
						// 处理H5多选的状况
						data.forEach((item,index)=>{
							if(index < maxlength){
								this.img.push({
									url:item,
									name:arr[index].name
								})
							}
						})
						
						
					}
				})
			},
			delImg(e){
				// console.log(e);
				let index = e
				this.img.splice(index,1)
			},
			async submit(){
				// 一次只能上传一张图片,不支持多图上传
				uni.showLoading()
				let loadImgList = []
				for(let i = 0;i<this.img.length;i++){
					let url = this.img[i].url
					let name = this.img[i].name
					let imgId = await this.uploadFile(url,name)
					loadImgList.push(imgId)
				}
				if(this.value == ''){
					uni.showToast({
						title:'请输入反馈内容',
						icon:'none'
					})
					return
				}
				this.$api.update_feedback({
					imgList:loadImgList,
					content:this.value
				}).then(res=>{
					console.log(res);
					uni.hideLoading()
					uni.showToast({
						title:'反馈提交成功',
						icon:'none'
					})
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/tabbar/my/my'
						})
					},2000)
				}).catch(err=>{
					uni.showToast({
						title:'反馈提交失败',
						icon:'none'
					})
					uni.hideLoading()
				})
			},
			async uploadFile(filepath,name) {
				const result = await uniCloud.uploadFile({
					filePath: filepath,
					cloudPath: name
				})
				return result.fileID
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		display: flex;
		flex-direction: column;
		padding: 0 15px;
		.box{
			padding:10px 0;
			font-size: 14px;
			color: #666;	
		}
		.text-box{
			padding: 10px;
			// width: 100%;
			display: flex;
			box-sizing: border-box;
			border: 1px solid #eee;
			.area{
				height: 100px;
				width: 100%;				
				font-size: 12px;
				color: #999999;
			}
		}
		.text-img{
			padding:10px 0;
			font-size: 14px;
			color: #666;	
			margin:  10px 0;
		}
		.img-wrapper{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			.img-box{
				position: relative;
				border: 1px solid #F0F0F0;
				height: 100px;
				width: 100px;
				margin-right: 10px;
				margin-bottom: 10px;
				border-radius: 5px;
				display: flex;
				align-items: center;
				justify-content: center;
				image{
					width: 100%;
					height: 100%;
				}
				.img-icons{
					position: absolute;
					right: -8px;
					top: -8px;
					background-color: $ml-base-color;
					width: 22px;
					height: 22px;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
		.btn{
			margin-top: 20px;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 5px;
			width: 100%;
			background-color: $ml-base-color;
		}
	}
</style>
