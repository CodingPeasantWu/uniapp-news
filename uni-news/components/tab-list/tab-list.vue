<template>
	<swiper class="swiper" @change='changeSwiper' :current="swiperIndex">
		<swiper-item class="swiper-item"   v-for="(item,index) in labelList" :key='index'>
			<tab-list-item :article='articleNewData[index]' :load='load[index]' @loadmore='loadMore'></tab-list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import tabListItem from './tab-list-item.vue'
	export default {
		data(){
			return {
				swiperIndex:0,
				article:[],
				articleNewData:{},
				load:{},//控制加载的对象
				pageSize:10
			}
		},
		props:{
			labelList:{
				type:Array,
				default(){
					return []
				}
			},
			tabIndex:{
				type:Number,
				default:0
			},
		},
		components:{
			tabListItem
		},
		created() {
			// this.getArticle(this.swiperIndex)
			// console.log(this.tabList)
			uni.$on('update',(e)=>{
				// 加个标志位判断是否刷新
				// console.log(e);
				if(e === 'follow'){
					this.articleNewData = {}
					this.load = {}
					this.getArticle(this.tabIndex)
				}
			})
		},
		methods:{
			changeSwiper(e){
				// this.tabIndex = e.detail.current
				this.swiperIndex = e.detail.current
				this.$emit('changeSwiper',this.swiperIndex)
				// 当数据不存在或者长度是0的情况下才去请求数据
				if(!this.articleNewData[this.swiperIndex] || this.articleNewData[this.swiperIndex].length === 0) {
					this.getArticle(this.swiperIndex)
				}
			},
			getArticle(index){
				if(!this.load[index]){
					this.load[index] = {
						page:1,
						loading:'loading'
					}
				}
				this.$api.get_article({
					name:this.labelList[index].name,
					page:this.load[index].page,
					pageSize:this.pageSize
				}).then((res)=>{
					const { data } = res 
					if(data.length === 0){
						let oldLoad = {}
						oldLoad.loading = 'noMore'
						oldLoad.page = this.load[index].page
						this.$set(this.load,index,oldLoad)
						// 强制渲染
						this.$forceUpdate()
						return
					}
					// console.log(this.load)
					console.log('请求的数据',data)
					let oldVal = this.articleNewData[index] || []
					oldVal.push(...data)
					
					this.$set(this.articleNewData,index,oldVal)
				})
			},
			loadMore(){
				if(this.load[this.swiperIndex].loading === 'noMore') return
				this.load[this.swiperIndex].page++
				this.getArticle(this.swiperIndex)
			}
		},
		watch:{
			tabIndex(newVal){
				this.articleNewData = {},
				this.load = {}
				this.swiperIndex = newVal
			},
			labelList(newVal,oldVal){
				if(newVal.length === 0) return
				this.getArticle(this.swiperIndex)
			}
		}
	}
</script>

<style lang="scss">
	.swiper{
		height: 100%;
		.swiper-item{
			height: 100%;
			overflow: hidden;
			.scroll-list{
				height: 100%;
			}
		}
	}
</style>
