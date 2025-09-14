<script setup>
import { ref } from 'vue'
import { getImgList } from '@/apis/ImgGetApi'
import { useRouter } from 'vue-router'
import { useImgStore } from '@/stores/imgStore'
import { useUserStore } from '@/stores/userStore'
const userstore = useUserStore()
const imgstore = useImgStore()
const router = useRouter()  // Vue Router 实例
const input = ref("")
const data = ref({
  "num": 20,
  "proxy": "i.yuki.sh",
  "sizeList": ["small"],
  "author": "",
})
// 当前激活的索引
const activeIndex = ref(1)

// 点击导航时设置激活项
function setActive(index) {
  activeIndex.value = index
}


const ImgSearch = async () => {
  if (input.value != "") {
    console.log(input.value)
    data.value.author = input.value
    const response = await getImgList(data.value)
    console.log(response.errCode)
    if (Number(response.errCode) === 200) {
      if (response.data.length != 0) {
        console.log(response)
        imgstore.search_result = response.data
        router.push({ path: 'search', query: { author: input.value } })
      }
      else {
        ElMessage({
          message: '没有找到相关图片',
          type: 'warning'
        })
      }
    }
    else {
      ElMessage({
        message: '没有找到相关图片',
        type: 'warning'
      })
    }
  }
}

const R18Set = () => {
  if (imgstore.R18_flag === 0) {
    imgstore.R18_flag = 1
  }
  else{
    imgstore.R18_flag = 0
  }
}

</script>

<template>
    <nav class="header">
      <div class="container">
        <div class="logo">
          <h1>
            <router-link to="/"> <img src="../../../assest/images/logo.png" alt=""></router-link>
          </h1>
        </div>

        <ul class="header-nav">

            <li><router-link to="/" :class="{ active: activeIndex === 1 }" @click="setActive(1)">首页</router-link></li>
             <li><router-link to="/ranking" :class="{ active: activeIndex === 2 }" @click="setActive(2)">榜单</router-link></li>
          <!-- <li><router-link to="/ranking">榜单</router-link></li> -->
        </ul>

        <div class="search">
           <el-input v-model="input" @keyup.enter="ImgSearch" clearable class="input" placeholder="搜索" />
           <!-- <span @click="ImgSearch" class="iconfont icon-sousuo"></span> -->
        </div>
        <template v-if="userstore.userInfo?.token">
          <div class="user">
            <el-popover
              class="box-item"
              title="用户信息"
              placement="top-start"
            >
              <template #default>
                <div>
                  <ul>
                    <li>
                      个人中心
                    </li>
                    <li @click="userstore.clearUserInfo">
                      退出登录
                    </li>
                  </ul>
                </div>
              </template>

              <template #reference>
                <span>sakura</span>
              </template>
            </el-popover>
          </div>
        </template>
        <template v-else>
          <div class="user">
            <ul>
              <li><router-link to="login">登录</router-link></li>
            </ul>
          </div>
        </template>

           <div class="R18">
            <div @click="R18Set">
              <i v-if="imgstore.R18_flag===0" class="iconfont icon-jin-off"></i>
              <i v-else class="iconfont icon-jin-on"></i>
            </div>
        </div>
      </div>

    </nav>
</template>

<style scoped lang="scss">
  .header {
    background-color: $primary !important;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 9999; /* 层级较低，可能被覆盖 */
   .container {
      background-color: $primary !important;

      display: flex;
      align-items: center; /* 垂直居中 */
      height: 70px;
      .logo {
        img{
          width: 180px;
        }
      }
      .header-nav {
        display: flex;
        align-items: center;
        li{
          font-size: 18px;
          padding: 0 15px;
          a{
            color: white !important;
          }
          a:hover{
            color: #104ec0 !important;
            border-bottom: 2px solid #104ec0;
          }
        }
        .active {
          color: #104ec0 !important;
          border-bottom: 2px solid #104ec0;
        }

      }


      .search{
        display: flex;
        align-items: center;
        position: absolute;
        right: 12%;
        .input{
          width: 320px;
        }
        span{
          font-size: 30px;
       }
      }
      .user
      {
        position: absolute;
        right: 62px;
        ul{
          display: flex;
          align-items: center;
          li{
            font-size: 18px;
            a{
              color: white !important;
            }
          }
        }
      }
      .R18{
        position: absolute;
        right: 0;
        i{
          font-size: 35px;
        }
        .icon-jin-off {
            color: red;
          }
          .icon-jin-on {
            color: green;
          }
      }
    }
  }

</style>
