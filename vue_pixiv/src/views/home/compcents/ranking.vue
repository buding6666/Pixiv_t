<script setup>
import HomeImgCardTemp from './img_card.vue'
import { useImgStore } from '@/stores/imgStore'
import { getImgList ,getRankingImgList} from '@/apis/ImgGetApi'
import { ref, onMounted,watch } from 'vue'

const date = ref(new Date()) // 默认当前日期
const modele = ref('daily')
const daily_count = ref(1)
const weekly_count = ref(1)
const monthly_count = ref(1)
const count = ref(1)


const loading = ref(false)
const imgstore = useImgStore()

const params = ref({
  "mode": "daily",
  "date":null,
  "content": "illust",
  "p":1,
  "format": "json",
})



const fetchImages = async () => {
  params.value.mode = modele.value
  params.value.p = count.value
  const response = await getRankingImgList(params.value)
  console.log(response.contents)
  const data_t = []
  for (let i = 0; i < response.contents.length; i++) {
    const item = response.contents[i];
    data_t.push({
      title: item.title,
      urlsList:[{ url: item.url.replace("https://i.pximg.net", "http://43.167.234.120:8020/pximg/"),}],
      pid: item.illust_id,
      uid: item.user_id,
      author: item.user_name,
      tagsList: item.tags,
    })

  }
  if (modele.value === `daily`) {
    imgstore.day_ranking.push(...data_t)
  }
  else if (modele.value === `weekly`) {
    imgstore.week_ranking.push(...data_t)
  }
  else if (modele.value === `monthly`) {
    imgstore.month_ranking.push(...data_t)
  }
}


function loadMore() {
  if (loading.value) return
  loading.value = true
  console.log('加载更多')
  // 模拟请求接口加载更多图片
  fetchImages()
}

onMounted(() => {
  fetchImages()
  window.addEventListener('scroll', () => {
    const scrollBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight
    if (scrollBottom < 50 && !loading.value) {
      loadMore()
    }
  })
})

const changeMode = (mode) => {
  modele.value = mode
  if (mode === `daily`) {
    daily_count.value += 1
    count.value = daily_count.value
  }
  else if (mode === `weekly`) {
    weekly_count.value += 1
    count.value = daily_count.value

  }
  else if (mode === `monthly`) {
    monthly_count.value += 1
    count.value = daily_count.value
  }
  fetchImages()
}



watch(date, (newVal) => {
  if (!newVal) return
  const d = new Date(newVal)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0') // 月份 +1
  const day = String(d.getDate()).padStart(2, '0')
  const formatted = `${y}${m}${day}`
  console.log('date 改变了:', formatted)

  params.value.date = formatted
  params.value.content = null
  daily_count.value = 1
  weekly_count.value = 1
  monthly_count.value = 1
  count.value = 1
  imgstore.week_ranking = []
  imgstore.month_ranking = []
  imgstore.day_ranking = []
  fetchImages()
})
</script>



<template>
  <div class = "ranking">
    <div class="container">
      <div class="ranking_classify">
        <ul>
          <li><el-button type="primary" @click="changeMode(`daily`)">日榜</el-button></li>
          <li><el-button type="primary" @click="changeMode(`weekly`)">周榜</el-button></li>
          <li><el-button type="primary" @click="changeMode(`monthly`)">月榜</el-button></li>
          <li>
            <div class="demo-date-picker">
              <el-date-picker
                v-model="date"
                type="date"
                placeholder="Pick a day"
                :size="size"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="ranking_img_show">
    <div v-if="modele === `daily`" class="scroll-container">
      <HomeImgCardTemp :img_data="imgstore.day_ranking">
      <template #top>
        <span class="iconfont icon-yinghua"></span>
        <h2><router-link to="/">首页</router-link></h2>
        <p>&nbsp;&nbsp; >> &nbsp;&nbsp;</p>
        <h2><router-link to="/new">榜单</router-link></h2>
      </template>
      </HomeImgCardTemp >
      <div class ="loading">加载中...</div>
    </div>
    <div v-if="modele === `weekly`" class="scroll-container">
      <HomeImgCardTemp :img_data="imgstore.week_ranking">
      <template #top>
        <h2><router-link to="/">首页 </router-link></h2>
        <p>&nbsp;&nbsp;>>&nbsp;&nbsp;</p>
        <h2><router-link to="/new"> 榜单</router-link></h2>
      </template>
      </HomeImgCardTemp >
      <div class ="loading">加载中...</div>

    </div>
      <div v-if="modele === `monthly`" class="scroll-container">
      <HomeImgCardTemp :img_data="imgstore.month_ranking">
      <template #top>
        <h2><router-link to="/">首页</router-link></h2>
        <p>>></p>
        <h2><router-link to="/new">榜单</router-link></h2>
      </template>
      </HomeImgCardTemp >
      <div class ="loading">加载中...</div>
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
       display: flex;
      justify-content: center;
      border-radius: 5px;
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
  padding-top: 160px;
  span{
    padding-left: 24px;
    padding-right: 24px;
    font-size: 32px;
  }
  .loading {
    width: 100%;
    text-align: center;
    padding-top: 25px;
    padding-bottom: 25px;
    font-size: 18px;
  }
  // .scroll-container {
  //     height: 100vh;
  //     overflow-y: auto;
  // }
  // .new {
  //   padding-top: 90px;
  //   .scroll-container {
  //     height: 100vh;
  //     overflow-y: auto;
  //   }
  // }
}
</style>
