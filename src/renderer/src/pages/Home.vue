<template>
  <div>
    <el-button type="primary" size="default" @click="goToRandom">随机数生成</el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToRandom = () => {
  // const randomNum = Math.floor(Math.random() * 100) + 1
  // alert(`您生成的随机数为：${randomNum}`)
  router.push('/randomNum')
}
</script>

<style lang="scss"></style>
