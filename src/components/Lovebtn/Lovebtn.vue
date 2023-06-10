<template>
	<view @click.stop="GotoLogin">
		<uni-icons :type="save ? 'heart-filled' : 'heart'" :size="size" color="red"></uni-icons>
	</view>
</template>

<script lang="ts" setup>
import collectMinix from '../../common/collectMinix';
import { get_article_like } from '@/ajax/apis/Tabbar';
const { checkedLogin } = collectMinix();
import store from '@/store'
import { computed } from 'vue';

//: 接收参数
const props = withDefaults(defineProps<{
	article?: any,
	size?: string
}>(), {
	size: '20'
})

//: 计算图标样式
let save = computed(() => {	
	try {
		return store.state.UserInfo && store.state.UserInfo.article_likes_ids.includes(props.article);	
	} catch (error) {
		return false;
	}
	
})

//: 跳转登录
const GotoLogin = async () => {

	const user:any =  await checkedLogin();
	
	const { msg, newuserInfo }: any = await get_article_like({
		articleid: props.article,
		userid: user._id,
	});


	uni.showToast({
		title: msg,
		icon: 'none'
	})
	store.commit('updateUserInfo', { ...user, ...newuserInfo })
	uni.$emit('updatefollow')
}



</script>

<style></style>