<script setup>
import HomeImgCardTemp from './img_card.vue'
import {getImgList} from '@/apis/ImgGetApi'
import { useImgStore } from '@/stores/imgStore'
import { ref ,onMounted } from 'vue'


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
    imgstore.img_data = response.data
  }
  // 假设接口返回数据在 response.data.list
}
// 页面加载时调用
onMounted(() => {
  fetchImages()
})
</script>



<template>
  <HomeImgCardTemp :img_data="imgstore.img_data">
    <template #top>
      <h2>最新</h2>
    </template>
    <template #bottom>
      <div class="load">
        <el-button type="primary"><router-link to="/new">>>加载更多>></router-link></el-button>
      </div>
    </template>
  </HomeImgCardTemp >
  <HomeImgCardTemp :img_data="imgstore.img_data">
    <template #top>
      <h2>热门</h2>
    </template>
    <template #bottom>
      <div class="load">
        <el-button type="primary"><router-link to="/hot">>>加载更多>></router-link></el-button>
      </div>
    </template>
  </HomeImgCardTemp >
  <HomeImgCardTemp  :img_data="imgstore.img_data">
    <template #top>
      <h2>推荐</h2>
    </template>
    <template #bottom>
      <div class="load">
        <el-button type="primary"><router-link to="/recommend">>>加载更多>></router-link></el-button>
      </div>
    </template>

  </HomeImgCardTemp >
</template>

<style scoped lang="scss">
  .load{
    padding-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  // .classify{
  //   width: 100%;
  //   ul{
  //     display: flex;
  //     align-items: center;
  //     justify-content: space-between;
  //     padding-bottom: 6px;
  //     li :not(:last-child){
  //       padding-right: 6px;
  //     }
  //   }

  // }
</style>
