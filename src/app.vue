<template>
  <div
    id="app"
    :class="{ dark: visualMode === 'dark' }"
    h-full
    text-base
    font-serif
  >
    <canvas id="fps" width="100" height="30" fixed />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useVisualMode from './composable/visual-mode'
import { fps } from './utils'

const { visualMode } = useVisualMode()

onMounted(() => {
  fps()
})
</script>
