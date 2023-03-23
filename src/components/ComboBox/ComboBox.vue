<template>
  <div class="combobox" :style="{ width }">
    <div :class="comboboxIconsContainerClass" :style="{ width }">
      <span v-if="searchIcon" class="combobox__icon-search">
        <Icon icon="search" :size="iconSize" />
      </span>
      <span class="combobox__icon">
        <Icon icon="keyboard_arrow_down" :size="iconSize" />
      </span>
    </div>
    <input
      ref="activatorRef"
      :class="comboboxInputClass"
      :disabled="disabled"
      type="text"
      :placeholder="placeholder"
      :value="selectedOption"
      @input="onInput"
      @keydown="onKeyDown"
      @blur="onBlur"
    />
    <Popover
      :open="isOpen"
      :activator-ref="activatorRef"
      @toggle-open="onPopoverToggleOpen"
    >
      <div class="combobox__item-list">
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
  status?: 'error' | 'default';
  value?: string;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  error?: boolean;
  searchIcon?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  status: 'default',
  value: '',
  placeholder: '',
  width: '240px',
  error: false,
  disabled: false,
  searchIcon: true,
});

const emits = defineEmits(['update:value']);

const items = ref<
  Array<{ label: string; value: string; isSelected?: boolean }>
>([]);

const selectedValue = ref(props.value);
const focusedValue = ref('');
const isOpen = ref(false);
const activatorRef = ref();

const selectedItem = computed(
  () => items.value.filter((item) => item.value === selectedValue.value)[0]
);
const focusedItem = computed(
  () => items.value.filter((item) => item.value === focusedValue.value)[0]
);

const selectItem = (item: string) => {
  isOpen.value = false;
  selectedValue.value = item;
  emits('update:value', item);
};

provide('selectState', {
  selectedItem,
  focusedItem,
  items,
  selectItem,
});

const selectedOption = computed(() => {
  const item = items.value.find((item) => item.value === selectedValue.value);
  return item && item.label ? item.label : item?.value ?? selectedValue.value;
});

const comboboxInputClass = computed(() => {
  const sizeClass = [`combobox__input--${props.size}`];
  const statusClass =
    props.status !== 'default' ? [`combobox__input--${props.status}`] : [];
  const errorClass = props.error ? ['combobox__input--error'] : [];
  const searchIconClass = props.searchIcon
    ? ['combobox__input--search-icon']
    : [];
  return [
    'combobox__input',
    ...sizeClass,
    ...statusClass,
    ...errorClass,
    ...searchIconClass,
  ].join(' ');
});

const comboboxIconsContainerClass = computed(() => {
  const searchIconClass = props.searchIcon
    ? ['combobox__icons-container--search-icon']
    : [];
  return ['combobox__icons-container', ...searchIconClass].join(' ');
});

const onInput = (e: Event) => {
  if (!isOpen.value) {
    isOpen.value = true;
  }
  const value = (e.target as HTMLInputElement).value;
  if (value === '') {
    focusedValue.value = '';
  } else {
    const exactItem = items.value.find(
      (item) => item.label.toLowerCase() === value.toLowerCase()
    );
    const includesItem = items.value.find((item) =>
      item.label.toLowerCase().includes(value.toLowerCase())
    );

    if (exactItem) {
      focusedValue.value = exactItem.value;
    } else if (includesItem) {
      focusedValue.value = includesItem.value;
    } else {
      focusedValue.value = '';
    }
  }
};

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    if (isOpen.value) {
      selectItem(focusedValue.value);
    } else {
      isOpen.value = true;
    }
  }

  if (event.key === 'ArrowDown') {
    if (!isOpen.value) {
      isOpen.value = true;
      focusedValue.value = selectedValue.value;
    }

    const index = items.value.findIndex(
      (item) => item.value === focusedValue.value
    );
    if (index < items.value.length - 1) {
      focusedValue.value = items.value[index + 1].value;
    } else if (index === items.value.length - 1) {
      focusedValue.value = items.value[0].value;
    }
  }

  if (event.key === 'ArrowUp') {
    if (!isOpen.value) {
      isOpen.value = true;
      focusedValue.value = selectedValue.value;
    }

    const index = items.value.findIndex(
      (item) => item.value === focusedValue.value
    );
    if (index > 0) {
      focusedValue.value = items.value[index - 1].value;
    } else if (index === 0 || index === -1) {
      focusedValue.value = items.value[items.value.length - 1].value;
    }
  }

  if (event.key === 'Tab') {
    if (isOpen.value) {
      selectItem(focusedValue.value);
    }
  }
};

const onBlur = () => {
  focusedValue.value = selectedValue.value;
};

const onPopoverToggleOpen = (open: boolean) => {
  isOpen.value = open;
};

const iconSize = computed(() => {
  if (props.size === 'default') {
    return 20;
  }
  if (props.size === 'small') {
    return 16;
  }
  return 20;
});

watch(
  () => props.value,
  (value) => {
    selectedValue.value = value;
  },
  { immediate: true }
);

watch(
  () => isOpen.value,
  (value) => {
    if (value) {
      focusedValue.value = selectedValue.value;
    }
  }
);
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.combobox {
  display: flex;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;
}

.combobox__icons-container {
  grid-row-start: 1;
  grid-column-start: 1;
  z-index: 1;
  display: flex;
  padding: 8px;
  justify-content: flex-end;
  pointer-events: none;
}

.combobox__icons-container--search-icon {
  justify-content: space-between;
}

.combobox__icon {
  display: flex;
  align-items: center;
}

.combobox__icon-search {
  display: flex;
  align-items: center;
}

.combobox__input {
  @include \.font-component-label-large;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 36px 8px 8px;
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
  box-sizing: border-box;
  grid-row-start: 1;
  grid-column-start: 1;
}

.combobox__input--search-icon {
  padding: 8px 36px 8px 36px;
}

.combobox__input::placeholder {
  color: $color-content-text--placeholder;
}

.combobox__input :deep(.icon) {
  color: $color-content-neutral--light-00;
}

.combobox__input.combobox__input--error {
  border-color: $color-border-error--main;
}

.combobox__input:hover {
  border-color: $color-border-neutral--light;
}

.combobox__input--error:hover {
  border-color: $color-border-error--main !important;
}

.combobox__input:disabled {
  background: $color-background-neutral--disable;
  border-color: $color-border-neutral--disable;
}

.combobox__input.combobox__input--small {
  @include \.font-component-label-small;
  padding: 8px 32px 8px 8px;
  height: 32px;
}

.combobox__input.combobox__input--small.combobox__input--search-icon {
  padding: 8px 32px 8px 32px;
}

.combobox__item-list {
  padding: 8px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  gap: 8px;
  border-radius: 4px;
  background-color: $color-background-neutral--white;
  box-shadow: $shadow-panel-1;
  max-height: 208px;
  overflow-y: auto;
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-thumb {
  border: 3px solid transparent;
  background: #d9d9d9;
  background-clip: content-box;
}

::-webkit-scrollbar-track {
  background: none;
}
</style>
