<script setup>
import HomeImgCardTemp from './img_card.vue'
import { useImgStore } from '@/stores/imgStore'
import { getImgList } from '@/apis/ImgGetApi'
import { ref, onMounted } from 'vue'

const modele = ref(0)
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

const changeMode = (mode) => {
  modele.value = mode
}
</script>



<template>
  <div class = "ranking">
    <div class="container">
      <div class="ranking_classify">
        <ul>
          <li><el-button type="primary" @click="changeMode(0)">日榜</el-button></li>
          <li><el-button type="primary" @click="changeMode(1)">周榜</el-button></li>
          <li><el-button type="primary" @click="changeMode(2)">月榜</el-button></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="ranking_img_show">
    <div v-if="modele === 0" class="scroll-container">
      <HomeImgCardTemp :img_data="imgstore.img_data">
      <template #top>
        <h2><router-link to="/">首页</router-link></h2>
        <p>>></p>
        <h2><router-link to="/new">榜单</router-link></h2>
      </template>
      </HomeImgCardTemp >
      <div v-if="loading">加载中...</div>
    </div>
    <div v-if="modele === 1" class="scroll-container">
      <HomeImgCardTemp :img_data="imgstore.img_data">
      <template #top>
        <h2><router-link to="/">首页</router-link></h2>
        <p>>></p>
        <h2><router-link to="/new">榜单</router-link></h2>
      </template>
      </HomeImgCardTemp >
      <div v-if="loading">加载中...</div>
    </div>
      <div v-if="modele === 2" class="scroll-container">
      <HomeImgCardTemp :img_data="imgstore.img_data">
      <template #top>
        <h2><router-link to="/">首页</router-link></h2>
        <p>>></p>
        <h2><router-link to="/new">榜单</router-link></h2>
      </template>
      </HomeImgCardTemp >
      <div v-if="loading">加载中...</div>
    </div>
  </div>

</template>


<style scoped lang="scss">
.ranking{
  width: 100%;
  position: fixed;
  z-index: 8888;
  padding-top: 70px;
  .container{
    .ranking_classify{
      width: 100%;
      height: 70px;
      background-color: #fff;
    ul{
      display: flex;
      align-items: center;
      li{
        padding-right: 20px;
        font-size: 24px;
        line-height: 70px;
      }
    }
  }
  }
}
.ranking_img_show{
  padding-top: 140px;
  .scroll-container {
      height: 100vh;
      overflow-y: auto;
  }
  // .new {
  //   padding-top: 90px;
  //   .scroll-container {
  //     height: 100vh;
  //     overflow-y: auto;
  //   }
  // }
}
</style>
