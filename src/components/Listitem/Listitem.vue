<template>
	<view class="scroll-container">
		<scroll-view scroll-y="true" class="scroll-item" @scrolltolower="loadMore">
			<view>
				<ListCard @savehistory="emit('savehistory')" v-for="item in articleList" :key="item._id" :item="item"></ListCard>
			</view>
			<uni-load-more :status="loadData.loading || 'loading'"
				v-if="isShowloadmore &&(articleList.length === 0 || articleList.length > 7)"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script lang="ts" setup name="Listitem">
//: 数据接收
withDefaults(defineProps<{
	articleList?: any,
	loadData?: any,
	isShowloadmore?: boolean,
}>(), {
	articleList: [],
	loadData: {
		loading: "loading"
	},
	isShowloadmore: true,
})

//:数据传递
const emit = defineEmits<{
	(e: 'loadMore'): void,
	(e: 'savehistory'): void
}>()

//: 滚动到底事件
const loadMore = () => {
	emit('loadMore')
}
</script>

<style lang="scss" scoped>
.scroll-container {
	height: 100%;

	.scroll-item {
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
	}
}
</style>