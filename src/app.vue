<template>
  <div
    id="app"
    :class="{ dark: visualMode === 'dark' }"
    h-full
    text-base
    font-serif
  >
    <router-view />
  </div>
</template>

<script setup lang="ts">
import useVisualMode from './composable/visual-mode'

const { visualMode } = useVisualMode()
</script>
