<template>
	<view>
		<!--//: 普通卡片 -->
		<view class="defCard" v-if="item.mode === 'base'" @click="GotoDetails">
			<view class="defCard-left">
				<image :src="item.cover[0] ? item.cover[0] : '/static/img/logo.jpeg'" mode="scaleToFill" />
			</view>
			<view class="defCard-right">
				<view class="defCard-right-top">
					<view class="text">
						<text>{{ item.title }}</text>
					</view>
					<Lovebtn :article="item._id"></Lovebtn>
				</view>
				<view class="defCard-right-bottom">
					<view class="category">{{ item.classify }}</view>
					<text class="browse">{{ item.browse_count }}浏览</text>
				</view>
			</view>
		</view>

		<!--//: 多图卡片 -->
		<view class="MuchCard" v-if="item.mode === 'column'" @click="GotoDetails">
			<view class="MuchCard-top">
				<text>{{ item.title }}</text>
				<Lovebtn :article="item._id"></Lovebtn>
			</view>
			<view class="MuchCard-middle">
				<image v-for="(img, index) in item.cover.slice(0, 3)" :key="index" :src="img" mode="scaleToFill"
					class="image" />

			</view>
			<view class="bottom">
				<view class="category">{{ item.classify }}</view>
				<text class="browse">{{ item.browse_count }}浏览</text>
			</view>
		</view>

		<!--//: 大图卡片 -->
		<view class="BigCard" v-if="item.mode === 'image'" @click="GotoDetails">
			<view class="BigCard-top">
				<image :src="item.cover[0]" mode="scaleToFill" />
			</view>
			<view class="BigCard-middle">
				<text>{{ item.title }}</text>
				<Lovebtn :article="item._id"></Lovebtn>
			</view>
			<view class="bottom">
				<view class="category">{{ item.classify }}</view>
				<text class="browse">{{ item.browse_count }}浏览</text>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>

const emit = defineEmits<{
	(e: 'savehistory'): void
}>()

//: 数据接收
const props = defineProps<{
	item: any
}>()


//: 跳转详情页
const GotoDetails = () => {
	
	const { abstractText, _id, title, author, browse_count, create_time, thumbs_up_count } = props.item
	const params = { abstractText, _id, title, author, browse_count, create_time, thumbs_up_count }
	uni.navigateTo({
		url: `/pages/Articledetails/Articledetails?params=${JSON.stringify(params)}`
	})
	emit('savehistory')
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>