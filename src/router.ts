import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

export const pageRoutes: RouteRecordRaw[] = [
  {
    path: '/gen-tree',
    name: 'gen-tree',
    component: import('./pages/01-tree'),
    meta: {
      label: 'Generate a tree',
      status: 'doing',
      describe: '用 canvas 画一颗随机的树',
    },
  },
  {
    path: '/game-of-life',
    name: 'game-of-life',
    component: import('./pages/02-game-of-life'),
    meta: {
      label: "Canway's Game of Life",
      status: 'todo',
      describe:
        '模拟细胞繁衍的自动机<br/><a target="_blank" href="https://zh.wikipedia.org/wiki/康威生命游戏">[wiki]康威生命游戏</a>',
    },
  },
]

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'DefaultLayout',
    component: import('./layout/default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: import('./home.vue'),
      },
      ...pageRoutes,
    ],
  },
]

const router = createRouter({
  routes: routes,
  history: createWebHashHistory(),
})

export default router
