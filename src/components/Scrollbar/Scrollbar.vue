<template>
  <div
    v-if="isVisible"
    ref="scrollTrack"
    class="scrollbar"
    @mousedown="onMouseDown"
  >
    <button
      ref="scrollThumb"
      :class="`scrollbar__thumb ${
        isDraggingThumb ? 'scrollbar__thumb--dragging' : ''
      }`"
      :style="{ width: `${getThumbSize()}px` }"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, Ref, ref } from 'vue';

type Props = {
  navWidth: number;
  targets: HTMLElement[];
  isVisible: boolean;
};

const props = defineProps<Props>();

const scrollTrack: Element | Ref<Element | undefined> = ref(undefined);
const scrollThumb: Element | Ref<Element | undefined> = ref(undefined);
const isDraggingThumb = ref(false);

const maxScroll = computed(() => {
  if (props.targets.length > 0) {
    return props.targets[0].scrollWidth - props.targets[0].clientWidth;
  } else {
    return 0;
  }
});

const onMouseDown = (mouse: MouseEvent) => {
  isDraggingThumb.value = true;
  const thumb = scrollThumb.value as HTMLElement;
  thumb.style.transition = 'left 150ms ease-in-out';
  updateThumbLocation(mouse, thumb);
};

const onMouseUp = () => {
  isDraggingThumb.value = false;
};

const onMouseMove = (mouse: MouseEvent) => {
  if (!scrollThumb.value) {
    return;
  }
  const thumb = scrollThumb.value as HTMLElement;
  thumb.style.transition = 'none';
  updateThumbLocation(mouse, thumb);
};

const updateThumbLocation = (mouse: MouseEvent, thumb: HTMLElement) => {
  if (
    isDraggingThumb.value &&
    scrollThumb.value &&
    scrollTrack.value &&
    props.targets.length > 0
  ) {
    const trackRect = scrollTrack.value.getBoundingClientRect();
    const trackLimit = trackRect.width - props.navWidth;

    if (
      mouse.clientX - props.navWidth < trackLimit &&
      mouse.clientX - props.navWidth > 0
    ) {
      const scrollValue =
        ((mouse.clientX - props.navWidth) * maxScroll.value) / trackLimit;
      props.targets.forEach((element) => {
        element.scroll(scrollValue, 0);
      });

      const newLeft = getThumbLeft(
        trackRect.width,
        scrollValue,
        thumb.getBoundingClientRect().width
      );

      thumb.style.left = `${newLeft}px`;
    }
  }
};

const onResize = () => {
  if (scrollThumb.value && scrollTrack.value && props.targets.length > 0) {
    const trackRect = scrollTrack.value.getBoundingClientRect();
    const thumb = scrollThumb.value as HTMLElement;
    const trackLimit =
      trackRect.width - props.navWidth - thumb.getBoundingClientRect().width;

    const scrollValue =
      (props.targets[0].scrollLeft * trackLimit) / maxScroll.value;

    const newThumbSize = getThumbSize();
    const newLeft = getThumbLeft(trackRect.width, scrollValue, newThumbSize);

    thumb.style.left = `${newLeft}px`;
    thumb.style.width = `${newThumbSize}px`;
  }
};

const getThumbLeft = (
  trackWidth: number,
  scrollValue: number,
  thumbSize: number
) => {
  const offset = 2;
  const maxLeft = trackWidth - props.navWidth - thumbSize - offset * 2;
  const scrolledPercentage = (scrollValue * 100) / maxScroll.value;
  const newLeft = (scrolledPercentage * maxLeft) / 100;

  return newLeft + offset;
};

const getThumbSize = () => {
  if (scrollTrack.value && props.targets.length > 0) {
    const trackRect = scrollTrack.value.getBoundingClientRect();
    const totalScrollWidth = props.targets[0].scrollWidth;
    const targetWidth = props.targets[0].getBoundingClientRect().width;
    const trackWidth = trackRect.width - props.navWidth;

    return (trackWidth * targetWidth) / totalScrollWidth;
  }
  return 0;
};

const onSelectStart = (event: Event) => {
  if (isDraggingThumb.value) {
    return event.preventDefault();
  }
};

onMounted(() => {
  window.addEventListener('mouseup', onMouseUp);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', onResize);
  window.addEventListener('selectstart', onSelectStart);
});

onUnmounted(() => {
  window.removeEventListener('mouseup', onMouseUp);
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('resize', onResize);
  window.removeEventListener('selectstart', onSelectStart);
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.scrollbar {
  position: fixed;
  bottom: 0px;
  height: 15px;
  width: 100%;
  margin-left: -24px;
  z-index: 10;
  background: #f9f9f9;
  box-shadow: inset 1px 1px #e5e4e4;
  padding: 0px 4px;
}

.scrollbar__thumb {
  position: absolute;
  top: 4px;
  height: 8px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  outline: none;
  pointer-events: none;
  background: #c0c0c0;
}

.scrollbar:hover .scrollbar__thumb {
  background: #7c7c7c;
}

.scrollbar__thumb--dragging {
  background: #7c7c7c;
}
</style>
