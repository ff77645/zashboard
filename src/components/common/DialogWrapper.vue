<template>
  <dialog
    ref="modalRef"
    class="modal"
    @close="isOpen = false"
    v-if="isOpen"
  >
    <form
      method="dialog"
      class="modal-backdrop"
    >
      <button class="!outline-none">close</button>
    </form>
    <div class="modal-box relative max-h-[90dvh] overflow-hidden p-0 max-md:max-h-[70dvh]">
      <form method="dialog">
        <button class="btn btn-circle btn-ghost btn-xs absolute top-1 right-1 z-10">
          <XMarkIcon class="h-4 w-4" />
        </button>
      </form>
      <div
        :class="['max-h-[90dvh] overflow-y-auto max-md:max-h-[70dvh]', noPadding ? 'p-0' : 'p-4']"
      >
        <slot></slot>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { nextTick, ref, watch } from 'vue'

const modalRef = ref<HTMLDialogElement>()
const isOpen = defineModel<boolean>()
defineProps<{ noPadding?: boolean }>()

watch(
  isOpen,
  (value) => {
    if (value) {
      nextTick(() => {
        modalRef.value?.showModal()
      })
    }
  },
  {
    immediate: true,
  },
)
</script>
