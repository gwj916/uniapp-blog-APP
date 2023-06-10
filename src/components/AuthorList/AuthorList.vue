<template>
	<view class="author-list">
		<scroll-view scroll-y="true" class="swiper">
			<view class="scroll-item" v-for="item in authorList" :key="item.id">
				<view class="author-img">
					<image class="image" :src="item.avatar" mode="scaleToFill" />
				</view>
				<view class="author-right">
					<view class="author-right-top">{{ item.author_name }}</view>
					<view class="author-right-bottom">
						<view class="left">{{ item.professional }}</view>
						<view class="right">
							<view class="ft">发帖{{ item.follow_count}}</view>
							<view class="fs">粉丝{{ item.fans_count }}</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script lang="ts" setup>
const props = defineProps<{
	authorList:any
}>()
 
</script>

<style scoped lang="scss">
.author-list {
	height: 100%;

	.scroll-item {
		border-top: 1rpx solid #eeeeee;
		padding: 20rpx;
		overflow: hidden;
		display: flex;
		width: 100%;

		.author-img {
			width: 80rpx;
			height: 80rpx;
			border-radius: 20rpx;

			.image {
				height: 100%;
				width: 100%;
			}
		}

		.author-right {
			display: flex;
			flex-direction: column;
			width: 90%;
			padding: 0 30rpx;

			.author-right-top {
				font-size: 32rpx;
				font-weight: 600;
			}

			.author-right-bottom {
				@include flex();
				width: 100%;

				.left {
					font-size: 30rpx;
				}

				.right {
					display: flex;

					.ft {
						margin-right: 20rpx;
					}

					.fs {
						margin-right: 20rpx;

					}
				}
			}
		}
	}
}</style>