<template>
  <div :class="menuListItemClass" @click="onClickItem">
    <Checkbox v-if="checkbox && !critical" v-model:checked="isSelected" />
    <span class="menulist-item__label">{{ label }}</span>
    <Icon v-if="icon" :icon="icon" :size="16" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Icon from '../Icon/Icon.vue';
import Checkbox from '../Checkbox/Checkbox.vue';

type Props = {
  label: string;
  value: string;
  icon?: string;
  checkbox?: boolean;
  checked?: boolean;
  critical?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  label: '',
  value: '',
  icon: '',
});

const emit = defineEmits<{
  (event: 'click', value: string): void;
  (event: 'checked', value: boolean): void;
}>();

const isSelected = ref(props.checked);

const menuListItemClass = computed(() => {
  const criticalClass = props.critical ? ['menulist-item--critical'] : [];
  const selectedClass = isSelected.value ? ['menulist-item--selected'] : [];
  return ['menulist-item', ...criticalClass, ...selectedClass];
});

const onClickItem = () => {
  if (props.checkbox) {
    isSelected.value = !isSelected.value;
    emit('checked', isSelected.value);
  } else {
    emit('click', props.value);
  }
};
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.menulist-item {
  padding: 9px 8px;
  display: flex;
  width: 100%;
  align-items: center;
  column-gap: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
  border-radius: 4px;
  justify-content: space-between;
  @include \.font-component-label-medium;
}

.menulist-item :deep(.icon) {
  color: $color-content-neutral--main;
}

.menulist-item:hover {
  cursor: pointer;
  background-color: $color-background-neutral--light-00;
}

.menulist-item--critical {
  color: $color-content-error--main;
}

.menulist-item--critical :deep(.icon) {
  color: $color-content-error--main;
}

.menulist-item :deep(.checkbox) {
  margin-right: 2px;
}

.menulist-item--critical:hover {
  background-color: $color-background-neutral--light-00;
}

.menulist-item__label {
  display: inline-flex;
  align-items: center;
}
</style>
