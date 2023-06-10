<template>
	<view class="self-container">
		<view class="self-container-data">
			<view v-if="userInfo" class="self-head">
				<view class="self-head-top">
					<image class="self-head-top-img" :src="userInfo.avatar" mode="scaleToFill" />
					<text class="self-head-top-title">{{ userInfo.author_name }}</text>
				</view>
				<view class="self-head-bottom">
					<view self-head-bottom-item>
						<view class="self-head-bottom-title">被关注</view>
						<view class="self-head-bottom-number">{{ userInfo.follow_count }}</view>
					</view>
					<view self-head-bottom-item>
						<view class="self-head-bottom-title">粉丝</view>
						<view class="self-head-bottom-number">{{ userInfo.fans_count }}</view>
					</view>
					<view self-head-bottom-item>
						<view class="self-head-bottom-title">积分</view>
						<view class="self-head-bottom-number">{{ userInfo.integral_count || 0 }}</view>
					</view>
				</view>
			</view>
			<view v-if="!userInfo" class="self-container-nodata" @click="gotoLogin">
				<view class="self-content">
					<view class="self-content-left">
						<image class="self-content-left-img" src="@/static/logo.png" mode="scaleToFill" />
						<text class="self-content-left-title">未登录 请点击登录</text>
					</view>
					<view class="self-content-right">
						<uni-icons type="forward" size="17"></uni-icons>
					</view>
				</view>
			</view>
			<view class="self-content" @click="goArticle">
				<view class="self-content-left">
					<uni-icons type="person-filled" size="19"></uni-icons>
					<text class="self-content-left-title">我的文章</text>
				</view>
				<view class="self-content-right">
					<uni-icons type="forward" size="17"></uni-icons>
				</view>
			</view>
			<view class="self-btn" v-if="userInfo">
				<button class="btn" @click="LoginOut">退出</button>
			</view>
		</view>

	</view>
</template>

<script lang="ts" setup>
import store from '@/store';
import { computed } from 'vue';

//: 获取用户id
const userInfo = computed(() => {
	return store.state.UserInfo
})

//: 跳转文章
const goArticle = () => {
	if (!userInfo.value) {
		uni.navigateTo({
			url: '/pages/login/login'
		})
	} else {
		uni.navigateTo({
			url: '/pages/MyArticle/MyArticle'
		})
	}

}

//: 跳转文章
const gotoLogin = () => {
	if (!userInfo.value) {
		uni.navigateTo({
			url: '/pages/login/login'
		})
	} 
}

//: 退出登录
const LoginOut = () =>{
   store.commit('updateUserInfo',null);
   uni.navigateTo({
	url:'/pages/index/index'
   })
}


</script>

<style scoped lang="scss">
@import './index.scss'
</style>
