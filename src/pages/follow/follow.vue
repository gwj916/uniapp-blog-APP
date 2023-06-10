<template>
	<view class="follow-container">
		<view class="follow-tab">
			<view class="article" :class="{ active: currentindex === 0 }" @click="currentindex = 0">文章</view>
			<view class="author" :class="{ active: currentindex === 1 }" @click="currentindex = 1">作者</view>
		</view>
		<view class="follow-swiper">
			<swiper class="swiper" :current="currentindex" @change="currentindex = $event.detail.current">
				<swiper-item>
					<Listitem :articleList="followList" :isShowloadmore="false"></Listitem>
					<view class="nodata" v-if="followList.length === 0">
						暂无收藏文章
					</view>
				</swiper-item>
				<swiper-item>
					<AuthorList :authorList="authorList"></AuthorList>
					<view class="nodata" v-if="authorList.length === 0">
						暂无收藏作者
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script lang="ts" setup>
import store from '@/store';
import { onLoad } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';
import { get_FollowList, get_AuthorList } from '@/ajax/apis/Tabbar';
let currentindex = ref(0)
let followList: any = ref({})
let authorList: any = ref([])

//: 获取用户信息
const UserInfo = computed(() => {
	return store.state.UserInfo
})

onLoad(() => {
	getFollowList();
	getAuthorList();
	uni.$on('updatefollow', () => {
		getFollowList();
	})
	uni.$on('updateauthor', () => {
		getAuthorList();
	})
	if (!UserInfo.value) {
		uni.navigateTo({
			url: '/pages/login/login'
		})
	}
	return

})

//: 请求关注列表
const getFollowList = async () => {
	const list = await get_FollowList({ userid: UserInfo.value._id });
	followList.value = list;
}

//: 请求关注列表
const getAuthorList = async () => {
	const list = await get_AuthorList({ userid: UserInfo.value._id });
	authorList.value = list;
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
