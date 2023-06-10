<template>
	<view class="search-container">
		<NavBar :isSearch="isShow" :parenVal="parenVal" @sendSearchdata="getSearchdata" @updateVal="parenVal = $event">
		</NavBar>
		<view v-if="isShowhistory" class="search-conent">
			<view class="search-history">
				<view class="search-history-head">
					<text class="history">搜索历史</text>
					<text class="clear" @click="clear">清空</text>
				</view>
				<view v-if="newhistoryList.length>0" class="search-history-container">
					<view  v-for="(item, index) in newhistoryList" :key="index" @click="openhistory(item)" class="search-list-content">
						{{ item }}
					</view>
				</view>
				<view v-else class="nodata">
					当前没有搜索历史
				</view>
			</view>
		</view>
		<view v-else class="search-list">
			<Listitem @savehistory="savehistory" v-if="searchList.length > 0" :isShowloadmore="false"
				:articleList="searchList"></Listitem>
			<view v-else class="nodata">
				没有搜索到相关数据
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { get_search_data } from '../../ajax/apis/Tabbar';
import { ref,computed } from 'vue';
var isShow = ref(true);
let searchList =ref([]);
var parenVal = ref<string>('');
let isShowhistory = ref(true);
import { useStore } from 'vuex'
const store = useStore();

const newhistoryList = computed(()=>{return store.state.historyList})

//: 增加搜索历史
const savehistory = () => {
	store.commit('sethistoryList', parenVal.value);
}

//:点击历史再次搜索
const openhistory = (val:string) =>{
	parenVal.value = val;
	getSearchdata()
}

//:清空历史记录
const clear = () => {
	store.commit('clearhistory')
}

//: 搜索数据
const getSearchdata = async () => {
	isShowhistory.value = false;
	if (!parenVal.value) {
		isShowhistory.value = true;
		searchList.value = [];
		return;
	}
	const { articleList }: any = await get_search_data({ searchVal: parenVal.value })
	searchList.value = articleList;
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
