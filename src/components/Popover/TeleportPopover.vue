<template>
  <teleport to="body">
    <transition name="popover-open">
      <div
        v-if="isOpen"
        ref="popoverRef"
        :class="popoverClass"
        :style="popoverStyle"
      >
        <div class="popover__item-container">
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import {
  computed,
  watch,
  Ref,
  ref,
  unref,
  onBeforeUnmount,
  onMounted,
} from 'vue';

type Props = {
  open?: boolean; // 外部から開閉制御するようにしたい場合に使用
  activatorRef: Element | Ref<Element | undefined>; // 開閉制御する要素のRefを渡す（Vueコンポーネントを渡すとエラーになるので注意）
  withInteraction?: boolean;
  width?: number;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  aligned?: 'left' | 'right' | 'center';
  defaultOpen?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  width: 0,
  withInteraction: false,
  direction: 'bottom',
  aligned: 'left',
});

const isOpen = ref(props.defaultOpen || false);
const popoverRef = ref();
const popoverWidth = ref(100);
const popoverPosition = ref({
  top: 0,
  left: 0,
  translateX: '',
  translateY: '',
});
const nonStaticParent = ref();

const emits = defineEmits(['toggleOpen']);

const autoAligned = ref(props.aligned);

const getPopoverFinalWidth = () =>
  props.width > 0 ? props.width : popoverWidth.value;

const popoverStyle = computed(() => {
  return {
    width: `${getPopoverFinalWidth()}px`,
    top: `${
      popoverPosition.value.top ? popoverPosition.value.top + 'px' : 'auto'
    }`,
    left: `${
      popoverPosition.value.left ? popoverPosition.value.left + 'px' : 'auto'
    }`,
    transform: `${popoverPosition.value.translateX} ${popoverPosition.value.translateY}`,
  };
});

const onScroll = () => {
  const activatorRef = unref(props.activatorRef);
  const rect = activatorRef?.getBoundingClientRect();

  if (rect) {
    popoverPosition.value = getPopoverPosition(rect, props.direction);
  }
};

const getPopoverPosition = (
  rect: DOMRect,
  direction: 'top' | 'bottom' | 'left' | 'right'
) => {
  const aligned =
    autoAligned.value === 'right'
      ? `translateX(calc(-100% + ${rect.width}px))`
      : autoAligned.value === 'center'
      ? getCenterAlignedCalculation(getPopoverFinalWidth(), rect.width)
      : '';

  switch (direction) {
    case 'top':
      return {
        top: rect.top + rect.height,
        left: rect.left,
        translateY: `translateY(calc(-100% - ${rect.height}px))`,
        translateX: aligned,
      };
    case 'bottom':
      return {
        top: rect.top + rect.height,
        left: rect.left,
        translateY: '',
        translateX: aligned,
      };
    case 'left':
      return {
        top: rect.top + rect.height,
        left: rect.left,
        translateY: `translateY(calc(-50% - ${rect.height / 2}px))`,
        translateX: `translateX(-100%)`,
      };
    case 'right':
      return {
        top: rect.top,
        left: rect.left,
        translateY: `translateY(calc(-50% + ${rect.height / 2}px))`,
        translateX: `translateX(${rect.width}px)`,
      };
  }
};

const getCenterAlignedCalculation = (
  popoverWidth: number,
  rectWidth: number
) => {
  if (popoverWidth > rectWidth) {
    return `translateX(calc(50% - ${rectWidth / 2}px))`;
  } else {
    return `translateX(calc(${rectWidth / 2}px - 50%))`;
  }
};

watch(
  () => props.activatorRef,
  (activatorRef) => {
    calculatePosition(activatorRef, props.direction);
  }
);

watch(
  () => props.open,
  (open) => {
    if (open !== undefined) {
      isOpen.value = open;
    }
  }
);

