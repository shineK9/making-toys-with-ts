<template>
  <div
    dark:bg-slate-800
    dark:text-slate-50
    bg-slate-100
    text-slate-800
    h-full
    transition-all
  >
    <div class="w-1/2" m-auto pt-15 text-center>
      <h1>
        <router-link to="/" no-underline text-blue-500 dark:text-blue-300>
          Shinecan's 博客
        </router-link>
        <button
          m-l-3
          i-carbon-sun
          text-2xl
          dark:i-carbon-moon
          cursor-pointer
          dark:text-slate-50
          dark:border-slate-50
          rounded-full
          @click="switchVisualMode(visualMode === 'light' ? 'dark' : 'light')"
        />
      </h1>
      <p text-slate-500>author by: CanShine</p>
      <div border-t-1 border-b-0 border-slate-400 m-y-3 />
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import useVisualMode from '../composable/visual-mode'
const { switchVisualMode, visualMode } = useVisualMode()
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
