<script setup lang="ts">
import type { DistrictSpecialty } from '@/types/specialty'

defineProps<{
  specialty: DistrictSpecialty
}>()

const sections = [
  { key: 'foods' as const, label: '美食' },
  { key: 'geoIndications' as const, label: '特产' },
  { key: 'otherProducts' as const, label: '代表产业 / 特色' },
]
</script>

<template>
  <div class="specialty">
    <section
      v-for="(section, index) in sections"
      :key="section.key"
      class="specialty__section"
      :style="{ animationDelay: `${0.08 + index * 0.06}s` }"
    >
      <h3 class="specialty__label">{{ section.label }}</h3>
      <ul v-if="specialty[section.key].length" class="specialty__list">
        <li
          v-for="item in specialty[section.key]"
          :key="item"
          class="specialty__chip"
        >
          {{ item }}
        </li>
      </ul>
      <p v-else class="specialty__empty">—</p>
    </section>
  </div>
</template>

<style scoped>
.specialty {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(27, 75, 138, 0.16);
}

.specialty__section {
  animation: specialty-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.specialty__label {
  margin: 0 0 8px;
  color: rgba(27, 75, 138, 0.72);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.22em;
}

.specialty__list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.specialty__chip {
  padding: 4px 10px;
  border: 1px solid rgba(184, 59, 46, 0.28);
  background: rgba(255, 255, 255, 0.55);
  color: #0f2444;
  font-family: 'Noto Serif SC', serif;
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  line-height: 1.45;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;
}

.specialty__chip:hover {
  border-color: rgba(184, 59, 46, 0.55);
  background: rgba(184, 59, 46, 0.06);
  color: #b83b2e;
}

.specialty__empty {
  margin: 0;
  color: rgba(15, 36, 68, 0.35);
  font-family: 'Noto Serif SC', serif;
  font-size: 0.9rem;
  letter-spacing: 0.12em;
}

@keyframes specialty-rise {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
