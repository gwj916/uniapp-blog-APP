import store from '@/store/index';

import {computed} from 'vue';

const userInfo = computed(()=>{return store.state.UserInfo});

export default function () {
    const checkedLogin = () => {
        return new Promise<string>(resolve => {
            if (userInfo.value) {
                resolve(userInfo.value)
            } else {
                uni.navigateTo({
                    url: "/pages/login/login"
                })
            }
        })
    }
    return {
        checkedLogin
    }
}