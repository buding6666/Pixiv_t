import { ref, computed } from 'vue'
import { defineStore } from 'pinia'



export const useImgStore = defineStore('counter', () => {
  const R18_flag = ref(0)
  const img_data = ref([])
  const search_result = ref([])
  return { img_data ,search_result,R18_flag}
})
