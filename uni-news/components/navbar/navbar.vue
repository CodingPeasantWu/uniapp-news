<template>
	<view class="navbar">
		<view class="navbar-fixed"> 
		<!-- 状态栏 -->
			<view :style="{height: height + 'px'}"></view>
			<view class="nav-content" :style="{height:navbarHeight + 'px',width:windowWidth + 'px'}">
				<!-- 导航栏-->
				<view class="navbar-search">
					<view class="navbar-search-icon">
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<view class="navbar-search-text">uniappd、vue</view>
				</view>
			</view>
			
		</view>
		<!-- <view :style="{height: (height+navbarHeight) + 'px'}"></view> -->
		<view style="height: 60px"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height:20,
				navbarHeight:45,
				windowWidth:375
			};
		},
		// onReady() {
		// 	console.log(this.height+this.navbarHeight)
		// },
		created() {
			const info = uni.getSystemInfoSync()
			// 状态栏的高度
			this.height = info.statusBarHeight
			
			//  #ifndef H5 || APP-PLUS || MP-ALIPAY
			const menuButtonInfo =  uni.getMenuButtonBoundingClientRect()
			this.navbarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
			this.windowWidth = menuButtonInfo.left
			// #endif
			
			
			// console.log(menuButtonInfo)
		}
	}
</script>

<style lang="scss">
	.navbar{
		.navbar-fixed{
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			width: 100%;
			background-color: $ml-base-color;
			.nav-content{
				// height: 45px;
				display: flex;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
				padding: 0 15px;
				.navbar-search{
					width: 100%;
					height: 30px;
					border-radius: 30px;
					padding: 0 10px;
					display: flex;
					align-items: center;
					background-color: #fff;
					.navbar-search-icon{
						// width: 10px;
						// height: 10px;
						// border: 1px red solid;
						margin-right: 10px;
					}
					.navbar-search-text{
						font-size: 14px;
						color: #999;
						width: 100%;
					}
				}
			}
			
		}	
	}
</style>
