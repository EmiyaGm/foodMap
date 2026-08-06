<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

import { useAppStore } from '@/stores/app'
import { useMapStore } from '@/stores/map'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const mapStore = useMapStore()

async function goHome() {
  mapStore.resetTrail()
  await router.push({ name: 'home' })
}
</script>

<template>
  <div class="shell">
    <header class="shell__bar">
      <button type="button" class="shell__brand" @click="goHome">
        <span class="shell__mark" aria-hidden="true" />
        <span>{{ appStore.appName }}</span>
      </button>
      <nav class="shell__nav">
        <RouterLink
          class="shell__link"
          :class="{ 'is-active': route.name === 'home' || route.name === 'region' }"
          to="/"
          @click="mapStore.resetTrail()"
        >
          地图
        </RouterLink>
        <RouterLink class="shell__link" to="/about">关于</RouterLink>
      </nav>
    </header>
    <main class="shell__main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.shell {
  min-height: 100dvh;
  background: #e8eef5;
}

.shell__bar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 clamp(16px, 3vw, 36px);
  border-bottom: 1px solid rgba(27, 75, 138, 0.12);
  background: rgba(244, 247, 251, 0.86);
  backdrop-filter: blur(12px);
}

.shell__brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #0f2444;
  font-family: 'ZCOOL XiaoWei', 'Noto Serif SC', serif;
  font-size: 1.15rem;
  letter-spacing: 0.16em;
  cursor: pointer;
}

.shell__mark {
  width: 12px;
  height: 12px;
  border: 1.5px solid #b83b2e;
  background: rgba(184, 59, 46, 0.12);
  transform: rotate(45deg);
}

.shell__nav {
  display: flex;
  gap: 8px;
}

.shell__link {
  padding: 8px 14px;
  color: rgba(15, 36, 68, 0.62);
  font-family: 'Noto Serif SC', serif;
  font-size: 0.92rem;
  letter-spacing: 0.12em;
  text-decoration: none;
  transition: color 0.2s ease;
}

.shell__link:hover,
.shell__link.is-active,
.shell__link.router-link-active:not([href='/']) {
  color: #1b4b8a;
}

.shell__main {
  min-height: calc(100dvh - 64px);
}
</style>
