<script setup>
  import LayoutHeader from './components/layout_header.vue'
  import LayoutFooter from './components/layout_footer.vue'
</script>


<template>
  <LayoutHeader />
  <router-view></router-view>
  <LayoutFooter />
</template>
<style scoped lang="scss">

</style>
