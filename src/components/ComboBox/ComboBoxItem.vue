<template>
  <div ref="focusedRef" :class="comboboxItemClass" @click="selectOptionInner()">
    {{ label }}
  </div>
</template>

<script setup lang="ts">
import {
  inject,
  Ref,
  ComputedRef,
  computed,
  watchEffect,
  ref,
  watch,
} from 'vue';

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

const focusedRef = ref<HTMLElement | null>(null);

const { items, selectItem, selectedItem, focusedItem } = inject(
  'selectState'
) as {
  items: Ref<Array<{ label: string; value: string; isSelected: boolean }>>;
  selectItem: (item: string) => void;
  selectedItem: ComputedRef<
    { label: string; value: string; isSelected: boolean } | undefined
  >;
  focusedItem: ComputedRef<
    { label: string; value: string; isSelected: boolean } | undefined
  >;
};

const isSelected = computed(() => props.value === selectedItem.value?.value);
const isFocused = computed(() => props.value === focusedItem.value?.value);

const selectOptionInner = () => {
  selectItem(props.value);
};

watchEffect(() => {
  if (items.value.filter((item) => item.value === props.value).length === 0) {
    items.value = [
      ...items.value,
      { label: props.label, value: props.value, isSelected: false },
    ];
  }
});

watch(isFocused, (isFocused) => {
  if (isFocused && focusedRef.value) {
    focusedRef.value.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }
});

const comboboxItemClass = computed(() => {
  const selectedClass = isSelected.value ? ['combobox-item--selected'] : [];
  const focusedClass = isFocused.value ? ['combobox-item--focused'] : [];
  return ['combobox-item', ...selectedClass, ...focusedClass].join(' ');
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.combobox-item {
  padding: 7px 8px;
  border-radius: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
}

.combobox-item:hover {
  cursor: pointer;
  background-color: $color-background-neutral--light-00;
}

.combobox-item--selected {
  font-weight: $font-weight-bold;
}

.combobox-item--focused {
  background-color: $color-background-neutral--light-00;
}
</style>
