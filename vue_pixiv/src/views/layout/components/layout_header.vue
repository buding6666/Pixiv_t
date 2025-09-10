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
        <h1 class="logo">
          <router-link to="/"> 壁纸网站</router-link>
        </h1>

        <ul class="header-nav">
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/boutique">精品</router-link></li>
          <li><router-link to="/new">新作</router-link></li>
          <li><router-link to="/ranking">榜单</router-link></li>
        </ul>

        <div class="search">
           <el-input v-model="input" @keyup.enter="ImgSearch" clearable class="input" placeholder="搜索" />
           <el-button @click="ImgSearch"><i class="iconfont icon-sousuo"></i></el-button>
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
    background-color: $primary;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 9999; /* 层级较低，可能被覆盖 */
   .container {
      display: flex;
      align-items: center; /* 垂直居中 */
      height: 70px;
      .logo {
        padding-right: 50px;
      }
      .header-nav {
        display: flex;
        align-items: center;
        li{
          font-size: 16px;
          padding: 0 20px;
        }
      }


      .search{
        display: flex;
        align-items: center;
        position: absolute;
        right: 10%;
        .input{
          width: 320px;
        }
        i{
          font-size: 20px;
        }
      }
      .user
      {
        position: absolute;
        right: 48px;
        ul{
          display: flex;
          align-items: center;
          li{
            font-size: 16px;
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