watch(
  () => popoverRef.value,
  () => {
    setTimeout(() => {
      if (popoverRef.value) {
        if (
          isOutsideScreenY(popoverRef.value) &&
          isOutsideScreenX(popoverRef.value)
        ) {
          autoAligned.value = getOppositeAligned(props.aligned);
          calculatePosition(
            props.activatorRef,
            getOppositeDirection(props.direction)
          );
        } else if (isOutsideScreenX(popoverRef.value)) {
          autoAligned.value = getOppositeAligned(props.aligned);
          calculatePosition(props.activatorRef, props.direction);
        } else if (isOutsideScreenY(popoverRef.value)) {
          autoAligned.value = props.aligned;
          calculatePosition(
            props.activatorRef,
            getOppositeDirection(props.direction)
          );
        }
      }
    }, 1);
  }
);

const isOutsideScreenX = (popover: HTMLElement) => {
  const rect = popover.getBoundingClientRect();
  const windowWidth = window.innerWidth;

  return rect.left < 0 || rect.right > windowWidth;
};

const isOutsideScreenY = (popover: HTMLElement) => {
  const rect = popover.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  return rect.top < 0 || rect.bottom > windowHeight;
};

const getOppositeDirection = (
  direction: 'top' | 'bottom' | 'left' | 'right'
) => {
  switch (direction) {
    case 'top':
      return 'bottom';
    case 'bottom':
      return 'top';
    case 'left':
      return 'right';
    case 'right':
      return 'left';
  }
};

const getOppositeAligned = (aligned: 'left' | 'right' | 'center') => {
  switch (aligned) {
    case 'left':
      return 'right';
    case 'right':
      return 'left';
    case 'center':
      return 'center';
  }
};

const calculatePosition = (
  activatorRef: Element | Ref<Element | undefined>,
  direction: 'top' | 'bottom' | 'left' | 'right'
) => {
  if (activatorRef) {
    const refDom = unref(activatorRef);

    let parent: HTMLElement | null | undefined = refDom?.parentElement;
    while (parent?.tagName !== 'BODY') {
      if (!parent) {
        break;
      }
      parent.addEventListener('scroll', onScroll);
      const elStyle = window.getComputedStyle(parent);
      if (!nonStaticParent.value && elStyle.position !== 'static') {
        nonStaticParent.value = parent;
      }

      parent = parent.parentElement;
    }

    const rect = refDom?.getBoundingClientRect();

    if (rect) {
      popoverWidth.value = rect.width || 100;
      popoverPosition.value = getPopoverPosition(rect, direction);
    }

    refDom?.addEventListener('click', onToggleOpen);
  }
};

const popoverClass = computed(() => {
  return ['popover', props.withInteraction ? 'popover--with-interaction' : ''];
});

const onToggleOpen = () => {
  isOpen.value = !isOpen.value;
  emits('toggleOpen', isOpen.value);
};

const onClickOutside = (e: Event) => {
  const refDom = unref(popoverRef);
  const activatorRef = unref(props.activatorRef);

  if (
    refDom?.contains(e.target as Node) ||
    activatorRef?.contains(e.target as Node)
  ) {
    return;
  }

  if (isOpen.value && !props.defaultOpen) {
    isOpen.value = false;
    emits('toggleOpen', isOpen.value);
  }
};

const onResizeScreen = () => {
  isOpen.value = false;
  emits('toggleOpen', isOpen.value);
};

onMounted(() => {
  document.addEventListener('click', onClickOutside);
  window.addEventListener('resize', onResizeScreen);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside);
  window.removeEventListener('resize', onResizeScreen);
  const refDom = unref(props.activatorRef);
  let parent: HTMLElement | null | undefined = refDom?.parentElement;
  while (parent?.tagName !== 'BODY') {
    if (!parent) {
      break;
    }
    parent.removeEventListener('scroll', onScroll);
    parent = parent.parentElement;
  }
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.popover {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 50;
  color: $color-content-text--main;
  @include \.font-component-label-medium;
  overflow: visible;
}

.popover__item-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.popover--with-interaction.popover-open-enter-active {
  animation: bounce-in 0.2s;
}

.popover--with-interaction.popover-open-leave-active {
  animation: bounce-out 0.2s;
}

@keyframes bounce-in {
  0% {
    transform-origin: top;
    transform: scaleY(0);
  }
  100% {
    transform-origin: top;
    transform: scaleY(1);
  }
}

@keyframes bounce-out {
  0% {
    transform-origin: top;
    transform: scaleY(1);
  }
  100% {
    transform-origin: top;
    transform: scaleY(0);
  }
}
</style>
