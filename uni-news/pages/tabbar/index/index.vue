<template>
	<view class="content">
		<navbar ></navbar>
		<tab :labelList='labelList' :swiperIndex='swiperIndex' @tab='change'></tab>
		<view class="tab-list">
			<tab-list :labelList='labelList' :tabIndex='tabIndex'  @changeSwiper='changeSwiper'></tab-list>
		</view>
			
	</view>
</template>

<script>
	// import navbar from '@/components/navbar/navbar.vue'
	export default {
		// components:{
		// 	navbar
		// },
		data() {
			return {
				title: 'Hello',
				labelList:[],
				swiperIndex:0,
				tabIndex:0,
				isSearch:false
			}
		},
		onLoad() {
			uni.$on('labelChange',(res)=>{
				this.getLabel()
				this.labelList=[]
				this.swiperIndex=0
				this.tabIndex=0
			}),
			this.getLabel()
		},
		methods: {
			getLabel(){
				this.$api.get_label({
					// name:'get_label'
				}).then(res=>{
					const {data} = res
					data.unshift({
						name:'全部'
					})
					this.labelList = data
					// console.log(this.labelList)
				})
			},
			change(data){
				// console.log(data)
				this.tabIndex = data.index
			},
			changeSwiper(data){
				this.swiperIndex = data
			}
		}
	}
</script>

<style lang="scss">
	.page {
		height: 100%;
		display: flex;
	}
	.content {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: hidden;
		.tab-list{
			flex: 1;
			box-sizing: border-box;
			// border: 1px solid $ml-base-color;
		}
	}
</style>
