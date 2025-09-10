<script setup>

import { useUserStore } from '@/stores/userStore'
import LoginApi  from '@/apis/Login'

import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const userstore = useUserStore()
const router = useRouter()
const formRef = ref(null)

const model =  ref(false)
const form = ref({
  "username": '',
  "password": '',
  "agree": true
})

// 2. 准备规则对象
const rules = {
  account: [
    { required: true, message: '用户名不能为空', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 14, message: '密码长度为6-14个字符', trigger: 'blur' },
  ],
  agree: [
    {
      validator: (rule, value, callback) => {
        console.log(value)
        // 自定义校验逻辑
        // 勾选就通过 不勾选就不通过
        if (value) {
          callback()
        } else {
          callback(new Error('请勾选协议'))
        }
      }
    }
  ]
}
const userlogin = () =>{
  formRef.value.validate(async (valid) => {
    // valid: 所有表单都通过校验  才为true
    console.log(valid)
    // 以valid做为判断条件 如果通过校验才执行登录逻辑
    if (valid) {
    const response =  await LoginApi.login({"username": form.value.username, "password": form.value.password})
      if (Number(response.code) == 200) {
        userstore.setUserInfo({ token: response.access_token })
        // 1. 提示用户
        ElMessage({
          type: 'success',
          message: '登录成功',
          duration: 5000  // 设置显示时间为5秒
        })
        // 2. 跳转首页
        router.replace({ path: '/' })
      }
    }
  })
}

const usersignup = async () => {
  formRef.value.validate(async (valid) => {
    // valid: 所有表单都通过校验  才为true
    console.log(valid)
    // 以valid做为判断条件 如果通过校验才执行登录逻辑
    if (valid) {
    const response =  await LoginApi.signup({"username": form.value.username, "password": form.value.password})
      if (Number(response.code) == 200) {
        ElMessage({
          type: 'success',
          message: '注册成功',
          duration: 3000  // 设置显示时间为5秒
        })
      }
      else
      {
        ElMessage({
          type: 'error',
          message: '用户名已存在',
          duration: 3000  // 设置显示时间为5秒
        })
      }
    }
  })


}
</script>


<template>
  <section class="login-section">
      <div class="wrapper">
        <nav>
          <span v-if="model" >注册账号</span>
          <span v-else="model">登录账号</span>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="60px" status-icon>
              <el-form-item prop="username" label="账户">
              <el-input v-model="form.username"/>
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input v-model="form.password" />
              </el-form-item>
              <el-form-item prop="agree" label-width="22px">
                <span v-if="model" @click="model = !model">登录账号</span>
                <span v-else="model" @click="model = !model">注册账号</span>
              </el-form-item>
              <el-form-item prop="agree" label-width="22px">
                <el-checkbox size="large" v-model="form.agree">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button v-if="model" size="large" class="subBtn" @click="usersignup">点击注册</el-button>
              <el-button v-else size="large" class="subBtn" @click="userlogin">点击登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>
</template>

<style socped lang="scss">
.login-section {
  position: absolute;
  top: 120px;
  right: 100px;
}
</style>
