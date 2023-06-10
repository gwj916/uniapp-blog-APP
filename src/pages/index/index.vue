<template>
	<view class="container">
		<NavBar></NavBar>
		<Tabbar :labelList="labellist" v-if="flag" :activeindex="activeindex" @changeIndex ="getIndex"></Tabbar>
		<ArticleList :labelList="labellist" class="ArticleList" v-if="flag" :activeindex="activeindex" @changeIndex ="getIndex"></ArticleList>
	</view>
</template>

<script setup lang="ts">

import { onLoad } from "@dcloudio/uni-app";
import { reactive, ref } from 'vue';
import { get_list } from "@/ajax/apis/Tabbar";  

//* 响应式列表数据
let labellist = ref<string[]>([]);

//* 响应式标记
let flag = ref<boolean>(false);

//* 动态索引
let activeindex = ref<number>(0);

//* 页面加载钩子
onLoad(() => {
	getList()
})

//* 异步获取列表数据
const getList = async () => {
	const res = await get_list() as string[];
	flag.value = true;
	labellist.value = <any>[{name:"全部"},...res];
} 

//* 获取子组件值事件
const getIndex = (index:number) =>{
	activeindex.value = index;
}
</script> 

<style scoped lang="scss">
page {
	height: 100%;
	display: flex;
}
.container{
	flex: 1;
	overflow: hidden;
	box-sizing: border-box;
	@include flex(flex-start,column);
	align-items: inherit;
	.ArticleList{ 
		flex:1;
		box-sizing: border-box;
		height: 100%;
	}
}
</style>