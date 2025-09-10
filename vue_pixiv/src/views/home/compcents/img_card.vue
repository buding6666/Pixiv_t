<script setup>
import { computed } from 'vue'  // ✅ 必须导入
import { defineProps ,ref,onMounted,nextTick} from 'vue'

import { LazyImg, Waterfall } from "vue-waterfall-plugin-next";
import "vue-waterfall-plugin-next/dist/style.css";

const props = defineProps({
  title: {
      type: String,
      default: ''
  },
  img_data: {
      type: Array,
      default: () => []
  }
})

const breakpoints = {
  1200: { rowPerView: 4, gutter: 20 }, // >=1200px 显示 4 列，间距 20px
  800: { rowPerView: 3, gutter: 16 },
  500: { rowPerView: 2, gutter: 12 },
  0: { rowPerView: 1, gutter: 8 }
};

const chunkedData = computed(() => {
  // console.log(props.img_data)
  const result = []
  let i = 0
  for (i; i < props.img_data.length; i += 4) {
    result.push(props.img_data.slice(i, i + 4))
  }
  return result
})
</script>

<template>
  <div class="classify">
    <div class="container">
      <div class="classify_nav">
        <slot name="top"></slot>
      </div>
        <!-- 图片渲染· -->
        <div class="img_show">
        <!-- <ul v-for="(ul_value, ul_index) in chunkedData":key="ul_index">
          <li v-for="(li_value, li_index) in ul_value":key="li_index">
            <el-card style="max-width: 480px">
              <div class="img-wrapper">
                <img :src="li_value.urlsList[0].url" alt="图片" />
              </div>
              <template #footer>
                <div>
                  <span>{{ li_value.title }}</span>
                </div>
                <div>
                  <span>{{li_value.author}}</span>
                </div>
              </template>
          </el-card>
          </li>
        </ul> -->
          <Waterfall :list="props.img_data" :breakpoints="breakpoints" :crossOrigin="false">
          <template #default="{ item  }">
            <el-card style="max-width: 480px">
                <div class="img-wrapper">
                  <router-link :to="`/particulars/${item.pid}/${item.uid}/${item.author}`">
                    <LazyImg :url="item.urlsList[0].url"  class="card_img"/>
                  </router-link>
                </div>
                <template #footer>
                  <div>
                    <span>{{ item.title }}</span>
                  </div>
                  <div>
                    <span>{{item.author}}</span>
                  </div>
                </template>
            </el-card>
          </template>
        </Waterfall>
        </div>
        <slot name="bottom"></slot>
    </div>

  </div>

</template>


<style scoped lang="scss">
  .classify{
    user-select: text !important;
    width: 100%;
    .classify_nav{
      display: flex;
      align-items: center;
    }
    .img-wrapper{
    overflow: hidden;
     /* 匹配 LazyImg 内部的 img */
    .card_img {
      display: block;
      width: 100%;
      height: auto;
      transition: transform 0.5s ease;
    }

    /* 鼠标悬停放大 */
    &:hover .card_img {
      transform: scale(1.4);
    }
  }
    // ul{
    //   display: flex;
    //   align-items: center;
    //   justify-content: space-between;
    //   padding-bottom: 6px;
    //   li{
    //     //超出内容隐藏，不显示滚动条。
    //     li:not(:last-child){
    //     padding-right: 6px;
    //   }
    //   }
    // }
  }
</style>
