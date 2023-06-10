

export default function () {
    const regex: RegExp = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    const UsersRules = {
        LoginName: {
            rules: [{ required: true, errorMessage: '账户名不能为空' }, {
                validateFunction: function (rule: Object, value: string, data: Object, callback: Function) {
                    if (value.length < 4) {
                        callback('用户名长度不正确')
                    }
                    return true
                }
            }]
        },
        password: {
            rules: [{ required: true, errorMessage: '密码不能为空' }, {
                validateFunction: function (rule: Object, value: string, data: Object, callback: Function) {
                    if (value.length < 4) {
                        callback('密码长度不正确')
                    }
                    return true
                }
            }]
        },
        phone: {
            rules: [{ required: true, errorMessage: '手机号不能为空' }, {
                validateFunction: function (rule: Object, value: string, data: Object, callback: Function) {
                    if (!regex.test(value)) {
                        callback('手机号长度不正确')
                    }
                    return true
                }
            }]
        },
        code: {
            rules: [{ required: true, errorMessage: '验证码不能为空' }, {
                validateFunction: function (rule: Object, value: string, data: Object, callback: Function) {  
                    if (value !== '1234') {
                        callback('验证码错误')
                    }
                    return true
                }
            }]
        }
    }

    return {
        UsersRules
    }
}