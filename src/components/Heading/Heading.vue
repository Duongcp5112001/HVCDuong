<template>
  <div :class="headingClass">
    <Icon v-if="icon" :icon="icon" :size="iconSize" class="heading__icon" />
    <h1 v-if="tag === 'h1'">
      <slot />
    </h1>
    <h2 v-else-if="tag === 'h2'">
      <slot />
    </h2>
    <h3 v-else-if="tag === 'h3'">
      <slot />
    </h3>
    <h4 v-else-if="tag === 'h4'">
      <slot />
    </h4>
    <h5 v-else-if="tag === 'h5'">
      <slot />
    </h5>
    <h6 v-else-if="tag === 'h6'">
      <slot />
    </h6>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Icon from '../Icon/Icon.vue';

type Props = {
  icon?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  level?: number;
};

const props = withDefaults(defineProps<Props>(), {
  icon: '',
  tag: 'h1',
  level: 1,
});

const headingClass = computed(() =>
  ['heading', `heading--lv${props.level}`].join(' ')
);
const iconSize = computed(() => {
  switch (props.level) {
    case 1:
      return 32;
    case 2:
      return 24;
    default:
      return 24;
  }
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.heading {
  display: flex;
  align-items: center;
  gap: 16px;
}

.heading h1,
.heading h2,
.heading h3,
.heading h4,
.heading h5,
.heading h6 {
  margin: 0;
  font-weight: $font-weight-regular;
}

.heading--lv1 h1,
.heading--lv1 h2,
.heading--lv1 h3,
.heading--lv1 h4,
.heading--lv1 h5,
.heading--lv1 h6 {
  @include \.font-component-headline-large;
  margin: 0;
}

.heading--lv2 h1,
.heading--lv2 h2,
.heading--lv2 h3,
.heading--lv2 h4,
.heading--lv2 h5,
.heading--lv2 h6 {
  font-size: $font-size-xl;
}

.heading .heading__icon {
  color: $color-content-primary--main;
}
</style>
