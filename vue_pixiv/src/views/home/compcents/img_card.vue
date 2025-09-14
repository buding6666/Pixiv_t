<script setup>
import { computed } from 'vue' // ✅ 必须导入
import { defineProps, ref, onMounted, nextTick } from 'vue'

import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  img_data: {
    type: Array,
    default: () => [],
  },
})

const breakpoints = {
  1200: { rowPerView: 4, gutter: 20 }, // >=1200px 显示 4 列，间距 20px
  800: { rowPerView: 3, gutter: 16 },
  500: { rowPerView: 2, gutter: 12 },
  0: { rowPerView: 1, gutter: 8 },
}

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
        <Waterfall :list="props.img_data" :breakpoints="breakpoints" :crossOrigin="false">
          <template #default="{ item }">
            <el-card style="max-width: 480px">
              <div class="img-wrapper">
                <router-link :to="`/particulars/${item.pid}/${item.uid}/${item.author}`">
                  <LazyImg :url="item.urlsList[0].url" class="card_img" />
                </router-link>
              </div>
              <template #footer class="info">
                <div>
                  <span>{{ item.title }}</span>
                </div>
                <div>
                  <span>{{ item.author }}</span>
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
.img_show {
  padding-top: 20px;
}
.classify {
  user-select: text !important;
  width: 100%;
  .classify_nav {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .img-wrapper {
    overflow: hidden;
    /* 匹配 LazyImg 内部的 img */
    .card_img {
      display: block;
      width: 100%;
      height: auto;
      transition: transform 0.5s ease;
    }

    /* 鼠标悬停放大 */
    a:hover {
      color: #0d4cc0 !important;
      border-bottom: 1px solid #0d4cc0;
    }
  }
}
</style>
