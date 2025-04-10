import { isMiddleScreen } from '@/helper/utils'
import { getCurrentInstance, onBeforeUnmount, onMounted } from 'vue'

export function useBounceOnVisible(className = 'bounce-in', triggerOnce = false) {
  if (!isMiddleScreen.value) return

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const instance = getCurrentInstance()
    const el = instance?.proxy?.$el as HTMLElement | null
    if (!el) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(className)

          if (triggerOnce && observer) {
            observer.unobserve(el)
          }
        } else {
          el.classList.remove(className)
        }
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -20% 0px',
      },
    )

    observer.observe(el)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
}
