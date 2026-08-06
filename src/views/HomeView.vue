<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span>{{ appStore.appName }}</span>
        <el-tag type="success">Vue 3</el-tag>
      </div>
    </template>
    <el-empty :description="appStore.tagline">
      <el-button type="primary">开始探索</el-button>
    </el-empty>
  </el-card>
</template>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
