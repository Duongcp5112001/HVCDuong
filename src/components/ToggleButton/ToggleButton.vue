<template>
  <button :class="toggleButtonClass" :disabled="isDisabled" @click="click">
    <Icon v-if="icon" :icon="icon" :size="iconSize" />
    <CustomIcon
      v-else-if="customIcon"
      :icon="customIcon"
      :size="iconSize"
      :color="customIconColor"
    />
    <span v-if="slots.default" class="toggle-button__content">
      <slot />
    </span>
    <Badge v-if="counter" :counter="counter" color="error" :size="size"></Badge>
  </button>
</template>

<script setup lang="ts">
import { useSlots, computed, withDefaults, inject, ComputedRef } from 'vue';
import Icon from '../Icon/Icon.vue';
import CustomIcon from '../CustomIcon/CustomIcon.vue';
import Badge from '../Badge/Badge.vue';

type Props = {
  id?: string;
  icon?: string;
  customIcon?: string;
  counter?: number;
};
const props = withDefaults(defineProps<Props>(), {
  id: '',
  icon: '',
  counter: 0,
  customIcon: '',
});

const slots = useSlots();

const { selectedId, onClickItem, type, size } = inject(
  'toggleButtonSetState'
) as {
  selectedId: ComputedRef<string>;
  onClickItem: (id: string) => void;
  type: 'contained' | 'outlined';
  size: 'small' | 'medium' | 'large';
};

const isDisabled = computed(() => props.id === selectedId.value);

const toggleButtonClass = computed(() => {
  const typeClass = [`toggle-button--${type}`];
  const sizeClass = [`toggle-button--${size}`];
  return ['toggle-button', ...typeClass, ...sizeClass].join(' ');
});

const iconSize = computed(() => {
  if (size === 'large') {
    return 24;
  }
  if (size === 'medium') {
    return 20;
  }
  return 16;
});

const customIconColor = computed(() => {
  if (type === 'contained') {
    return '#ffffff';
  }
  return '#313131';
});

const click = () => {
  onClickItem(props.id);
};
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.toggle-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 6px;
  cursor: pointer;
  border-color: transparent;
  border-style: solid;
  border-width: 1px;
  border-left: none;
  width: 100%;
}

.toggle-button:disabled {
  pointer-events: none;
  box-shadow: none;
}

.toggle-button:first-child {
  border-radius: 4px 0px 0px 4px;
  border-left-style: solid;
  border-left-width: 1px;
}

.toggle-button:last-child {
  border-radius: 0px 4px 4px 0px;
}

.toggle-button--large {
  @include \.font-component-label-large;
  height: 40px;
  padding: 8px;
}

.toggle-button--medium {
  @include \.font-component-label-medium;
  height: 32px;
  padding: 6px;
}

.toggle-button--small {
  @include \.font-component-label-small;
  height: 24px;
  padding: 4px;
}

.toggle-button:focus {
  outline: 0;
}

.toggle-button__content {
  display: flex;
  align-items: center;
  padding: 0px 8px;
}

.toggle-button--contained {
  color: $color-content-text--white;
  background-color: $color-background-neutral--main;
  border-color: $color-border-neutral--white;
}

.toggle-button--contained:hover {
  background-color: $color-background-neutral--dark-01;
}

.toggle-button--contained:active {
  background-color: $color-background-primary--active;
}

.toggle-button--contained:disabled {
  background-color: $color-background-primary--active;
}

.toggle-button--contained :deep(.icon) {
  color: $color-content-neutral--white;
}

.toggle-button--outlined {
  color: $color-content-text--main;
  background-color: $color-background-neutral--light-00;
  border-color: $color-border-neutral--light;
}

.toggle-button--outlined:hover {
  background-color: $color-background-neutral--light-00;
}

.toggle-button--outlined:active {
  background-color: $color-background-neutral--white;
}

.toggle-button--outlined:disabled {
  background-color: $color-background-neutral--white;
}

.toggle-button--outlined :deep(.icon) {
  color: $color-content-text--main;
}
</style>
