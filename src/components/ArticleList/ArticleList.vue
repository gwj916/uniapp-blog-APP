<template>
	<swiper :current="activeindex" @change="changeIndex" class="swiper-container">
		<swiper-item v-for="(item, index) in labelList" :key="item._id">
			<view class="swiper-item">
				<Listitem :articleList="articleData[index]" v-if="flag" @loadMore="loadMoredata"
					:loadData="loadData[index]"></Listitem>
			</view>
		</swiper-item>
	</swiper>
</template>

<script lang="ts" setup name="ArticleList">
import { get_article_list } from '@/ajax/apis/Tabbar';
import { reactive, ref, watch } from 'vue'
let articleData: any = reactive({})
let loadData: any = reactive({})
const flag = ref(false);
let pageSize = ref(6);

//* 数据接收
const props = defineProps<{
	labelList: any[];
	activeindex: number;
}>();

//* 数据传递
const emit = defineEmits<{
	(e: 'changeIndex', index: number): void;
}>();

//* 请求数据
const getList = async (currentindex: any) => {
	if (!loadData[currentindex]) {
		loadData[currentindex] = {
			page: 1,
			loading: 'loading',
			total: 0
		}
	}
	const { articleList, total }: any = await get_article_list({
		classify: props.labelList[currentindex].name,
		page: loadData[currentindex].page,
		pageSize: pageSize.value
	});
	flag.value = true;
	loadData[currentindex].total = total;
	let oldList = articleData[currentindex] || [];
	oldList.push(...articleList)
	articleData[currentindex] = oldList;
}

//* 监听请求数据变化
watch(() => props.labelList, (newval, oldval) => {
	if (JSON.stringify(newval) === JSON.stringify(oldval)) return
	getList(props.activeindex)
}, {
	immediate: true,
})

//* 接收子组件事件
const loadMoredata = () => {
	if (loadData[props.activeindex].total === articleData[props.activeindex].length) {
		loadData[props.activeindex] = {
			...loadData[props.activeindex],
			...{ loading: 'noMore' }
		}
		return
	}
	loadData[props.activeindex].page++
	getList(props.activeindex)
}

//* 向父组件传参事件
const changeIndex = (e: any) => {
	const index = e.detail.current;
	emit('changeIndex', index);
	if (!articleData[index] || !articleData[index].length) {
		[
			getList(index)
		]
	}
};
</script>

<style lang="scss" scoped>
.swiper-container {
	height: 90vh;

	.swiper-item {
		overflow: hidden;
		height: 100%;
	}
}
</style>
