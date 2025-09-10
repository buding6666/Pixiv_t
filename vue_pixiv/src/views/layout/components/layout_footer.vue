<script setup>

</script>



<template>
  <footer class="footer">

    <div class="container">
      <ul>
        <li><router-link to="/">xxxxxx</router-link></li>
        <li><router-link to="/">xxxxxx</router-link></li>
        <li><router-link to="/">xxxxxxxx</router-link></li>
        <li><router-link to="/">xxxxxxxx</router-link></li>
        <li><router-link to="/">xxxxxxxx</router-link></li>
      </ul>
    </div>
  </footer>

</template>


<style scoped lang="scss">
  .footer{
    width: 100%;
    // position: fixed;
    // bottom: 0;
    padding-bottom: 10px;
    .container{
      display: flex;              // 父容器设为flex
      justify-content: center;    //
      align-items: center;
      ul{
        display: flex;
        justify-content: center;
        //水平居中
        align-items: center;
        // padding: 20px 0;
        li{
          padding-left: 20px;
          padding-right: 20px;
        }
        li:not(:last-child) {
          border-right: 1px solid #ccc; // 除最后一个外都加边框
        }
      }
    }
  }
</style>

