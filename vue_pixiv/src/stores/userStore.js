import { ref, computed } from 'vue'
import { defineStore ,createPinia } from 'pinia'


export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})
    const clearUserInfo = () => {
      userInfo.value = {}
    }
    const setUserInfo = (data) => {
      // Object.assign(userInfo, data)  // 合并赋值，不覆盖 reactive 对象
      userInfo.value = data
    }
    return {
      userInfo,
      clearUserInfo,
      setUserInfo,
    }
  },
  {
    persist: true // ✅ 这是 defineStore 的第三个参数，Pinia 才能识别
  }
)
