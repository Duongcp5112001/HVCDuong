<template>
  <div class="dropdown" :style="{ width }">
    <button
      ref="activatorRef"
      :class="dropdownButtonClass"
      :disabled="disabled"
    >
      <Icon v-if="icon" class="dropdown-icon" :icon="icon" :size="iconSize" />
      <span v-if="selectedValue" class="dropdown-button__inner">
        {{ selectedOption }}
      </span>
      <span
        v-else
        class="dropdown-button__inner dropdown-button__inner--placeholder"
      >
        {{ placeholder }}
      </span>
      <Icon icon="keyboard_arrow_down" :size="iconSize" />
    </button>
    <Popover
      :open="isOpen"
      :activator-ref="activatorRef"
      @toggle-open="onPopoverToggleOpen"
    >
      <div class="dropdown-container">
        <slot />
      </div>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide, watch } from 'vue';
import Icon from '../Icon/Icon.vue';
import Popover from '../Popover/Popover.vue';

type Props = {
  size?: 'default' | 'small';
  status?: 'error' | 'success' | 'default';
  value?: string;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  icon?: string;
  error?: boolean;
  listRoomType?: Array<{ label?: string; value: string; isSelected?: boolean }>;
};

const props = withDefaults(defineProps<Props>(), {
  type: 'single',
  size: 'default',
  status: 'default',
  value: '',
  placeholder: '',
  width: '240px',
  icon: '',
  error: false,
  listRoomType: () => [],
});

const emits = defineEmits(['update:value']);

const selectedItem = computed(() => selectedValue.value);

const items = ref<
  Array<{ label?: string; value: string; isSelected?: boolean }>
>([]);
if(props.listRoomType.length){
  items.value = [...props.listRoomType]
}

const selectedValue = ref(props.value);
const isOpen = ref(false);
const activatorRef = ref();

function selectItem(item: string) {
  isOpen.value = false;
  selectedValue.value = item;
  emits('update:value', item);
}

provide('selectState', {
  selectedItem,
  items,
  selectItem,
});

const selectedOption = computed(() => {
  const item = items.value.find((item) => item.value === selectedValue.value);
  return item && item.label ? item.label : item?.value ?? selectedValue.value;
});

const dropdownButtonClass = computed(() => {
  const sizeClass = [`dropdown-button--${props.size}`];
  const statusClass =
    props.status !== 'default' ? [`dropdown-button--${props.status}`] : [];
  const errorClass = props.error ? ['dropdown-button--error'] : [];
  return ['dropdown-button', ...sizeClass, ...statusClass, ...errorClass].join(
    ' '
  );
});

const iconSize = computed(() => {
  if (props.size === 'default') {
    return 20;
  }
  if (props.size === 'small') {
    return 16;
  }
  return 20;
});

const onPopoverToggleOpen = (open: boolean) => {
  isOpen.value = open;
};

watch(
  () => props.value,
  (value) => {
    selectedValue.value = value;
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.dropdown {
  text-align: left;
}

.dropdown-icon {
  margin-right: 8px;
}

.dropdown-button {
  @include \.font-component-label-large;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  color: $color-content-text--main;
  background-color: $color-background-neutral--light-02;
  border-color: $color-border-neutral--input;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  width: 100%;
  outline: 0;
  height: 40px;
  white-space: nowrap;
  overflow: hidden;
}

.dropdown-button :deep(.icon) {
  color: $color-content-neutral--light-00;
}

.dropdown-button:hover {
  border-color: $color-border-neutral--light;
}

.dropdown-button:disabled {
  background: $color-background-neutral--disable;
  border-color: $color-border-neutral--disable;
}

.dropdown-button.dropdown-button--small {
  @include \.font-component-label-small;
  padding: 8px;
  height: 32px;
}

.dropdown-button.dropdown-button--error {
  border-color: $color-border-error--main;
}

.dropdown-button.dropdown-button--success {
  border-color: $color-border-success--main;
}

.dropdown-button__inner {
  text-align: left;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-button__inner.dropdown-button__inner--placeholder {
  color: $color-content-text--placeholder;
}

.dropdown-container {
  padding: 8px 7px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 4px;
  background-color: $color-background-neutral--white;
  box-shadow: $shadow-panel-1;
  max-height: 208px;
  overflow-y: auto;
}

.dropdown--divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 8px 0;
}

.dropdown--item--container {
  max-height: 300px;
  overflow-y: auto;
}
</style>
