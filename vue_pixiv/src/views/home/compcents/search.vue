<script setup>
import { ref ,onMounted } from 'vue'
import { useImgStore } from '@/stores/imgStore'
import HomeImgCardTemp from './img_card.vue'
const imgstore = useImgStore()

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
  <div class="serach ">
    <div class="scroll-container">
      <HomeImgCardTemp :img_data="imgstore.search_result">
      </HomeImgCardTemp >
      <div v-if="loading">加载中...</div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.serach{
  .scroll-container{
    padding-top: 90px;
    height: 100%;
    overflow: auto;
  }
}
</style>

