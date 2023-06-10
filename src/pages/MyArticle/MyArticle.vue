<template>
	<view>
		<ListCard v-for="item in Articlelist" :key="item._id" :item="item"></ListCard>
		<view class="nodata" v-if="Articlelist.length === 0">
			暂无发布的文章
		</view>
	</view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { get_MyArticle } from '@/ajax/apis/Tabbar';
let Articlelist: any = ref([])
import store from '@/store';

//: 获取用户id
const userInfo = computed(() => {
	return store.state.UserInfo
})

onLoad(() => {
	getMyArticle()
})

//: 获取发布的文章
const getMyArticle = async () => {
	const list = await get_MyArticle({ userid: userInfo.value._id });
	Articlelist.value = list;
}
</script>

<style scoped>
.nodata {
	height: 500rpx;
	line-height: 400rpx;
	width: 100%;
	text-align: center;
	font-size: 24rpx;
	color: #666;
}
</style>
