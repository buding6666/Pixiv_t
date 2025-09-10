<script setup>
import img1 from '@/assest/images/image1.png'
import { ref } from 'vue'
const carousel_url = ["image1.png", "image2.jpg", "image3.jpg"]

const carouselProps = ref({
  "height": "400px",
  // "initial-index": 1,
  // "trigger": "click",
  // "autoplay": true,
  // "interval": 5000,
  // "indicator-position": "outside",
  // "arrow": "always",
  // "type": "card",
  // "loop": true,
  // "direction": "horizontal",
  "pause-on-hover": true, // 也可以这样写
})

const getAssetURL = (image) => {
  // 参数一: 相对路径
  // 参数二: 当前路径的URL
  return new URL(`../../../assest/images/${image}`, import.meta.url).href
}
</script>


<template>
  <div class="home ">
    <div class="container">
      <div class="picture_show">
                <div class="picture_show_list">
          <ul>
            <!-- <li><el-image class="img" :src="img1" :fit="'contain'" /></li>
            <li><el-image class="img":src="img1" :fit="'scale-down'" /></li>
            <li><el-image class="img":src="img1" :fit="'scale-down'" /></li> -->
            <li><img src="../../../assest/images/image1.png" alt=""></li>
            <li><img src="../../../assest/images/image1.png" alt=""></li>
            <li><img src="../../../assest/images/image1.png" alt=""></li>
          </ul>
        </div>
        <!-- 轮播图 -->
        <div class="carousel">
          <el-carousel v-bind="carouselProps">
            <el-carousel-item v-for="(item , index) in carousel_url" :key="index">
              <!-- <h3 class="small justify-center" text="2xl">{{ item }}</h3> -->
                <img v-bind:src=getAssetURL(item) alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
  .home {
    padding-top: 90px;
    padding-bottom: 20px;
    .picture_show{
      display: flex;
      align-items: center;
      justify-content: center;
      .carousel{
        width: 800px;
        img{
          width: 800px;
          height: 400px;
        }
        padding-left: 12px;
      }
      .picture_show_list{
        height: 400px;
        padding-right: 12px;
        ul{
          li{
            img{
              width: 200px;
              height: 120px;
              // padding-top: 5px;
              // padding-bottom: 5px;
            }
          }
          li:not(:last-child) {
            padding-bottom: 10px;
          }
          li:not(:first-child) {
            padding-top: 10px;
          }
        }
    }
    }


}
</style>

