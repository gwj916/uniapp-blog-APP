<template>
	<view>
		<uni-popup ref="popup" :mask-click="false" type="bottom">
			<view class="popup-container">
				<view class="popup-head">
					<view class="esc" @click="closepopup">取消</view>
					<view class="payload" @click="sendComment">发布</view>
				</view>
				<view>
					<textarea class="popup-content" v-model.trim="Comment" placeholder="请输入评论内容" placeholder-class="textarea-placeholder" />
				</view>
				<view class="popup-footer">
					{{ Comment.length }} /200
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const popup = ref();
const Comment = ref<string>('');

//: 接收传入值
const props = defineProps<{
	showpopup: boolean
}>()

//: 传递事件
const emit = defineEmits<{
	(e:'closeComment',status:boolean):void,
	(e:'sendComment',val:string):void,
}>()

//: 取消弹窗
const closepopup =() =>{
   emit('closeComment',false)
   Comment.value = ''
}

//: 发布评论
const sendComment =() =>{
	if (!Comment.value) {
		uni.showToast({
			title:'请输入评论内容',
			icon:'none'
		})
		return
	}
   emit('sendComment',Comment.value);
   Comment.value = ''
}

//: 监视弹窗状态
watch(() => props.showpopup, (newval) => {
	newval ? popup.value.open() : popup.value.close()
})
</script>

<style scoped lang="scss">
.popup-container {
	background-color: #f8f4f4;
	height: 500rpx;
	.popup-head {
		@include flex();
		padding:20rpx 0;

		.esc {
			margin-left: 20rpx;
		}
		.payload{
			margin-right: 20rpx;

		}
	}
	.popup-content{
		border-top: 1px solid #666;
		width: 100%;
		padding: 30rpx;
	}
	.popup-footer{
		position: absolute;
		float: right;
		right: 0;
		bottom: 0;
		margin:0 20rpx 20rpx 0 ;
	}
}
</style>