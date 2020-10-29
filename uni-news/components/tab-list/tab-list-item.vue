<template>
	<scroll-list class='scroll-list' @loadmore='loadMore'>
		<card-list   v-for='(item) in article' :key='index' :item='item' ></card-list>
		<uni-load-more v-if="article.length > 7 || article.length===0 " iconType="snow" :status="!load.loading ? 'loading' : load.loading  "></uni-load-more>
	</scroll-list>
</template>

<script>
	export default {
		props:{
			article:{
				type:Array,
				default(){
					return []
				}
			},
			load:{
				type:Object,
				default(){
					return {
						loading:'loading'
					}
				}
			}
		},
		data(){
			return {
				loading:{}
			}
		},
		methods:{
			loadMore(){
				this.$emit('loadmore')
			}
		},
		// watch:{
		// 	load(newVal){
		// 		console.log(newVal)
		// 	}
		// }
	}
</script>

<style>
	.scroll-list{
		height: 100%;
	}
</style>
