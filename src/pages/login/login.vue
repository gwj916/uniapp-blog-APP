<template>
	<view class="login-container">
		<image class="login-img" src="../../static/img/login_bg.png" mode="scaleToFill" />
		<view class="Nav">
			<view class="Nav-item" :class="{ active: type === 'account' }" @click="ChangeType('account')">
				账号登录
			</view>
			<view class="Nav-item" :class="{ active: type !== 'account' }" @click="ChangeType('mobile')">
				手机登录
			</view>
		</view>
		<uni-forms ref="form"  :modelValue="formData" label-align="right" class="login-form"
			label-width="60px">
			<view v-if="type === 'account'">
				<uni-forms-item label="账号" name="LoginName" class="input">
					<uni-easyinput type="text" v-model="formData.LoginName" placeholder="请输入账号" />
				</uni-forms-item>
				<uni-forms-item label="密码" name="password" class="input">
					<uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码" />
				</uni-forms-item>
			</view>
			<view v-else>
				<uni-forms-item class="input" label="手机号" name="phone">
					<uni-easyinput type="text" v-model="formData.phone" placeholder="请输入手机号" />
				</uni-forms-item>
				<uni-forms-item class="codeinput" label="验证码" name="code">
					<uni-easyinput class="test" type="text" v-model="formData.code" placeholder="请输入验证码" />
					<SendCode class="code" @SendCode="onSendCode"></SendCode>
				</uni-forms-item>
			</view>
			<button class="login-btn" @click="Usersubmit">登录</button>
		</uni-forms>
		<view class="footer">
			<text>注册</text>
			<text>忘记密码</text>
		</view>
	</view>
</template>

<script lang="ts" setup name="login">
import { ref, reactive } from 'vue';
import rulesMixin from '../../common/rulesMixin';
import { get_User } from '../../ajax/apis/Login';
import { onReady } from '@dcloudio/uni-app';
const { UsersRules } = rulesMixin();
import { useStore } from 'vuex';
const store = useStore();


//* 表单验证
const form = ref();

//* 登陆类型
let type = ref('mobile');

//* 定义表单
let formData = reactive({
	LoginName: '',
	password: '',
	phone: '',
	code: ''
})
onReady(() => {
	form.value.setRules(UsersRules)
})
//* 传递表单信息
const onSendCode = (fn: Function) => {
	fn && fn(form)
}

//* 获取用户信息
const GetUserInfo = async (data: any) => {
	const UserInfo = await get_User(data);
	if (UserInfo) {
		store.commit('updateUserInfo', UserInfo)
		uni.showToast({
			title: '用户登录成功',
			icon: 'none'
		})
		setTimeout(() => {
			uni.navigateBack()
		}, 1500);
	}
}
//* 登陆类型切换
const ChangeType = (logintype: string) => {
	type.value = logintype;
	form.value.clearValidate([]);
}

//* 提交事件
const Usersubmit = async () => {
	await form.value.validate().then((res: any) => {
		GetUserInfo({
			...res,
			type: type.value
		})
	}).catch((err: any) => {
		console.log(err);
	})
}

</script>

<style scoped lang="scss">
@import './index.scss';
</style>
