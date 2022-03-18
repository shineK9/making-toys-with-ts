import { ref } from 'vue'

export type VisualMode = 'light' | 'dark'
const visualMode = ref<VisualMode>('light')

export default function useVisualMode() {
  function switchVisualMode(mode: VisualMode) {
    visualMode.value = mode
  }

  return {
    visualMode,
    switchVisualMode,
  }
}
