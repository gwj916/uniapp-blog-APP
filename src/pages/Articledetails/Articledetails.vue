<template>
	<view class="Article-container">
		<view class="title">
			<text>{{ articleData.title }}</text>
		</view>
		<view class="Article-head">
			<view class="Article-image">
				<image class="image" :src="articleData.author.avatar" mode="scaleToFill" />
			</view>
			<view class="Article-Nav">
				<view class="Article-Nav-title">{{ articleData.author.author_name }}</view>
				<view class="Article-Nav-text">
					<text>{{ articleData.create_time }}</text>
					<text>{{ articleData.browse_count }}浏览</text>
					<text> {{ articleData.thumbs_up_count }}赞</text>
				</view>
			</view>
			<button class="Article-btn" @click="followAuthor">
				{{ isauthor ? '取消关注' : '关注' }}
			</button>
		</view>
		<view class="Article-content">
			<view class="content">
				<uv-parse :content="newarticleData"></uv-parse>
			</view>
			<view class="comment">
				最新评论
			</view>
			<view v-for="item in CommentList" :key="item.comment_id">
				<CommentsList :commentData="item"></CommentsList>
			</view>
			<view v-if="!CommentList.length" class="nodata">
				暂无评论
			</view>
		</view>
		<view class="Article-footer">
			<uni-easyinput placeholder="请输入评论" @focus="openCommon" class="Article-footer-left" suffixIcon="compose"
				></uni-easyinput>
			<view class="Article-footer-right">
				<view>
					<Lovebtn size="25" :article="articleData._id"></Lovebtn>
				</view>
				<view>
					<uni-icons @click="updategiveLike" :type="isgivelik ? 'hand-up-filled' : 'hand-up'" size="25"
						color="#f25037"></uni-icons>
				</view>
			</view>
		</view>
		<Commonpopup :showpopup="showpopup" @closeComment="showpopup = $event" @sendComment="sendCommentData"></Commonpopup>
	</view>
</template>



<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { get_article_details, update_Comment, get_Comments } from '@/ajax/apis/Tabbar';
import { ref, computed } from 'vue';
import collectMinix from '@/common/collectMinix';
import store from '@/store';
import { update_followAuthor, update_giveLike } from '@/ajax/apis/Login';
const { checkedLogin } = collectMinix()
let articleData: any = ref();
let CommentList: any = ref({});
const showpopup = ref(false);



//: 通过传参获取数据
onLoad((...options: any) => {
	articleData.value = JSON.parse(options[0].params);	
	getArticleDetails();
	getComments();
})

//:获取评论
const getComments = async () => {
	const CommentsArr = await get_Comments({ article_id: articleData.value._id })
	CommentList.value = CommentsArr;
}

//: 获取文章数据
const getArticleDetails = async () => {
	const res = await get_article_details({ article_id: articleData.value._id });
	articleData.value = res;
}

//: 文章内容渲染
const newarticleData = computed(() => {
	try {
		return articleData.value.content

	} catch (error) {
		return null
	}
})

//: 获取用户id
const userid = computed(() => {
	return store.state.UserInfo
})

//: 打开弹窗事件
const openCommon = async () => {
	console.log('666');
	
	await checkedLogin();
	showpopup.value = true;
}

//: 发布评论
const sendCommentData = async (content: string) => {
	const { msg }: any = await update_Comment({
		userid: userid.value[0]._id,
		articleid: articleData.value._id,
		content
	})
	uni.showToast({
		title: msg
	})
	showpopup.value = false
}


//: 判断图标显示
let isauthor = computed(() => {
	try {
		return userid.value && userid.value.author_likes_ids.includes(articleData.value.author.id)
	} catch (error) {
		return false
	}
})

//: 判断图标显示
let isgivelik = computed(() => {
	try {
		return userid.value && userid.value.thumbs_up_article_ids.includes(articleData.value._id)
	} catch (error) {
		return false
	}
})

//: 关注事件
const followAuthor = async () => {
	await checkedLogin();
	const { msg }: any = await update_followAuthor({ authorid: articleData.value.author.id, userid: userid.value._id })
	uni.showToast({
		title: msg,
		icon: 'none'
	})
	let followids = [...userid.value.author_likes_ids]
	if (followids.includes(articleData.value.author.id)) {
		followids = followids.filter((item: any) => item !== articleData.value.author.id)
	} else {
		followids.push(articleData.value.author.id)
	}
	store.commit('updateUserInfo', { ...userid.value, author_likes_ids: followids })
	uni.$emit('updateauthor')
}

//: 点赞事件
const updategiveLike = async () => {
	const { msg }: any = await update_giveLike({ articleid: articleData.value._id, userid: userid.value._id })
	uni.showToast({
		title: msg,
		icon: 'none'
	})
	let temparr = [...userid.value.thumbs_up_article_ids]
	if (temparr.includes(articleData.value._id)) {
		temparr = temparr.filter((item: any) => item !== articleData.value._id)
		articleData.value.thumbs_up_count -= 1
	} else {
		articleData.value.thumbs_up_count += 1
		temparr.push(articleData.value._id)
	}
	store.commit('updateUserInfo', { ...userid.value, thumbs_up_article_ids: temparr });

}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
