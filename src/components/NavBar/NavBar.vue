<template>
	<view>
		<view class="navbar">
			<view :style="{ height: staticHight + 'rpx' }"></view>

			<view :style="{ marginRight: marginright + 'rpx' }" style="display: flex;">
				<view @click="backArticle" class="back-icon" :style="{ top: staticHight + 'rpx' }" v-if="isSearch">
					<uni-icons type="back" size="30" style="height: 50rpx;"></uni-icons>
				</view>
				<uni-easyinput v-if="!isSearch" type="text" prefixIcon="search" placeholder="输入文章标题进行搜索"
					@focus="GotosearchGage"></uni-easyinput>
				<uni-easyinput v-else v-model.trim="searcVal" @change="changeInput" type="text" confirmType="search"
					prefixIcon="search" placeholder="输入文章标题进行搜索"></uni-easyinput>
			</view>
		</view>
		<view :style="{ height: staticHight + 90 + 'rpx' }"></view>
	</view>
</template>

<script lang="ts" setup name="NavBar">
import { ref, computed } from 'vue';
const staticHight = ref(20)
const marginright = ref(0)
const systemInfo = uni.getSystemInfoSync()

//: 接收父组件传值
const props = withDefaults(defineProps<{
	isSearch?: boolean,
	parenVal?: string
}>(), {
	isSearch: false
})

//: 向父组件传递事件
const emit = defineEmits<{
	(e: 'updateVal', val: string): void,
	(e: 'sendSearchdata'): void
}>()


//: 计算输入值
let searcVal = computed({
	get: () => { return props.parenVal },
	set: (val) => {
		emit('updateVal', val!);
		if (!val) {
			emit('sendSearchdata')
		}
	}
})

//:输入事件
const changeInput = () => {
	emit('sendSearchdata')
}


//: 高度计算
systemInfo.statusBarHeight && (staticHight.value = systemInfo.statusBarHeight * 2 as number);

//: 跳转搜索页面
const GotosearchGage = () => {
	if (props.isSearch) return;
	uni.navigateTo({
		url: '/pages/search/search'
	})
}

//: 返回文章页面
const backArticle = () => {
	//: H5 页面跳转规则
	// #ifdef H5
	uni.switchTab({ url: '../../pages/index/index' })
	// #endif
	//: 非H5页面跳转规则
	// #ifndef H5
	uni.navigateBack()
	// #endif
}

//! 小程序处理
// #ifdef MP-WEIXIN
const menubuttonInfo = uni.getMenuButtonBoundingClientRect()
staticHight.value = menubuttonInfo.top as number * 1.8;
marginright.value = menubuttonInfo.width as number * 2.5;
// #endif

</script>

<style lang="scss" scoped>
.navbar {
	background-color: $base-color;
	position: fixed;
	left: 0;
	top: 0;
	box-sizing: border-box;
	padding: 0rpx 10rpx 20rpx;
	width: 100%;
	z-index: 99;

	.back-icon {
		height: 60rpx;
		left: 0;
		@include flex(center)
	}
}
</style>
