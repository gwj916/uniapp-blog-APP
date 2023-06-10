<template>
	<view class="Commentsslist-container">
		<view class="Commentsslist-head">
			<view>
				<image class="Commentsslist-image" :src="commentData.author.avatar" mode="scaleToFill" />
			</view>
			<view>
				<view class="title">{{ commentData.author.author_name }}</view>
				<view class="date"><uni-dateformat :date="commentData.create_time"></uni-dateformat></view>
			</view>
		</view>
		<view class="Commentsslist-content">
			{{ commentData.comment_content }}
		</view>
	</view>
</template>

<script lang="ts" setup>
const props = defineProps<{
	commentData:any
}>()

</script>

<style scoped lang="scss">
.Commentsslist-container {
	padding: 20rpx 0;

	.Commentsslist-head {
		border-top: 1px solid #666;
		padding: 20rpx;

		@include flex(flex-start);

		.Commentsslist-image {
			width: 80rpx;
			height: 80rpx;
			margin: 0 40rpx 0 10rpx;
		}

		.title {
			font-size: 30rpx;
		}

		.date {
			font-size: 28rpx;
		}
	}

	.Commentsslist-content {
		padding:0 30rpx 10rpx 30rpx;
		margin-bottom: 30rpx;
	}
}
</style>