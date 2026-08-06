<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'

const route = useRoute()
const appStore = useAppStore()
</script>

<template>
  <el-container class="layout">
    <el-header class="header" height="64px">
      <div class="brand">
        <el-icon :size="22"><MapLocation /></el-icon>
        <span>{{ appStore.appName }}</span>
      </div>
      <el-menu mode="horizontal" :ellipsis="false" router :default-active="route.path">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/about">关于</el-menu-item>
      </el-menu>
    </el-header>
    <el-main class="main">
      <RouterView />
    </el-main>
  </el-container>
</template>

<style scoped>
.layout {
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--el-border-color-light);
  background: #fff;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: var(--el-color-primary);
}

.header :deep(.el-menu) {
  border-bottom: none;
}

.main {
  background: #f5f7fa;
}
</style>
