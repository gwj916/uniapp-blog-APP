<template>
	<view class="SendCode-container">
		<button class="code-btn" @click="getfrom">{{ runtime ? `${time}秒重新获取` : '获取验证码' }}</button>
	</view>
</template>

<script lang="ts" name="SendCode" setup>
import { ref,onUnmounted } from 'vue';
let timer = ref();
let time = ref(60);
let runtime = ref(false)

//: 传递父级传递事件
const emit = defineEmits<{
	(e: 'sendCode', fn: Function): void
}>()

//: 模拟定时
const timeRun = () => {
	timer.value = setInterval(() => {
		if (time.value === 1) {
			clearInterval(timer.value);
			timer.value = null;
			runtime.value = false;
			time.value = 60;
			return
		}
		time.value--
	}, 1000)
}

//: 获取父级数据
const onSendCode = async (form: any) => {
	const { phone } = await form.value.validateField(['phone'])
	runtime.value = true;
	timeRun()
	uni.showToast({
			title: '验证码发送成功',
			icon: 'none'
		})
}

//: 点击事件
const getfrom = () => {
	if (runtime.value) return
	emit('sendCode', onSendCode)
}

onUnmounted(() => {
	clearInterval(timer.value);
	timer.value = null;
	runtime.value = false;
	time.value = 60;
})
</script>

<style scoped lang="scss">
.code-btn {
	width: 35%;
	font-size: 20rpx;
	background-color: $base-color;
}
</style>