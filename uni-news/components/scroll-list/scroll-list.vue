<template>
	<view class="scroll">
		<scroll-view scroll-y scroll-with-animation='true' class="scroll-content" @scrolltolower='loadMore'>
			<view>
				<slot></slot>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			loadMore(){
				this.$emit('loadmore')
			}
		}
	}
</script>

<style lang="scss">
	.scroll{
		flex: 1;
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
		.scroll-content{
			display: flex;
			height: 100%;
			flex-direction: column;
		}
	}
</style>
