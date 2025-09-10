<script setup>
import HomeImgCardTemp from './img_card.vue'
import { useImgStore } from '@/stores/imgStore'
import { getImgList } from '@/apis/ImgGetApi'

import { ref  ,onMounted} from 'vue'
const loading = ref(false)
const imgstore = useImgStore()

const data = ref({
  "num": 20,
  "proxy": "i.yuki.sh",
  "sizeList": ["small"],
  "r18Type":imgstore.R18_flag
})

const fetchImages = async() => {
  const response = await getImgList(data.value)
  console.log(response.errCode)
  if (Number(response.errCode) === 200) {
    console.log(response)
    imgstore.img_data.push(...response.data)
    loading.value = false
  }
  // 假设接口返回数据在 response.data.list
}


function loadMore() {
  if (loading.value) return
  loading.value = true
  console.log('加载更多')
  // 模拟请求接口加载更多图片
  fetchImages()
}

onMounted(() => {
  const container = document.querySelector('.scroll-container')
  container.addEventListener('scroll', () => {
    const scrollBottom = container.scrollHeight - container.scrollTop - container.clientHeight
    if (scrollBottom < 50 && !loading.value) {
      loadMore()
    }
  })
})
</script>

<template>
  <div class="new ">
    <div class="scroll-container">
      <HomeImgCardTemp :img_data="imgstore.img_data">
      <template #top>
        <h2><router-link to="/">首页</router-link></h2>
        <p>>></p>
        <h2><router-link to="/recommend">推荐</router-link></h2>
      </template>
      </HomeImgCardTemp >
      <div v-if="loading">加载中...</div>
    </div>

  </div>
</template>



<style scoped lang="scss">
.new {
  padding-top: 90px;
  .scroll-container {
  height: 100vh;
  overflow-y: auto;
}
}

</style>
