<template>
  <div class="game-of-life">
    <p>Canway's Game of life</p>
    <div
      ref="canvasRef"
      border-dashed
      border-1
      rounded
      m-auto
      class="w-2/3"
      border-slate-400
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { run } from './game'

const canvasRef = ref<HTMLCanvasElement>()

let destroy: () => void

onMounted(() => {
  destroy = run({
    el: canvasRef.value!,
    size: 100,
  })
})

onUnmounted(() => {
  destroy()
})
</script>
