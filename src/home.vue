<template>
  <ul p-0 m-0 list-none grid grid-cols-3>
    <li
      tag="li"
      v-for="(i, idx) in pageRoutes"
      :key="i.name"
      hover:bg-slate-200
      class="dark:hover:bg-slate-600"
      hover:border-0
      hover:border-b-2
      border-blue-400
      transition-all
      p-y-3
    >
      <router-link
        :to="i.path"
        dark:text-blue-200
        text-blue-200
        no-underline
        cursor-pointer
        text-blue-500
        transition-all
      >
        {{ idx + 1 }}.
        <span inline-block truncate max-w-45 vertical-middle>{{
          i.meta?.label
        }}</span>
        ({{ i.meta?.status }})
      </router-link>
      <div m-y-1 />
      <div dark:text-blue-100 v-html="i.meta?.describe"></div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { pageRoutes } from './router'
</script>
