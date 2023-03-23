<template>
  <div v-if="isSubtitle" v-show="isOpen" class="drawer-subtitle">
    <slot />
  </div>
  <button v-else :class="itemClass" @click="click">
    <Icon v-if="icon" :icon="icon" :size="16" color="#ffffff" />
    <span v-show="isOpen">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { withDefaults, computed, inject, Ref } from 'vue';
import Icon from '../Icon/Icon.vue';

type Props = {
  id?: string;
  icon?: string;
  isSubtitle?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  id: '',
  icon: '',
});

const { isOpen, selectedId, onClickItem } = inject('drawerState') as {
  isOpen: Ref<boolean>;
  selectedId: Ref<string>;
  onClickItem: (id: string) => void;
};

const itemClass = computed(() => {
  const isNarrowClass = !isOpen.value ? [`drawer-item--narrow`] : [];
  const isSelectedClass =
    props.id === selectedId.value ? [`drawer-item--selected`] : [];
  return ['drawer-item', ...isNarrowClass, ...isSelectedClass].join(' ');
});

const click = () => {
  onClickItem(props.id);
};
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.drawer-subtitle {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px 8px 8px 8px;
  @include \.font-component-title-2x-small;
  color: $color-content-text--white;
  height: 40px;
  white-space: nowrap;
}

.drawer-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  background: none;
  border: none;
  padding: 12px 8px;
  border-radius: 4px;
  @include \.font-component-label-small;
  color: $color-content-text--white;
  white-space: nowrap;
  outline: none;
  height: 40px;
}

.drawer-item:hover {
  background: $color-background-neutral--hover;
}

.drawer-item.drawer-item--selected {
  background: $color-background-neutral--selected;
}

.drawer-item.drawer-item--narrow {
  padding: 12px;
  border-radius: 0px;
}
</style>
