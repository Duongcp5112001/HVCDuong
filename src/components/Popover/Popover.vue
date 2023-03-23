<template>
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
  withShadow?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  width: 0,
  withInteraction: false,
  direction: 'bottom',
  aligned: 'left',
});

const isOpen = ref(false);
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
  const parentRect = nonStaticParent.value?.getBoundingClientRect();
  const offsetY = parentRect?.top || (0 as number);
  const offsetX = parentRect?.left || (0 as number);

  if (rect) {
    popoverPosition.value = getPopoverPosition(
      rect,
      offsetY,
      offsetX,
      props.direction
    );
  }
};

const getPopoverPosition = (
  rect: DOMRect,
  offsetY: number,
  offsetX: number,
  direction: 'top' | 'bottom' | 'left' | 'right'
) => {
  const aligned =
    props.aligned === 'right'
      ? `translateX(calc(-100% + ${rect.width}px))`
      : props.aligned === 'center'
      ? getCenterAlignedCalculation(getPopoverFinalWidth(), rect.width)
      : '';

  switch (direction) {
    case 'top':
      return {
        top: rect.top - offsetY + rect.height,
        left: rect.left - offsetX,
        translateY: `translateY(calc(-100% - ${rect.height}px))`,
        translateX: aligned,
      };
    case 'bottom':
      return {
        top: rect.top - offsetY + rect.height,
        left: rect.left - offsetX,
        translateY: '',
        translateX: aligned,
      };
    case 'left':
      return {
        top: rect.top - offsetY + rect.height,
        left: rect.left - offsetX,
        translateY: `translateY(calc(-50% - ${rect.height / 2}px))`,
        translateX: `translateX(-100%)`,
      };
    case 'right':
      return {
        top: rect.top - offsetY,
        left: rect.left - offsetX,
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
      calculatePosition(props.activatorRef, props.direction);
    }
  }
);

watch(
  () => popoverRef.value,
  () => {
    if (
      popoverRef.value &&
      isOutsideScreen(popoverRef.value, props.direction)
    ) {
      calculatePosition(
        props.activatorRef,
        getOppositeDirection(props.direction)
      );
    }
  }
);

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

const isOutsideScreen = (
  popover: HTMLElement,
  direction: 'top' | 'bottom' | 'left' | 'right'
) => {
  const rect = popover.getBoundingClientRect();
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (direction === 'bottom') {
    const isOutsideBottom = rect.bottom > windowHeight;
    const isOutsideIfOpposite = rect.top - rect.height < 0;
    return isOutsideBottom && !isOutsideIfOpposite;
  } else if (direction === 'top') {
    const isOutsideTop = rect.top < 0;
    const isOutsideIfOpposite = rect.bottom + rect.height > windowHeight;
    return isOutsideTop && !isOutsideIfOpposite;
  } else if (direction === 'left') {
    const isOutsideLeft = rect.left < 0;
    const isOutsideIfOpposite = rect.right + rect.width > windowWidth;
    return isOutsideLeft && !isOutsideIfOpposite;
  } else if (direction === 'right') {
    const isOutsideRight = rect.right > windowWidth;
    const isOutsideIfOpposite = rect.left - rect.width < 0;
    return isOutsideRight && !isOutsideIfOpposite;
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

    const parentRect = nonStaticParent.value?.getBoundingClientRect();
    const offsetY = parentRect?.top || (0 as number);
    const offsetX = parentRect?.left || (0 as number);

    if (rect) {
      popoverWidth.value = rect.width || 100;
      popoverPosition.value = getPopoverPosition(
        rect,
        offsetY,
        offsetX,
        direction
      );
    }

    refDom?.addEventListener('click', onToggleOpen);
  }
};

const popoverClass = computed(() => {
  const withInteractionClass = props.withInteraction
    ? ['popover--with-interaction']
    : [];
  const withShadowClass = props.withShadow ? ['popover--with-shadow'] : [];

  return ['popover', ...withInteractionClass, ...withShadowClass];
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

  isOpen.value = false;
  emits('toggleOpen', isOpen.value);
};

onMounted(() => {
  document.addEventListener('click', onClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside);
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

.popover--with-shadow {
  box-shadow: $shadow-panel-1;
  border-radius: 4px;
  background-color: $color-background-neutral--white;
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
