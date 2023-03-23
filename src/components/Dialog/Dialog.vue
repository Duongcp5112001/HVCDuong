<template>
  <teleport to="body">
    <dialog
      ref="refDialog"
      :class="dialogClass"
      v-bind="attrs"
      :style="{
        height: calculatedHeight,
        maxHeight: customHeight ? customHeight : 'auto',
        minHeight: '207px',
      }"
      @cancel="onCancel"
    >
      <div class="dialog-content-container">
        <div ref="refDialogHeader" class="dialog__header">
          <div v-if="slots.header" class="dialog__header-inner">
            <slot name="header" />
          </div>
          <Button
            icon="close"
            shape="circle"
            size="large"
            color="neutral"
            type="text"
            @click="onClose"
          />
        </div>
        <div
          v-if="slots.default"
          ref="refDialogContentContainer"
          class="dialog__content"
          :style="{
            flexShrink: flexShrink,
            flexGrow: flexGrow,
          }"
        >
          <slot />
        </div>
        <div v-if="slots.table" ref="refTableContainer" class="dialog__table">
          <slot name="table" />
        </div>
        <div v-if="slots.footer" ref="refDialogFooter" class="dialog__footer">
          <slot name="footer" />
        </div>
      </div>
    </dialog>
  </teleport>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  watchEffect,
  useAttrs,
  withDefaults,
  computed,
  onUnmounted,
  useSlots,
} from 'vue';
import Button from '../Button/Button.vue';

const slots = useSlots();

const refDialog = ref<InstanceType<typeof HTMLDialogElement> | null>(null);
const refDialogContentContainer = ref<HTMLDivElement | undefined>(undefined);
const refDialogHeader = ref<HTMLSpanElement | undefined>(undefined);
const refDialogFooter = ref<HTMLSpanElement | undefined>(undefined);
const refTableContainer = ref<HTMLSpanElement | undefined>(undefined);
const internalOpen = ref(false);

type Props = {
  open?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'fullscreen';
  color?: 'light' | 'dark';
  customHeight?: string;
  footerHeight?: 'small' | 'medium';
};

const props = withDefaults(defineProps<Props>(), {
  open: false,
  size: 'medium',
  customHeight: '',
  color: 'light',
  footerHeight: 'medium',
});

const emit = defineEmits<{ (event: 'closeDialog'): void }>();

const onCancel = (e: Event) => {
  e.preventDefault();
  emit('closeDialog');
};

const onClose = () => {
  emit('closeDialog');
};

const attrs = useAttrs();

const dialogClass = computed(() => {
  const sizeClass = [`dialog--${props.size}`];
  const colorClass = [`dialog--color-${props.color}`];
  const footerHeightClass = [`dialog--footer-height-${props.footerHeight}`];
  return ['dialog', ...sizeClass, ...colorClass, ...footerHeightClass].join(
    ' '
  );
});

const showHideDialog = () => {
  if (!refDialog?.value) {
    return;
  }
  if (props.open) {
    refDialog.value.showModal();
  } else {
    refDialog.value.classList.add('close');
    refDialog.value.addEventListener(
      'animationend',
      () => {
        if (refDialog.value) {
          refDialog.value.classList.remove('close');
          refDialog.value.close();
        }
      },
      { once: true }
    );
  }
};

onMounted(() => {
  watchEffect(() => {
    if (props.open !== internalOpen.value) {
      showHideDialog();
      internalOpen.value = props.open;
      calculatedHeight.value = calculateHeight();
    }
  });
});

const calculatedHeight = ref('');

const calculateHeight = () => {
  if (props.size === 'fullscreen') {
    return '100%';
  }
  if (slots.table) {
    if (
      refDialog.value &&
      refDialogHeader.value &&
      refDialogFooter.value &&
      refTableContainer.value
    ) {
      const dialogHeight = refDialog.value.getBoundingClientRect().height;
      const contentHeight = refDialogContentContainer.value
        ? refDialogContentContainer.value.getBoundingClientRect().height
        : 0;
      const topHeight = refDialogHeader.value.getBoundingClientRect().height;
      const bottomHeight = refDialogFooter.value.getBoundingClientRect().height;
      const availableContentHeight =
        dialogHeight - topHeight - bottomHeight - contentHeight;

      const tableHeight = getTableHeight(refTableContainer.value);

      if (tableHeight > availableContentHeight) {
        return 'calc(100% - 80px)';
      }
    }
    return props.customHeight ? 'calc(100% - 80px)' : 'fit-content';
  } else {
    return 'calc(100% - 80px)';
  }
};

const getTableHeight = (tableContainer: HTMLElement) => {
  const table = tableContainer.querySelector('table');
  if (table) {
    return table.getBoundingClientRect().height;
  }
  return 0;
};

const flexShrink = computed(() => {
  if (props.size === 'fullscreen') {
    return 1;
  }
  if (slots.table) {
    return 0;
  }
  return 1;
});

const flexGrow = computed(() => {
  if (props.size === 'fullscreen') {
    return 1;
  }
  return 0;
});

const onResize = () => {
  calculatedHeight.value = calculateHeight();
};

onMounted(() => {
  calculatedHeight.value = calculateHeight();
  window.addEventListener('resize', onResize);
});
onUnmounted(() => {
  window.removeEventListener('resize', onResize);
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.dialog {
  padding: 0px;
  border-radius: 16px;
  border: none;
  box-shadow: $shadow-dialog;
  overflow: visible;
}

.dialog::backdrop {
  background: $color-background-neutral--modal-background;
}

.dialog--small {
  width: 400px;
}

.dialog--medium {
  width: 600px;
}

.dialog--large {
  width: 900px;
}

.dialog--xlarge {
  width: 1280px;
}

.dialog--fullscreen {
  width: 100%;
  margin: 16px;
  min-width: 1248px;
}

.dialog-content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}

.dialog__header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px 8px;
  position: relative;
  border-radius: 16px 16px 0px 0px;
}

.dialog__header-inner {
  display: flex;
  align-items: center;
}

.dialog__content {
  padding: 16px 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: fit-content;
  overflow-y: auto;
}

.dialog__table {
  padding: 0px 32px 16px 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.dialog--fullscreen .dialog__content {
  padding: 0px 16px 0px 16px;
}

.dialog__footer {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  align-self: flex-end;
}

.dialog.dialog--footer-height-medium .dialog__footer {
  padding: 16px 32px 24px 32px;
}

.dialog.dialog--footer-height-small .dialog__footer {
  padding: 0 32px 8px 32px;
}

.dialog--color-dark {
  background: $color-background-neutral--light-02;
}

.dialog--color-light .dialog__content,
.dialog--color-light .dialog__header {
  background: $color-background-neutral--white;
}

.dialog--color-dark .dialog__content,
.dialog--color-dark .dialog__header {
  background: $color-background-neutral--light-02;
}

.dialog[open] {
  animation: fadeIn 300ms ease 0s 1 normal;
}

.dialog[open]::backdrop {
  animation: fadeIn 150ms ease 0s 1 normal;
}

.dialog.close {
  animation: fadeOut 150ms ease 0s 1 normal forwards;
}

.dialog.close::backdrop {
  animation: fadeOut 150ms ease 0s 1 normal forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  100% {
    opacity: 1;
    opacity: 0;
  }
}
</style>
