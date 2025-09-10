<script setup>
import { ref , onMounted} from 'vue'

import { getImgList } from '@/apis/ImgGetApi'
import HomeImgCardTemp from './img_card.vue'
import { useRoute } from 'vue-router'
import { useImgStore } from '@/stores/imgStore'
const imgstore = useImgStore()
const route = useRoute()
const CorrelationImgList = ref([])
const img_data = ref([])
const Dowalond = ref({
  "num": 1,
  "proxy": "i.yuki.sh",
  "uid": 7967470,
  "pid": 87654321,
  "sizeList": ["original"],
  "r18Type":imgstore.R18_flag
})

const Correlation = ref({
  "num": 20,
  "author": "",
  "proxy": "i.yuki.sh",
  "sizeList": ["small"],
  "r18Type":imgstore.R18_flag
})

const ImgDowalond = async () => {
  const pid = route.params.pid
  const uid = route.params.uid
  Dowalond.value.pid = pid
  Dowalond.value.uid = uid
  const responsee = await getImgList(Dowalond)
  if (Number(responsee.errCode) === 200) {
    const url = responsee.data[0].urlsList[0].url
    const link = document.createElement('a')   // 创建一个 <a> 标签
    console.log(responsee.data[0])
    link.href = url                    // 设置 <a> 的 href 属性为文件地址
    link.download =  responsee.data[0].uid + "jpg"                     // 设置下载时的默认文件名
    document.body.appendChild(link)             // 将 <a> 添加到页面中（必须在 DOM 中才能触发点击）
    link.click()                                // 模拟点击 <a> 标签，触发下载
    document.body.removeChild(link)             // 下载触发后，从页面中移除 <a>
    URL.revokeObjectURL(blobUrl)                  // 释放内存
  }
}

const ImgCorrelation = async () => {
  const author = route.params.author
  Correlation.value.author = author
  const responsee = await getImgList(Correlation.value)
  if (Number(responsee.errCode) === 200) {
    console.log(responsee.data)
    if (responsee.data.length > 0) {
      console.log(responsee.data.length)
      CorrelationImgList.value = responsee.data
    }
  }
}
onMounted(() => {
  const pid = route.params.pid
  console.log(pid)
  const resultAll = imgstore.img_data?.filter(item => item.pid === Number(pid))|| []
  img_data.value = resultAll
  console.log(img_data.value)
  ImgCorrelation()
})

</script>

<template>
  <div class="particulars">
    <div class="container">
      <div class="dowalond">
        <div class="img_show">
          <img :src="img_data[0]?.urlsList[0].url" alt="">
        </div>
        <div class="img_message">
          <h2><span>{{ img_data[0]?.title}}</span></h2>
          <h3><span>作者: {{ img_data[0]?.author}}</span></h3>
          <h3><span>UID: {{ img_data[0]?.uid}}</span></h3>
          <h3><span>PID: {{ img_data[0]?.pid}}</span></h3>
          <div class="tag" v-for = "(item,index) in img_data[0]?.tagsList " :key="index">
            <span>{{ item.tagName }} </span>
          </div>
          <el-button  @click="ImgDowalond"  type="primary">下载</el-button>
        </div>
      </div>
      <div class="correlation">
        <HomeImgCardTemp :img_data="CorrelationImgList">
          <template #top>
            <h2>作者相关图片</h2>
          </template>
        </HomeImgCardTemp>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.particulars {
  padding-top: 90px;
  .container {
    .dowalond{
      display: flex;
      align-items: center;
      .img_show{
        display: flex;
        justify-content: center;   //水平居中
        align-items: center;       //垂直居中
        width: 50%;
        height: 480px;
        // margin-left: 50%;
        // margin-right: 50%;
      }
      .img_message{
        width: 50%;
      }
    }
  }
}
</style>
