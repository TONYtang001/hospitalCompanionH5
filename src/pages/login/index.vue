<template>
    <h1>用户登录</h1>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-image
                fit="contain"
                src="background2.gif"
            />

            <van-field
                v-model="form.userName"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="form.passWord"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
            提交
            </van-button>
        </div>
    </van-form>

</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter()
// 获取当前Vue实例
const { proxy } = getCurrentInstance()

const form = reactive({
    userName: '',
    passWord: ''
})
// 表单提交
const onSubmit = async (values) => {
    // console.log('submit', values);
    // 这里好像是ES6的语法，asyne和await
    const { data } = await proxy.$api.login(form)
    console.log(data, 'loginForm');
    if (data.code === 10000) {
        localStorage.setItem('h5_token', data.data.token)
        localStorage.setItem('h5_userInfo', JSON.stringify(data.data.userInfo))
        router.push('/home')
    }
    
};
</script>

<style lang="less" scoped>
h1 {
    text-align: center;
}
</style>