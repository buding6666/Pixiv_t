<script setup>
import HomeImgCardTemp from './img_card.vue'
import {getImgList} from '@/apis/ImgGetApi'
import { useImgStore } from '@/stores/imgStore'
import { ref ,onMounted } from 'vue'

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

// 页面加载时调用 + 绑定滚动事件
// onMounted(() => {
//   // 首次加载
//   fetchImages()

//   // 绑定滚动事件
//   const container = document.querySelector('.scroll-container')
//   if (container) {
//     container.addEventListener('scroll', () => {
//       const scrollBottom =
//         container.scrollHeight - container.scrollTop - container.clientHeight
//       if (scrollBottom < 50 && !loading.value) {
//         loadMore()
//       }
//     })
//   }
// })

onMounted(() => {
  fetchImages()

  window.addEventListener('scroll', () => {
    const scrollBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight
    if (scrollBottom < 50 && !loading.value) {
      loadMore()
    }
  })
})
</script>



<template>
  <div class="scroll-container">
    <HomeImgCardTemp  :img_data="imgstore.img_data">
      <template #top>
        <div class="load">
          <span class="iconfont icon-yinghua"></span>
          <h2>推荐</h2>
        </div>
      </template>
    </HomeImgCardTemp >
  </div>

</template>

<style scoped lang="scss">
  .load{
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2); // 只在下方显示阴影
    span{
      padding-left: 24px;
      padding-right: 24px;
      font-size: 32px;
    }
  }
  .scroll-container{
    overflow-x: hidden; // 防止横向滚动
  }
</style>
