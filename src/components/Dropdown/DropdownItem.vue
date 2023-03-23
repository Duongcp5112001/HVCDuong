<template>
  <div :class="classes" @click="selectOptionInner()">
    {{ label }}
  </div>
</template>

<script setup lang="ts">
import { inject, Ref, ComputedRef, computed, watchEffect } from 'vue';

const props = withDefaults(
  defineProps<{
    label: string;
    value: string;
  }>(),
  {
    label: '',
    value: '',
  }
);

const { items, selectItem, selectedItem } = inject('selectState') as {
  items: Ref<Array<{ label?: string; value: string; isSelected?: boolean }>>;
  selectItem: (item: string) => void;
  selectedItem: ComputedRef<string | undefined>;
};

const isSelected = computed(() => props.value === selectedItem.value);

const selectOptionInner = () => {
  selectItem(props.value);
};

watchEffect(() => {
  items.value.push({
    label: props.label,
    value: props.value,
    isSelected: false,
  });
});

const classes = computed(() => {
  const selectedClasses = isSelected.value ? ['dropdown--item__selected'] : [];
  return ['dropdown--item', ...selectedClasses].join(' ');
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.dropdown--item {
  padding: 7px 8px;
  border-radius: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
}

.dropdown--item:hover {
  cursor: pointer;
  background-color: $color-background-neutral--light-00;
}

.dropdown--item__selected {
  background-color: $color-background-neutral--light-00;
}
</style>
