<template>
	<view class="tab">
		<scroll-view scroll-x="true" class="scroll" :scroll-with-animation="true" :scroll-into-view="currentIndex">
			<view class="scroll-item-box">
				<view class="scroll-item" @click="getIndex(index)" :class="{ active: activeindex === index }"
					v-for="(item, index) in labelList" :key="index">
					<view class="item" :id="`item${index}`">{{ item.name }} </view>
				</view>
			</view>
		</scroll-view>
		<view class="scroll-icon">
			<uni-icons type="gear" size="30"></uni-icons>
		</view>
	</view>
</template>

<script lang="ts" name="Tabbar" setup>
import { ref, watch } from 'vue';
//* 滚动索引
let currentIndex = ref('item0')

const emit = defineEmits<{
	(e: 'changeIndex', index: number): void
}>()

const props = defineProps<{
	labelList: any[],
	activeindex: number
}>()

//* 监听索引变化
watch(() => props.activeindex, (index) => {
	currentIndex.value = `item${index}`
})

//* 向父组件传参事件
const getIndex = (index: number) => {
	emit('changeIndex', index)
}
</script>

<style lang="scss" scoped>
.tab {
	@include flex();
	width: 100%;
	box-sizing: border-box;
	background-color: white;
	border-bottom: 1px solid gainsboro;

	.scroll {
		flex: 1;
		box-sizing: border-box;
		height: 90rpx;
		overflow: hidden;

		.scroll-item-box {
			@include flex(flex-start);
			box-sizing: border-box;
			height: 90rpx;

			.scroll-item {
				padding: 0 20rpx;
				flex-shrink: 1;
				color: #333333;
				font-size: 28rpx;

				&.active {
					color: $base-color;
				}

				.item {
					width: 120rpx;
					text-align: center;
				}
			}
		}
	}

	.scroll-icon {
		width: 90rpx;
		position: relative;
		@include flex(center);

		&:after {
			content: '';
			position: absolute;
			height: 32rpx;
			left: 0;
			width: 2rpx;
			background-color: #ddd;
		}
	}
}
</style>