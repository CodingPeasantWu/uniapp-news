<template>
	<swiper class="swiper" @change='changeSwiper' :current="swiperIndex">
		<swiper-item class="swiper-item"  @change='changeSwiper' v-for="(item,index) in tabList" :key='index'>
			<tab-list-item></tab-list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import tabListItem from './tab-list-item.vue'
	export default {
		data(){
			return {
				swiperIndex:0
			}
		},
		props:{
			tabList:{
				type:Array,
				default(){
					return []
				}
			},
			tabIndex:{
				type:Number,
				default:0
			}
		},
		components:{
			tabListItem
		},
		methods:{
			changeSwiper(e){
				// console.log(e.detail.current)
				this.swiperIndex = e.detail.current
				this.$emit('changeSwiper',this.swiperIndex)
			}
		},
		watch:{
			tabIndex(newVal){
				this.swiperIndex = newVal
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
